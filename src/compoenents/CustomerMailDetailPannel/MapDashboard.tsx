// import React, { useEffect } from 'react';
// import { Grid, Paper } from '@mui/material';
// import { GoogleMap, LoadScript, Marker, GroundOverlay } from '@react-google-maps/api';

// const MapDashboard: React.FC = () => {

//   const center = {
//     lat: (7.1947473 + 7.1942133) / 2,  // Average of north and south
//     lng: (80.5402994 + 80.5399448) / 2 
//   };

//   // Define the bounds using the corner coordinates from gdalinfo
//   const imageBounds = {
//     north: 7.1947473,  // Upper Left latitude
//     south: 7.1942133,  // Lower Right latitude
//     east: 80.5402994,  // Lower Right longitude
//     west: 80.5399448   // Upper Left longitude
//   };

//   // Log statements to debug
//   useEffect(() => {
//     console.log('Center coordinates:', center);
//     console.log('Image bounds:', imageBounds);
//     console.log('GroundOverlay image URL:', '/assets/img/maps/Gonadika-Holiday-Bungalow-RGB-compressed.jpg');
//   }, []);

 

//   return (
//     <Grid container spacing={2} style={{ height: '100%', width: '100%' }}>
//       <Grid item xs={12} style={{ height: '100%', width: '100%' }}>
//         <Paper elevation={3} sx={{ p: 2, height: '100%', width: '100%' }}>
//           <LoadScript googleMapsApiKey="AIzaSyBKwT3-cq00IaM04TcHh1UiePAgjbp9LN4">
//             <GoogleMap
//               mapContainerStyle={{ width: '100%', height: '100%' }}
//               center={center}
//               zoom={18} 
//             >
//               <Marker position={center} />

//               <GroundOverlay
//                 url="../src/assets/maps/Gonadika-Holiday-Bungalow-RGB-png.png" 
//                 bounds={imageBounds}
//                 opacity={1.0} 
                
//               />
              
//             </GoogleMap>
//           </LoadScript>
//         </Paper>
//       </Grid>
//     </Grid>

//   //   <LoadScript googleMapsApiKey="AIzaSyBKwT3-cq00IaM04TcHh1UiePAgjbp9LN4">
//   //   <GoogleMap
//   //     mapContainerStyle={{ width: '100%', height: '600px' }}
//   //     center={center}
//   //     zoom={18}
//   //   >
//   //     <GroundOverlay
//   //       url="../src/assets/maps/Gonadika-Holiday-Bungalow-RGB-png.png"
//   //       bounds={imageBounds}
//   //       opacity={1.0}
//   //     />
//   //   </GoogleMap>
//   // </LoadScript>
//   );
// };

// export default MapDashboard;


import React, { useEffect, useRef } from 'react';

const MapDashboard = () => {
  const mapRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 18, 
        center: { 
          lat: (7.1947473 + 7.1942133) / 2,  // Center the map based on your image bounds
          lng: (80.5402994 + 80.5399448) / 2 
        },
        maxZoom:21,
        mapTypeId: "satellite",
      });

      const bounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(7.1942133, 80.5399448), // Lower Left
        new window.google.maps.LatLng(7.1947473, 80.5402994)  // Upper Right
      );

      const image = "../src/assets/maps/Gonadika-Holiday-Bungalow-RGB-png.png"; 

      class CustomOverlay extends window.google.maps.OverlayView {
        bounds;
        image;
        div;

        constructor(bounds, image) {
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
          panes.overlayLayer.appendChild(this.div);
        }

        draw() {
          const overlayProjection = this.getProjection();
          const sw = overlayProjection.fromLatLngToDivPixel(
            this.bounds.getSouthWest()
          );
          const ne = overlayProjection.fromLatLngToDivPixel(
            this.bounds.getNorthEast()
          );

          if (this.div) {
            this.div.style.left = sw.x + "px";
            this.div.style.top = ne.y + "px";
            this.div.style.width = ne.x - sw.x + "px";
            this.div.style.height = sw.y - ne.y + "px";
          }
        }

        onRemove() {
          if (this.div) {
            this.div.parentNode.removeChild(this.div);
            delete this.div;
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

        toggleDOM(map) {
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
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBKwT3-cq00IaM04TcHh1UiePAgjbp9LN4&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
      window.initMap = initMap;
    } else {
      initMap();
    }
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ height: '100vh', width: '100%' }} />
    </div>
  );
};

export default MapDashboard;
