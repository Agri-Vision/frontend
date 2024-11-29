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


//version 7
import React, { useEffect, useRef } from 'react';
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

  const { isStressActive, isDiseaseActive, isYieldActive } = useButtonContext(); // Access stress, yield, and disease state from context
  const { iotEnabled } = useIoTContext(); // Access IoT marker toggle state
  const { mapType } = useMapTypeContext(); // Access map type from context

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

        // Add marker for the IoT device
        const markerPosition = {
          lat: 7.19448,
          lng: 80.5401,
        };

        // Create marker and store its reference
        markerRef.current = new window.google.maps.Marker({
          position: markerPosition,
          map: iotEnabled ? map : null, // Show or hide based on IoT toggle state
          title: 'IoT Device Location',
          icon: {
            url: '../src/assets/markers/iot-marker.png',
            scaledSize: new window.google.maps.Size(40, 40),
          },
          zIndex: 1, // Ensure marker stays on top
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><h3>IoT Device</h3><p>Location: (${markerPosition.lat}, ${markerPosition.lng})</p><p>Status: Active</p></div>`,
        });

        markerRef.current.addListener('click', () => {
          infoWindow.open(map, markerRef.current);
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

        // Array of values for each grid block
        const blockValues = [
          ['B01 - Stress- 0', 'B02 - Stress- no', 'B03 - Stress- no', 'B04 - Stress- no'],
          ['B05 - Stress- no', 'B06 - Stress- Yes', 'B07 - Stress- no', 'B08 - Stress- no'],
          ['B07 - Stress- Yes', 'B08 - Stress- Yes', 'B09 - Stress- no', 'B10 - Stress- no'],
          ['B11 - Stress- no', 'B12 - Stress- no', 'B13 - Stress- no', 'B14 - Stress- no'],
        ];

        // Grid overlay with hover, stress, yield, and disease logic
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
                block.style.zIndex = '0'; // Ensure grid blocks are behind markers

                const blockValue = blockValues[i][j];
                const isStress = blockValue.includes('Stress- Yes');
                const isDisease = blockValue.includes('Disease- Yes');
                const yieldMatch = blockValue.match(/Yeild- (\d+)/);
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



// //version 8
// // export default MapDashboard;
// import React, { useEffect, useRef, useState } from 'react';
// import { useButtonContext } from '../ButtonContext'; // For Stress, Yield, and Disease toggle context
// import { useIoTContext } from '../IoTContext'; // For IoT toggle context
// import { useMapTypeContext } from '../MapTypeContext'; // For MapTypeContext
// import { fromUrl } from 'geotiff'; // Import geotiff.js

// const geoTiffPath = '../src/assets/maps/Gonadika-Holiday-Bungalow-RGB.tif';

// const MapDashboard: React.FC = () => {
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const markerRef = useRef<any>(null);  // Store the marker reference
//   const overlayRef = useRef<any>(null);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);

//   const { isStressActive, isDiseaseActive, isYieldActive } = useButtonContext(); // Access stress, yield, and disease state from context
//   const { iotEnabled } = useIoTContext(); // Access IoT marker toggle state
//   const { mapType } = useMapTypeContext(); // Access map type from context

//   // Function to convert GeoTIFF to PNG and extract geo-coordinates
//   const convertGeoTiffToPng = async () => {
//     try {
//       const tiff = await fromUrl(geoTiffPath);
//       const image = await tiff.getImage();
//       const width = image.getWidth();
//       const height = image.getHeight();
//       const rasterData = await image.readRasters();

//       // Convert raster data to image
//       const canvas = document.createElement('canvas');
//       canvas.width = width;
//       canvas.height = height;
//       const ctx = canvas.getContext('2d');
//       const imgData = ctx.createImageData(width, height);

//       // Assuming it's RGB, GeoTIFFs have many types; may need to adapt this
//       for (let i = 0; i < rasterData[0].length; i++) {
//         imgData.data[i * 4] = rasterData[0][i]; // Red
//         imgData.data[i * 4 + 1] = rasterData[1][i]; // Green
//         imgData.data[i * 4 + 2] = rasterData[2][i]; // Blue
//         imgData.data[i * 4 + 3] = 255; // Alpha
//       }
//       ctx.putImageData(imgData, 0, 0);

//       setImageSrc(canvas.toDataURL());

//       const geoTransform = image.getGeoKeys();
//       const origin = {
//         lat: geoTransform.ModelTiepoint[4],
//         lng: geoTransform.ModelTiepoint[3],
//       };
//       const pixelSize = {
//         x: geoTransform.ModelPixelScale[0],
//         y: geoTransform.ModelPixelScale[1],
//       };
//       const bounds = {
//         sw: {
//           lat: origin.lat + height * pixelSize.y,
//           lng: origin.lng,
//         },
//         ne: {
//           lat: origin.lat,
//           lng: origin.lng + width * pixelSize.x,
//         },
//       };

//       console.log('Extracted Geo-coordinates:', bounds);
//       return bounds;
//     } catch (error) {
//       console.error('Error processing GeoTIFF:', error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const initialize = async () => {
//       const bounds = await convertGeoTiffToPng(); // Convert GeoTIFF to PNG and extract bounds

//       const initMap = () => {
//         if (mapRef.current && bounds) {
//           const map = new window.google.maps.Map(mapRef.current, {
//             zoom: 20,
//             center: {
//               lat: (bounds.ne.lat + bounds.sw.lat) / 2,
//               lng: (bounds.ne.lng + bounds.sw.lng) / 2,
//             },
//             mapTypeId: 'satellite',
//           });

//           if (imageSrc) {
//             // Add image overlay on the map
//             class CustomOverlay extends window.google.maps.OverlayView {
//               bounds: any;
//               image: string;
//               div: HTMLDivElement | null = null;

//               constructor(bounds: any, image: string) {
//                 super();
//                 this.bounds = bounds;
//                 this.image = image;
//               }

//               onAdd() {
//                 this.div = document.createElement('div');
//                 this.div.style.borderStyle = 'none';
//                 this.div.style.borderWidth = '0px';
//                 this.div.style.position = 'absolute';

//                 const img = document.createElement('img');
//                 img.src = this.image;
//                 img.style.width = '100%';
//                 img.style.height = '100%';
//                 img.style.position = 'absolute';
//                 this.div.appendChild(img);

//                 const panes = this.getPanes();
//                 if (panes && panes.overlayLayer) {
//                   panes.overlayLayer.appendChild(this.div);
//                 }
//               }

//               draw() {
//                 if (!this.div) return;

//                 const overlayProjection = this.getProjection();
//                 const sw = overlayProjection.fromLatLngToDivPixel(new window.google.maps.LatLng(bounds.sw.lat, bounds.sw.lng));
//                 const ne = overlayProjection.fromLatLngToDivPixel(new window.google.maps.LatLng(bounds.ne.lat, bounds.ne.lng));

//                 if (sw && ne && this.div) {
//                   this.div.style.left = `${sw.x}px`;
//                   this.div.style.top = `${ne.y}px`;
//                   this.div.style.width = `${ne.x - sw.x}px`;
//                   this.div.style.height = `${sw.y - ne.y}px`;
//                 }
//               }
//             }

//             const overlay = new CustomOverlay(bounds, imageSrc);
//             overlay.setMap(map);
//             overlayRef.current = overlay;
//           }
//         }
//       };

//       if (!window.google || !window.google.maps) {
//         const script = document.createElement('script');
//         script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBKwT3-cq00IaM04TcHh1UiePAgjbp9LN4&callback=initMap`;
//         script.async = true;
//         document.head.appendChild(script);
//         window.initMap = initMap;
//       } else {
//         initMap();
//       }
//     };

//     initialize();
//   }, [isStressActive, isDiseaseActive, isYieldActive, iotEnabled, mapType, imageSrc]); // Re-run when any of the states change

//   // Update IoT marker visibility when iotEnabled changes
//   useEffect(() => {
//     if (markerRef.current) {
//       markerRef.current.setMap(iotEnabled ? markerRef.current.getMap() : null);
//     }
//   }, [iotEnabled]);

//   return (
//     <div>
//       <div ref={mapRef} style={{ height: '70vh', width: '100%' }} />
//       <input type="file" accept=".tif,.tiff" onChange={(e) => { if (e.target.files[0]) convertGeoTiffToPng(); }} />
//       {imageSrc && <img src={imageSrc} alt="Converted GeoTIFF" />}
//     </div>
//   );
// };

// export default MapDashboard;




