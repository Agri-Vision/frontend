// // version 5
// import React, { useEffect, useRef } from 'react';
 
// declare global {
//   interface Window {
//     initMap: () => void;
//   }
// }
 
// const MapDashboard: React.FC = () => {
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const overlayRef = useRef<any>(null); 
 
//   useEffect(() => {
//     const initMap = () => {
//       if (mapRef.current) {
//         const map = new window.google.maps.Map(mapRef.current, {
//           zoom: 20, // Initial zoom level
//           center: {
//             lat: (7.1947473 + 7.1942133) / 2,  // Center the map based on the overlay image bounds
//             lng: (80.5402994 + 80.5399448) / 2  
//           },
//           mapTypeId: "satellite",
//         });
 
        
//         const center = map.getCenter();
//         if (center) {
//           const maxZoomService = new window.google.maps.MaxZoomService();
//           maxZoomService.getMaxZoomAtLatLng(center, (response) => {
//             if (response.status === 'OK') {
//               const maxZoomLevel = response.zoom + 2; // Extend beyond the max zoom level by 2
//               const customMapType = new window.google.maps.ImageMapType({
//                 getTileUrl: function(coord, zoom) {
//                   return `http://mt.google.com/vt/lyrs=s&x=${coord.x}&y=${coord.y}&z=${zoom}`;
//                 },
//                 tileSize: new window.google.maps.Size(256, 256),
//                 maxZoom: maxZoomLevel,  // Set max zoom level
//                 name: 'Extended Zoom'
//               });
 
//               map.mapTypes.set('extended_zoom', customMapType);
//               map.setMapTypeId('extended_zoom'); 
//             }
//           });
//         }
 
        
//         const bounds = new window.google.maps.LatLngBounds(
//           new window.google.maps.LatLng(7.1942133, 80.5399448), // Lower Left (lat, lng)
//           new window.google.maps.LatLng(7.1947473, 80.5402994)  // Upper Right (lat, lng)
//         );
 
//         const image = "../src/assets/maps/Gonadika-Holiday-Bungalow-RGB-png.png"; 
 
//         class CustomOverlay extends window.google.maps.OverlayView {
//           bounds: any;
//           image: string;
//           div: HTMLDivElement | null = null;
 
//           constructor(bounds: any, image: string) {
//             super();
//             this.bounds = bounds;
//             this.image = image;
//           }
 
//           onAdd() {
//             this.div = document.createElement("div");
//             this.div.style.borderStyle = "none";
//             this.div.style.borderWidth = "0px";
//             this.div.style.position = "absolute";
 
//             const img = document.createElement("img");
 
//             img.src = this.image;
//             img.style.width = "100%";
//             img.style.height = "100%";
//             img.style.position = "absolute";
//             this.div.appendChild(img);
 
//             const panes = this.getPanes();
//             if (panes && panes.overlayLayer) {
//               panes.overlayLayer.appendChild(this.div);
//             }
//           }
 
//           draw() {
//             if (!this.div) return;
 
//             const overlayProjection = this.getProjection();
//             const sw = overlayProjection.fromLatLngToDivPixel(
//               this.bounds.getSouthWest()
//             );
//             const ne = overlayProjection.fromLatLngToDivPixel(
//               this.bounds.getNorthEast()
//             );
 
//             if (sw && ne && this.div) {
//               this.div.style.left = `${sw.x}px`;
//               this.div.style.top = `${ne.y}px`;
//               this.div.style.width = `${ne.x - sw.x}px`;
//               this.div.style.height = `${sw.y - ne.y}px`;
//             }
//           }
 
//           hide() {
//             if (this.div) {
//               this.div.style.visibility = "hidden";
//             }
//           }
 
//           show() {
//             if (this.div) {
//               this.div.style.visibility = "visible";
//             }
//           }
 
//           toggle() {
//             if (this.div) {
//               if (this.div.style.visibility === "hidden") {
//                 this.show();
//               } else {
//                 this.hide();
//               }
//             }
//           }
 
//           toggleDOM(map: google.maps.Map) {
//             if (this.getMap()) {
//               this.setMap(null);
//             } else {
//               this.setMap(map);
//             }
//           }
//         }
 
//         const overlay = new CustomOverlay(bounds, image);
//         overlay.setMap(map);
//         overlayRef.current = overlay;
 
//         const toggleButton = document.createElement("button");
//         toggleButton.textContent = "Toggle";
//         toggleButton.classList.add("custom-map-control-button");
 
