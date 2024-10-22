import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useButtonContext } from '../ButtonContext'; // For Stress, Yield, and Disease toggle context
import { useIoTContext } from '../IoTContext'; // For IoT toggle context
import { useMapTypeContext } from '../MapTypeContext'; // For MapTypeContext

declare global {
  interface Window {
    initMap: () => void;  // Extend the Window interface
  }
}

const MapDashboard: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<any>(null);  // Store the marker reference
  const overlayRef = useRef<any>(null);
  const { id } = useParams<{ id: string }>();

  const { isStressActive, isDiseaseActive, isYieldActive } = useButtonContext(); // Access stress, yield, and disease state from context
  const { iotEnabled } = useIoTContext(); // Access IoT marker toggle state
  const { mapType } = useMapTypeContext(); // Access map type from context

  const [mapImageUrl, setMapImageUrl] = useState<string | null>(null);

  // Hardcoded rows, cols, and block values for dynamic grid
  const numRows = 6; // Example number of rows
  const numCols = 8; // Example number of columns
  const blockValues = Array.from({ length: numRows }, (_, rowIndex) =>
    Array.from({ length: numCols }, (_, colIndex) => `B${rowIndex * numCols + colIndex + 1} Yield- ${Math.floor(Math.random() * 30)}, Stress- ${Math.random() > 0.5 ? 'Yes' : 'No'}, Disease- ${Math.random() > 0.5 ? 'Yes' : 'No'}`)
  );

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/project/${id}`);
        const data = await response.json();
        const mapImagePngUrl = data?.taskList?.[0]?.mapImagePngUrl;

        
        if (mapImagePngUrl) {
          setMapImageUrl(mapImagePngUrl);
        }
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    };

    fetchData();
  }, [id]);

 

  // Dynamically set image path based on selected map type
  const getImagePath = () => {
    switch (mapType) {
      case 'ndvi':
        return '../src/assets/maps/NDVI_map.png';
      case 'rendvi':
        return '../src/assets/maps/RENDVI_map.png';
      default:
        // Use the API-fetched mapImageUrl if available, otherwise use a placeholder.
        return mapImageUrl || 'https://agrivis.blob.core.windows.net/agrivis/1729534754989.png?sv=2021-08-06&spr=https&se=2034-10-21T18%3A19%3A25Z&sr=b&sp=r&sig=kBSya5oiD3VFuifz2p0OsgADv4eudN%2BZAMziemrUgno%3D&rsct=text%2Fplain';
    }
  };

  // Function to determine yield color intensity
  const getYieldColor = (yieldValue: number) => {
    const normalizedValue = Math.min(Math.max(yieldValue, 0), 30); // Cap the value between 0 and 30
    const intensity = Math.floor((normalizedValue / 30) * 255);
    return `rgba(0, ${intensity}, 0, 0.6)`; // Green with varying intensity
  };

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 20,
          center: {
            lat: (7.1947473 + 7.1942133) / 2,
            lng: (80.5402994 + 80.5399448) / 2,
          },
          mapTypeId: 'satellite',
        });

        const bounds = new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(7.1942133, 80.5399448),
          new window.google.maps.LatLng(7.1947473, 80.5402994)
        );

        const image = getImagePath(); // Get image based on the selected map type

        // Image overlay class for the grid
        class CustomOverlay extends window.google.maps.OverlayView {
          bounds: any;
          image: string;
          div: HTMLDivElement | null = null;

          constructor(bounds: any, image: string) {
            super();
            this.bounds = bounds;
            this.image = image;
          }

          onAdd() {
            this.div = document.createElement('div');
            this.div.style.borderStyle = 'none';
            this.div.style.borderWidth = '0px';
            this.div.style.position = 'absolute';

            const img = document.createElement('img');
            img.src = this.image;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.position = 'absolute';
            this.div.appendChild(img);

            const panes = this.getPanes();
            if (panes && panes.overlayLayer) {
              panes.overlayLayer.appendChild(this.div);
            }
          }

          draw() {
            if (!this.div) return;

            const overlayProjection = this.getProjection();
            const sw = overlayProjection.fromLatLngToDivPixel(this.bounds.getSouthWest());
            const ne = overlayProjection.fromLatLngToDivPixel(this.bounds.getNorthEast());

            if (sw && ne && this.div) {
              this.div.style.left = `${sw.x}px`;
              this.div.style.top = `${ne.y}px`;
              this.div.style.width = `${ne.x - sw.x}px`;
              this.div.style.height = `${sw.y - ne.y}px`;
            }
          }
        }

        const overlay = new CustomOverlay(bounds, image);
        overlay.setMap(map);
        overlayRef.current = overlay;

        // Grid overlay with dynamic row and column logic
        class GridOverlay extends window.google.maps.OverlayView {
          div: HTMLDivElement | null = null;
          bounds: any;

          constructor(bounds: any) {
            super();
            this.bounds = bounds;
          }

          onAdd() {
            this.div = document.createElement('div');
            this.div.style.position = 'absolute';
            this.div.style.zIndex = '0'; // Set lower z-index for grid

            const panes = this.getPanes();
            if (panes && panes.overlayMouseTarget) {
              panes.overlayMouseTarget.appendChild(this.div);
            }

            // Create grid blocks dynamically
            for (let i = 0; i < numRows; i++) {
              for (let j = 0; j < numCols; j++) {
                const block = document.createElement('div');
                block.style.position = 'absolute';
                block.style.backgroundColor = 'transparent';
                block.style.border = '0px solid #000';
                block.style.width = `${100 / numCols}%`;
                block.style.height = `${100 / numRows}%`;
                block.style.left = `${j * (100 / numCols)}%`;
                block.style.top = `${i * (100 / numRows)}%`;
                block.style.zIndex = '0'; // Ensure grid blocks are behind markers

                const blockValue = blockValues[i][j];
                const isStress = blockValue.includes('Stress- Yes');
                const isDisease = blockValue.includes('Disease- Yes');
                const yieldMatch = blockValue.match(/Yield- (\d+)/);
                const yieldValue = yieldMatch ? parseInt(yieldMatch[1], 10) : 0;

                // If stress is active and the block contains "Stress- Yes", set the background to red
                if (isStressActive && isStress) {
                  block.style.backgroundColor = 'rgba(255, 0, 0, 0.2)'; // Highlight red for stress
                }

                // If disease is active, highlight in light brown
                if (isDiseaseActive && isDisease) {
                  block.style.backgroundColor = 'rgba(105, 0, 0, 0.4)'; // Light brown for disease
                }

                // If yield is active, adjust the color intensity based on the yield value
                if (isYieldActive) {
                  block.style.backgroundColor = getYieldColor(yieldValue);
                }

                block.style.display = 'flex';
                block.style.alignItems = 'center';
                block.style.justifyContent = 'center';
                block.style.fontWeight = 'bold';
                block.style.color = 'transparent'; // Initially hide the text

                // Add hover effects for background color and text
                block.onmouseover = () => {
                  if (!isStressActive || !isStress) {
                    block.style.backgroundColor = 'rgba(222, 242, 211, 0.4)'; // Highlight color on hover
                  }
                  block.style.color = 'white'; // Show text on hover
                  block.textContent = blockValue; // Show the corresponding value from the array
                };

                block.onmouseout = () => {
                  block.style.backgroundColor = isStressActive && isStress ? 'rgba(255, 0, 0, 0.2)' : isYieldActive ? getYieldColor(yieldValue) : 'transparent';
                  block.style.color = 'transparent'; // Hide text again
                  block.textContent = ''; // Clear the text content
                };

                this.div.appendChild(block);
              }
            }
          }

          draw() {
            if (!this.div) return;

            const overlayProjection = this.getProjection();
            const sw = overlayProjection.fromLatLngToDivPixel(this.bounds.getSouthWest());
            const ne = overlayProjection.fromLatLngToDivPixel(this.bounds.getNorthEast());

            if (sw && ne && this.div) {
              this.div.style.left = `${sw.x}px`;
              this.div.style.top = `${ne.y}px`;
              this.div.style.width = `${ne.x - sw.x}px`;
              this.div.style.height = `${sw.y - ne.y}px`;
            }
          }
        }

        const gridOverlay = new GridOverlay(bounds);
        gridOverlay.setMap(map);
      }
    };

    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBKwT3-cq00IaM04TcHh1UiePAgjbp9LN4&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
      window.initMap = initMap;
    } else {
      initMap();
    }
  }, [isStressActive, isDiseaseActive, isYieldActive, iotEnabled, mapType, mapImageUrl]); // Re-run when any of the states change

  // Update IoT marker visibility when iotEnabled changes
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setMap(iotEnabled ? markerRef.current.getMap() : null);
    }
  }, [iotEnabled]);

  return (
    <div>
      <div ref={mapRef} style={{ height: '70vh', width: '100%' }} />
    </div>
  );
};

export default MapDashboard;
