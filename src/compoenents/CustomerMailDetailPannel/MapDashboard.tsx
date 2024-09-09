// import React, { useEffect, useRef, useState } from 'react';

// declare global {
//   interface Window {
//     gdal: any;
//   }
// }

// const MapDashboard: React.FC = () => {
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const [overlayImage, setOverlayImage] = useState<string | null>(null);

//   useEffect(() => {
//     // Load the GDAL library dynamically
//     const loadGDAL = async () => {
//       const gdalScript = document.createElement('script');
//       gdalScript.src = 'https://unpkg.com/gdal-js/gdal.js';
//       gdalScript.async = true;
//       document.body.appendChild(gdalScript);

//       gdalScript.onload = () => {
//         console.log("GDAL loaded successfully!");

//         // Once GDAL is loaded, we can process the GeoTIFF
//         processGeoTiff();
//       };
//     };

//     const processGeoTiff = async () => {
//       try {
//         const filePath = "../src/assets/maps/Gonadika-Holiday-Bungalow-4-24-2024-orthophoto.tif"; // Update with the correct GeoTIFF file path

//         const dataset = window.gdal.open(filePath);
//         const driver = dataset.driver;
//         console.log('Driver:', driver.description);
//         console.log('Size:', dataset.rasterSize.x, dataset.rasterSize.y);

//         // Get the GeoTransform for the coordinates
//         const geotransform = dataset.geoTransform;
//         const topLeft = { lat: geotransform[3], lng: geotransform[0] };
//         const bottomRight = {
//           lat: geotransform[3] + geotransform[5] * dataset.rasterSize.y,
//           lng: geotransform[0] + geotransform[1] * dataset.rasterSize.x,
//         };

//         console.log(`Top Left: (${topLeft.lat}, ${topLeft.lng})`);
//         console.log(`Bottom Right: (${bottomRight.lat}, ${bottomRight.lng})`);

//         // Convert the GeoTIFF to PNG
//         const driverPng = window.gdal.drivers.get('PNG');
//         const outputPath = "output-file-path.png"; // This would ideally be generated dynamically
//         const pngDataset = driverPng.createCopy(outputPath, dataset);

//         // Output the PNG to display on the map
//         setOverlayImage(outputPath); // This will trigger rendering of the overlay on the map
//       } catch (error) {
//         console.error('Error processing GeoTIFF:', error);
//       }
//     };

//     loadGDAL();
//   }, []);

//   useEffect(() => {
//     const initMap = () => {
//       if (mapRef.current) {
//         const map = new window.google.maps.Map(mapRef.current, {
//           zoom: 23, // Initial zoom level
//           center: {
//             lat: (7.1947473 + 7.1942133) / 2,
//             lng: (80.5402994 + 80.5399448) / 2,
//           },
//           mapTypeId: "satellite",
//         });

//         const bounds = new window.google.maps.LatLngBounds(
//           new window.google.maps.LatLng(7.1942133, 80.5399448),
//           new window.google.maps.LatLng(7.1947473, 80.5402994)
//         );

//         if (overlayImage) {
//           class CustomOverlay extends window.google.maps.OverlayView {
//             bounds: any;
//             image: string;
//             div: HTMLDivElement | null = null;

//             constructor(bounds: any, image: string) {
//               super();
//               this.bounds = bounds;
//               this.image = image;
//             }

//             onAdd() {
//               this.div = document.createElement("div");
//               this.div.style.borderStyle = "none";
//               this.div.style.borderWidth = "0px";
//               this.div.style.position = "absolute";

//               const img = document.createElement("img");

//               img.src = this.image;
//               img.style.width = "100%";
//               img.style.height = "100%";
//               img.style.position = "absolute";
//               this.div.appendChild(img);

//               const panes = this.getPanes();
//               if (panes && panes.overlayLayer) {
//                 panes.overlayLayer.appendChild(this.div);
//               }
//             }

//             draw() {
//               if (!this.div) return;

//               const overlayProjection = this.getProjection();
//               const sw = overlayProjection.fromLatLngToDivPixel(this.bounds.getSouthWest());
//               const ne = overlayProjection.fromLatLngToDivPixel(this.bounds.getNorthEast());

//               if (sw && ne && this.div) {
//                 this.div.style.left = `${sw.x}px`;
//                 this.div.style.top = `${ne.y}px`;
//                 this.div.style.width = `${ne.x - sw.x}px`;
//                 this.div.style.height = `${sw.y - ne.y}px`;
//               }
//             }

//             hide() {
//               if (this.div) {
//                 this.div.style.visibility = "hidden";
//               }
//             }

//             show() {
//               if (this.div) {
//                 this.div.style.visibility = "visible";
//               }
//             }
//           }

//           const overlay = new CustomOverlay(bounds, overlayImage);
//           overlay.setMap(map);
//         }
//       }
//     };

//     if (overlayImage) {
//       initMap();
//     }
//   }, [overlayImage]);

//   return <div ref={mapRef} style={{ height: '70vh', width: '100%' }} />;
// };

// export default MapDashboard;






