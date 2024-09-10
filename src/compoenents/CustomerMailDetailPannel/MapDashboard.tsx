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

const MapDashboard: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<any>(null);

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

        const image = '../src/assets/maps/Gonadika-Holiday-Bungalow-RGB-png.png';

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

        // Add a marker for the IoT device on the map
        const markerPosition = {
          lat: 7.19448, // Latitude of IoT device
          lng: 80.5401, // Longitude of IoT device
        };

        const marker = new window.google.maps.Marker({
          position: markerPosition,
          map,
          title: 'IoT Device Location',
          icon: {
            url: '../src/assets/markers/iot-marker.png', // Custom icon file path
            scaledSize: new window.google.maps.Size(40, 40), // size of the icon
          },
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><h3>IoT Device</h3><p>Location: (${markerPosition.lat}, ${markerPosition.lng})</p><p>Status: Active</p></div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        // Image overlay class
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

        // Array of values for each grid block
        const blockValues = [
          ['Yeild- 0 ,Stress- 0, Disease- 0', 'Yeild- 20 ,Stress- no, Disease- no', 'Yeild- 10 ,Stress- no, Disease- no', 'Yeild- 0 ,Stress- no, Disease- no'],
          ['Yeild- 5 ,Stress- no, Disease- no', 'Yeild- 20 ,Stress- Yes, Disease- Yes', 'Yeild- 30 ,Stress- no, Disease- no', 'Yeild- 20 ,Stress- no, Disease- no'],
          ['Yeild- 5 ,Stress- Yes, Disease- no', 'Yeild- 20 ,Stress- Yes, Disease- no', 'Yeild- 20 ,Stress- no, Disease- no', 'Yeild- 20 ,Stress- no, Disease- no'],
          ['Yeild- 20 ,Stress- no, Disease- no', 'Yeild- 20 ,Stress- no, Disease- no', 'Yeild- 20 ,Stress- no, Disease- no', 'Yeild- 20 ,Stress- no, Disease- no'],
        ];

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
            this.div.style.zIndex = '1000'; // Ensure it's on top of other elements

            const panes = this.getPanes();
            if (panes && panes.overlayMouseTarget) {
              panes.overlayMouseTarget.appendChild(this.div);
            }

            // Create grid blocks within the bounds of the image overlay
            for (let i = 0; i < 4; i++) {
              for (let j = 0; j < 4; j++) {
                const block = document.createElement('div');
                block.style.position = 'absolute';
                block.style.backgroundColor = 'transparent';
                block.style.border = '0px solid #000';
                block.style.width = '25%';
                block.style.height = '25%';
                block.style.left = `${i * 25}%`;
                block.style.top = `${j * 25}%`;
                block.style.display = 'flex';
                block.style.alignItems = 'center';
                block.style.justifyContent = 'center';
                block.style.fontWeight = 'bold';
                block.style.color = 'transparent'; // Initially hide the text

                // Add hover effects for background color and text
                block.onmouseover = () => {
                  block.style.backgroundColor = 'rgba(222, 242, 211, 0.4)'; // Highlight color on hover
                  block.style.color = 'white'; // Show text on hover
                  block.textContent = blockValues[i][j]; // Show the corresponding value from the array
                };
                block.onmouseout = () => {
                  block.style.backgroundColor = 'transparent'; // Revert to transparent on mouse out
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

    // Ensure the API is loaded correctly only once
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBKwT3-cq00IaM04TcHh1UiePAgjbp9LN4&callback=initMap`;
      script.async = true;
      script.defer = true; // Make sure the script is loaded asynchronously
      document.head.appendChild(script);
      window.initMap = initMap; // Assign initMap to the global window object
    } else {
      initMap();
    }
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ height: '70vh', width: '100%' }} />
    </div>
  );
};

export default MapDashboard;

