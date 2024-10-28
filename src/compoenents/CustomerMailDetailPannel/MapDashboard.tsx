import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useButtonContext } from '../ButtonContext'; // For Stress, Yield, and Disease toggle context
import { useIoTContext } from '../IoTContext'; // For IoT toggle context
import { useMapTypeContext } from '../MapTypeContext'; // For MapTypeContext
import { useMapHighlightContext } from '../MapHighlightContext';



declare global {
  interface Window {
    initMap: () => void;  // Extend the Window interface
  }
}

const MapDashboard: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRefs = useRef<any[]>([]);  // Store references to IoT markers
  const overlayRef = useRef<any>(null);
  const { id } = useParams<{ id: string }>();
  const { highlightedBlock } = useMapHighlightContext(); // Access the highlighted block

  const { isStressActive, isDiseaseActive, isYieldActive } = useButtonContext(); // Access stress, yield, and disease state from context
  const { iotEnabled } = useIoTContext(); // Access IoT marker toggle state
  const { mapType } = useMapTypeContext(); // Access map type from context

  
  const [mapImageUrl, setMapImageUrl] = useState<string | null>(null);
  const [geoCoordinates, setGeoCoordinates] = useState<{
    upperLat: number;
    lowerLat: number;
    upperLng: number;
    lowerLng: number;
  } | null>(null);

  const [iotDeviceList, setIoTDeviceList] = useState<any[]>([]); // Store the IoT device list
  const [activeInfoWindow, setActiveInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const [tileData, setTileData] = useState<any[]>([]);
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);

  
  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/project/${id}`);
        const data = await response.json();

        // Specify the taskType you want to target (e.g., "RGB")
        const desiredTaskType = "RGB";

        // Find the task object with the desired taskType
        const task = data?.taskList?.find((t: any) => t.taskType === desiredTaskType);

        if (task) {
          const { mapImagePngUrl, upperLat, lowerLat, upperLng, lowerLng } = task;

          // Set the map image URL if it exists
          if (mapImagePngUrl) {
            setMapImageUrl(mapImagePngUrl);
          }

          // Set geo-coordinates if they all exist
          if (upperLat && lowerLat && upperLng && lowerLng) {
            setGeoCoordinates({
              upperLat: parseFloat(upperLat),
              lowerLat: parseFloat(lowerLat),
              upperLng: parseFloat(upperLng),
              lowerLng: parseFloat(lowerLng),
            });
          }
        }

        // Store the IoT device list from the response
        if (data?.iotDeviceList) {
          setIoTDeviceList(data.iotDeviceList);
        }
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    };

    const fetchTileData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/project/tiles/by/project/${id}`);
        const tileData = await response.json();
        
        // Find the number of rows and columns dynamically
        const maxRow = Math.max(...tileData.map((tile: any) => tile.row));
        const maxCol = Math.max(...tileData.map((tile: any) => tile.col));
        setNumRows(maxRow + 1);
        setNumCols(maxCol + 1);

        setTileData(tileData);
      } catch (error) {
        console.error('Error fetching tile data:', error);
      }
    };

    fetchData();
    fetchTileData();
  }, [id]);

  // Map the tile data to a 2D array for easier access
  const blockValues = Array.from({ length: numRows }, (_, rowIndex) =>
    Array.from({ length: numCols }, (_, colIndex) => {
      const tile = tileData.find(
        (t) => t.row === rowIndex && t.col === colIndex
      );
      return tile
        ? `B${rowIndex * numCols + colIndex + 1} Yield- ${tile.yield}, Stress- ${tile.stress}, Disease- ${tile.disease}`
        : `B${rowIndex * numCols + colIndex + 1} Yield- N/A, Stress- N/A, Disease- N/A`;
    })
  );

  // Dynamically set image path based on selected map type
  const getImagePath = () => {
    switch (mapType) {
      case 'ndvi':
        return '../../src/assets/maps/NDVI_map.png' ;
      case 'rendvi':
        return '../../src/assets/maps/RENDVI_map.png';
      default:
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
      if (mapRef.current && geoCoordinates) {
        const { upperLat, lowerLat, upperLng, lowerLng } = geoCoordinates;
        const centerLat = (upperLat + lowerLat) / 2;
        const centerLng = (upperLng + lowerLng) / 2;

        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 20,
          center: {
            lat: centerLat,
            lng: centerLng,
          },
          mapTypeId: 'satellite',
        });

        const bounds = new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(lowerLat, lowerLng),
          new window.google.maps.LatLng(upperLat, upperLng)
        );

        const image = getImagePath(); // Get image based on the selected map type


        // Extend max zoom level using MaxZoomService
        const center = map.getCenter();
        if (center) {
          const maxZoomService = new window.google.maps.MaxZoomService();
          maxZoomService.getMaxZoomAtLatLng(center, (response) => {
            if (response.status === 'OK') {
              const maxZoomLevel = response.zoom + 2; // Extend beyond the max zoom level by 2
              const customMapType = new window.google.maps.ImageMapType({
                getTileUrl: function (coord, zoom) {
                  return `http://mt.google.com/vt/lyrs=s&x=${coord.x}&y=${coord.y}&z=${zoom}`;
                },
                tileSize: new window.google.maps.Size(256, 256),
                maxZoom: maxZoomLevel,
                name: 'Extended Zoom',
              });

              map.mapTypes.set('extended_zoom', customMapType);
              map.setMapTypeId('extended_zoom');
            }
          });
        }

        // Loop through each IoT device and add a marker for each

        iotDeviceList.forEach((device, index) => {
          const { currentLatitude, currentLongitude, deviceCode } = device;

          const markerPosition = {
            lat: currentLatitude,
            lng: currentLongitude,
          };

          // Create a marker and store its reference
          const marker = new window.google.maps.Marker({
            position: markerPosition,
            map: iotEnabled ? map : null, // Show or hide based on IoT toggle state
            title: `IoT Device: ${deviceCode}`,
            icon: {
              url: '../../src/assets/markers/iot-marker.png',
              scaledSize: new window.google.maps.Size(40, 40),
            },
            zIndex: 1, // Ensure marker stays on top
          });

        // Store the reference of the marker
        markerRefs.current[index] = marker;

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div>
            <h3>IoT Device: ${deviceCode}</h3>
            <p>Location: (${currentLatitude}, ${currentLongitude})</p>
            <p>Status: Active</p>
            <p>Last Modified: ${device.lastModifiedDate}</p>
          </div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

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
                const isStress = blockValue.includes('Stress- yes');
                const isDisease = blockValue.includes('Disease- yes');
                const yieldMatch = blockValue.match(/Yield- (\d+)/);
                const yieldValue = yieldMatch ? parseInt(yieldMatch[1], 10) : 0;

                const blockId = `B${i * numCols + j + 1}`;

            // Highlight the block if it matches the highlightedBlock
            if (highlightedBlock === blockId) {
              block.style.backgroundColor = 'rgba(255, 255, 0, 0.5)'; // Yellow highlight
              block.style.border = '2px solid yellow';
            }

        

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
                  if (!isStressActive || !isDiseaseActive) {
                    block.style.backgroundColor = 'rgba(222, 242, 211, 0.4)'; // Highlight color on hover
                  }
                  block.style.color = 'white'; // Show text on hover
                  block.textContent = blockValue; // Show the corresponding value from the array
                };

                
                block.onmouseout = () => {
                  // Maintain original color depending on the active state
                  if (isStressActive && isStress) {
                    block.style.backgroundColor = 'rgba(255, 0, 0, 0.2)'; // Keep stress red
                  } else if (isDiseaseActive && isDisease) {
                    block.style.backgroundColor = 'rgba(105, 0, 0, 0.4)'; // Keep disease light brown
                  } else if (isYieldActive) {
                    block.style.backgroundColor = getYieldColor(yieldValue); // Keep yield color
                  } else {
                    block.style.backgroundColor = 'transparent'; // Default transparent
                  }
                  block.style.color = 'transparent'; // Hide text again
                  block.textContent = ''; // Clear the text content
                };
        

                block.onclick = () => {
                  const blockLat = upperLat - (i + 0.5) * (upperLat - lowerLat) / numRows;
                  const blockLng = lowerLng + (j + 0.5) * (upperLng - lowerLng) / numCols;

                  // Close the previously active InfoWindow
                  if (activeInfoWindow) {
                    activeInfoWindow.close();
                  }

                  const newInfoWindow = new window.google.maps.InfoWindow({
                    content: `<div>
                      <h3>Tile Information</h3>
                      <p>${blockValue}</p>
                    </div>`,
                    position: { lat: blockLat, lng: blockLng },
                  });

                  newInfoWindow.open(map);
                  setActiveInfoWindow(newInfoWindow);
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
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
      window.initMap = initMap;
    } else {
      initMap();
    }
  }, [isStressActive, isDiseaseActive, isYieldActive, iotEnabled, iotDeviceList, mapType, mapImageUrl, geoCoordinates, highlightedBlock]); // Re-run when any of the states change

  // Update IoT marker visibility when iotEnabled changes
  useEffect(() => {
    markerRefs.current.forEach((marker) => {
      if (marker) {
        marker.setMap(iotEnabled ? marker.getMap() : null);
      }
    });
  }, [iotEnabled]);

  return (
    <div>
      <div ref={mapRef} style={{ height: '70vh', width: '100%' }} />
    </div>
  );
};

export default MapDashboard;