//         const toggleDOMButton = document.createElement("button");
//         toggleDOMButton.textContent = "Toggle DOM Attachment";
//         toggleDOMButton.classList.add("custom-map-control-button");
 
//         toggleButton.addEventListener("click", () => {
//           overlay.toggle();
//         });
 
//         toggleDOMButton.addEventListener("click", () => {
//           overlay.toggleDOM(map);
//         });
 
//         map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(toggleDOMButton);
//         map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(toggleButton);

// // -------------------------------------------Add a marker to show the iot device on the map----------------------------------------------------
//       // Add Marker for IoT device location
//         const markerPosition = {
//           lat: 7.1944800, // Latitude of IoT device
//           lng: 80.5401000 // Longitude of IoT device
//         };

//         // const marker = new window.google.maps.Marker({
//         //   position: markerPosition,
//         //   map,
//         //   title: "IoT Device Location"
//         // });


//         // adding custom Icon
//         const marker = new window.google.maps.Marker({
//           position: markerPosition,
//           map,
//           title: "IoT Device Location",
//           icon: {
//             url: "../src/assets/markers/iot-marker.png", // Custom icon file path
//             scaledSize: new window.google.maps.Size(40, 40), // size of the icon
//           }
//         });
        

//         // InfoWindow for displaying details
//         const infoWindow = new window.google.maps.InfoWindow({
//           content: `<div><h3>IoT Device</h3><p>Location: (${markerPosition.lat}, ${markerPosition.lng})</p><p>Status: Active</p></div>`
//         });

//         // Add click event listener to the marker
//         marker.addListener("click", () => {
//           infoWindow.open(map, marker);
//         });
//       }
//     };
 
//     if (!window.google) {
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBKwT3-cq00IaM04TcHh1UiePAgjbp9LN4&callback=initMap`;
//       script.async = true;
//       document.head.appendChild(script);
//       window.initMap = initMap; // Assign initMap to the global window object
//     } else {
//       initMap();
//     }
//   }, []);
 
//   return (
//     <div>
//       <div ref={mapRef} style={{ height: '70vh', width: '100%' }} />
//     </div>
//   );
// };
 
// export default MapDashboard;



import React, { useEffect, useRef } from 'react';
import { useButtonContext } from '../ButtonContext'; // For Stress, Yield, and Disease toggle context
import { useIoTContext } from '../IoTContext'; // For IoT toggle context
import { useMapTypeContext } from '../MapTypeContext'; // For MapTypeContext


declare global {
  interface Window {
    initMap: () => void; // Extend the Window interface
  }
}

const MapDashboard: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<any>(null); // Store the marker reference
  const overlayRef = useRef<any>(null);

  const { isStressActive, isDiseaseActive, isYieldActive } = useButtonContext(); // Access stress, yield, and disease state from context
  const { iotEnabled } = useIoTContext(); // Access IoT marker toggle state
  const { mapType } = useMapTypeContext(); // Access map type from context

  // Hardcoded rows, cols, and block values for dynamic grid
  const numRows = 8; // Example number of rows
  const numCols = 8; // Example number of columns
  const blockValues = Array.from({ length: numRows }, (_, rowIndex) =>
    Array.from({ length: numCols }, (_, colIndex) => `B${rowIndex * numCols + colIndex + 1} Yield- ${Math.floor(Math.random() * 30)}`)
  );

  // Dynamically set image path based on selected map type
  const getImagePath = () => {
    switch (mapType) {
      case 'ndvi':
        return '../src/assets/maps/NDVI_map.png';
      case 'rendvi':
        return '../src/assets/maps/RENDVI_map.png';
      default:
        return 'https://agrivis.blob.core.windows.net/agrivis/1729534754989.png?sv=2021-08-06&spr=https&se=2034-10-21T18%3A19%3A25Z&sr=b&sp=r&sig=kBSya5oiD3VFuifz2p0OsgADv4eudN%2BZAMziemrUgno%3D&rsct=text%2Fplain';
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
            lat: (7.194747257192233 + 7.1942131103952525) / 2,
            lng: (80.54030064103151 + 80.53994367657067) / 2,
          },
          mapTypeId: 'satellite',
        });

        const bounds = new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(7.1942131103952525, 80.53994367657067),
          new window.google.maps.LatLng(7.194747257192233, 80.54030064103151)
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
  }, [isStressActive, isDiseaseActive, isYieldActive, iotEnabled, mapType]); // Re-run when any of the states change

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