// version 5
import React, { useEffect, useRef } from 'react';
 
declare global {
  interface Window {
    initMap: () => void;
  }
}
 
const MapDashboard: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<any>(null); 
 
  useEffect(() => {
    const initMap = () => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 20, // Initial zoom level
          center: {
            lat: (7.1947473 + 7.1942133) / 2,  // Center the map based on the overlay image bounds
            lng: (80.5402994 + 80.5399448) / 2  
          },
          mapTypeId: "satellite",
        });
 
        
        const center = map.getCenter();
        if (center) {
          const maxZoomService = new window.google.maps.MaxZoomService();
          maxZoomService.getMaxZoomAtLatLng(center, (response) => {
            if (response.status === 'OK') {
              const maxZoomLevel = response.zoom + 2; // Extend beyond the max zoom level by 2
              const customMapType = new window.google.maps.ImageMapType({
                getTileUrl: function(coord, zoom) {
                  return `http://mt.google.com/vt/lyrs=s&x=${coord.x}&y=${coord.y}&z=${zoom}`;
                },
                tileSize: new window.google.maps.Size(256, 256),
                maxZoom: maxZoomLevel,  // Set max zoom level
                name: 'Extended Zoom'
              });
 
              map.mapTypes.set('extended_zoom', customMapType);
              map.setMapTypeId('extended_zoom'); 
            }
          });
        }
 
        
        const bounds = new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(7.1942133, 80.5399448), // Lower Left (lat, lng)
          new window.google.maps.LatLng(7.1947473, 80.5402994)  // Upper Right (lat, lng)
        );
 
        const image = "../src/assets/maps/Gonadika-Holiday-Bungalow-RGB-png.png"; 
 
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
            this.div = document.createElement("div");
            this.div.style.borderStyle = "none";
            this.div.style.borderWidth = "0px";
            this.div.style.position = "absolute";
 
            const img = document.createElement("img");
 
            img.src = this.image;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.position = "absolute";
            this.div.appendChild(img);
 
            const panes = this.getPanes();
            if (panes && panes.overlayLayer) {
              panes.overlayLayer.appendChild(this.div);
            }
          }
 
          draw() {
            if (!this.div) return;
 
            const overlayProjection = this.getProjection();
            const sw = overlayProjection.fromLatLngToDivPixel(
              this.bounds.getSouthWest()
            );
            const ne = overlayProjection.fromLatLngToDivPixel(
              this.bounds.getNorthEast()
            );
 
            if (sw && ne && this.div) {
              this.div.style.left = `${sw.x}px`;
              this.div.style.top = `${ne.y}px`;
              this.div.style.width = `${ne.x - sw.x}px`;
              this.div.style.height = `${sw.y - ne.y}px`;
            }
          }
 
          hide() {
            if (this.div) {
              this.div.style.visibility = "hidden";
            }
          }
 
          show() {
            if (this.div) {
              this.div.style.visibility = "visible";
            }
          }
 
          toggle() {
            if (this.div) {
              if (this.div.style.visibility === "hidden") {
                this.show();
              } else {
                this.hide();
              }
            }
          }
 
          toggleDOM(map: google.maps.Map) {
            if (this.getMap()) {
              this.setMap(null);
            } else {
              this.setMap(map);
            }
          }
        }
 
        const overlay = new CustomOverlay(bounds, image);
        overlay.setMap(map);
        overlayRef.current = overlay;
 
        const toggleButton = document.createElement("button");
        toggleButton.textContent = "Toggle";
        toggleButton.classList.add("custom-map-control-button");
 
        const toggleDOMButton = document.createElement("button");
        toggleDOMButton.textContent = "Toggle DOM Attachment";
        toggleDOMButton.classList.add("custom-map-control-button");
 
        toggleButton.addEventListener("click", () => {
          overlay.toggle();
        });
 
        toggleDOMButton.addEventListener("click", () => {
          overlay.toggleDOM(map);
        });
 
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(toggleDOMButton);
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(toggleButton);

// -------------------------------------------Add a marker to show the iot device on the map----------------------------------------------------
      // Add Marker for IoT device location
        const markerPosition = {
          lat: 7.1944800, // Latitude of IoT device
          lng: 80.5401000 // Longitude of IoT device
        };

        // const marker = new window.google.maps.Marker({
        //   position: markerPosition,
        //   map,
        //   title: "IoT Device Location"
        // });


        // adding custom Icon
        const marker = new window.google.maps.Marker({
          position: markerPosition,
          map,
          title: "IoT Device Location",
          icon: {
            url: "../src/assets/markers/iot-marker.png", // Custom icon file path
            scaledSize: new window.google.maps.Size(40, 40), // size of the icon
          }
        });
        

        // InfoWindow for displaying details
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><h3>IoT Device</h3><p>Location: (${markerPosition.lat}, ${markerPosition.lng})</p><p>Status: Active</p></div>`
        });

        // Add click event listener to the marker
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      }
    };
 
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBKwT3-cq00IaM04TcHh1UiePAgjbp9LN4&callback=initMap`;
      script.async = true;
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
