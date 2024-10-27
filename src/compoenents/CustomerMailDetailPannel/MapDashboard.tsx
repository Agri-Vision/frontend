import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useButtonContext } from '../ButtonContext';
import { useIoTContext } from '../IoTContext';
import { useMapTypeContext } from '../MapTypeContext';
import { useMapHighlightContext } from '../MapHighlightContext';

declare global {
  interface Window {
    initMap: () => void;
  }
}

const MapDashboard: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRefs = useRef<any[]>([]);
  const overlayRef = useRef<any>(null);
  const { id } = useParams<{ id: string }>();
  const { highlightedBlock } = useMapHighlightContext(); // Access the highlighted block

  const { isStressActive, isDiseaseActive, isYieldActive } = useButtonContext();
  const { iotEnabled } = useIoTContext();
  const { mapType } = useMapTypeContext();
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  const [mapImageUrl, setMapImageUrl] = useState<string | null>(null);
  const [geoCoordinates, setGeoCoordinates] = useState<{
    upperLat: number;
    lowerLat: number;
    upperLng: number;
    lowerLng: number;
  } | null>(null);

  const [iotDeviceList, setIoTDeviceList] = useState<any[]>([]);
  const [tileData, setTileData] = useState<any[]>([]);
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/project/${id}`);
        const data = await response.json();
        const mapImagePngUrl = data?.taskList?.[0]?.mapImagePngUrl;

        const upperLat = parseFloat(data?.taskList?.[0]?.upperLat);
        const lowerLat = parseFloat(data?.taskList?.[0]?.lowerLat);
        const upperLng = parseFloat(data?.taskList?.[0]?.upperLng);
        const lowerLng = parseFloat(data?.taskList?.[0]?.lowerLng);

        if (mapImagePngUrl) {
          setMapImageUrl(mapImagePngUrl);
        }

        if (upperLat && lowerLat && upperLng && lowerLng) {
          setGeoCoordinates({ upperLat, lowerLat, upperLng, lowerLng });
        }

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

  const getImagePath = () => {
    switch (mapType) {
      case 'ndvi':
        return '../../src/assets/maps/NDVI_map.png';
      case 'rendvi':
        return '../../src/assets/maps/RENDVI_map.png';
      default:
        return mapImageUrl || 'https://example.com/default-map-image.png';
    }
  };

  const getYieldColor = (yieldValue: number) => {
    const normalizedValue = Math.min(Math.max(yieldValue, 0), 30);
    const intensity = Math.floor((normalizedValue / 30) * 255);
    return `rgba(0, ${intensity}, 0, 0.6)`;
  };

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && geoCoordinates) {
        const { upperLat, lowerLat, upperLng, lowerLng } = geoCoordinates;
        const centerLat = (upperLat + lowerLat) / 2;
        const centerLng = (upperLng + lowerLng) / 2;
  
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 20,
          center: { lat: centerLat, lng: centerLng },
          mapTypeId: 'satellite',
        });
  
        const bounds = new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(lowerLat, lowerLng),
          new window.google.maps.LatLng(upperLat, upperLng)
        );
  
        const image = getImagePath();
        const overlay = new CustomOverlay(bounds, image);
        overlay.setMap(map);
        overlayRef.current = overlay;
  
        // Pass numRows, numCols, and blockValues to GridOverlay
        const gridOverlay = new GridOverlay(bounds, map, numRows, numCols, blockValues);
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
  }, [numRows, numCols, blockValues, geoCoordinates, highlightedBlock]);
  

  return (
    <div>
      <div ref={mapRef} style={{ height: '70vh', width: '100%' }} />
    </div>
  );
};

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

    if (sw && ne) {
      this.div.style.left = `${sw.x}px`;
      this.div.style.top = `${ne.y}px`;
      this.div.style.width = `${ne.x - sw.x}px`;
      this.div.style.height = `${sw.y - ne.y}px`;
    }
  }
}

class GridOverlay extends window.google.maps.OverlayView {
  bounds: any;
  map: google.maps.Map;
  div: HTMLDivElement | null = null;

  constructor(bounds: any, map: google.maps.Map) {
    super();
    this.bounds = bounds;
    this.map = map;
  }

  onAdd() {
    this.div = document.createElement('div');
    this.div.style.position = 'absolute';

    const panes = this.getPanes();
    if (panes && panes.overlayMouseTarget) {
      panes.overlayMouseTarget.appendChild(this.div);
    }

    const { highlightedBlock, isStressActive, isDiseaseActive, isYieldActive } = useMapHighlightContext();

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const block = document.createElement('div');
        block.style.position = 'absolute';
        block.style.width = `${100 / numCols}%`;
        block.style.height = `${100 / numRows}%`;

        const blockId = `B${i * numCols + j + 1}`;
        block.style.backgroundColor = highlightedBlock === blockId ? 'rgba(0, 255, 255, 0.5)' : 'transparent';

        // Add additional styles and onClick for InfoWindow here

        this.div.appendChild(block);
      }
    }
  }

  draw() {
    if (!this.div) return;

    const overlayProjection = this.getProjection();
    const sw = overlayProjection.fromLatLngToDivPixel(this.bounds.getSouthWest());
    const ne = overlayProjection.fromLatLngToDivPixel(this.bounds.getNorthEast());

    if (sw && ne) {
      this.div.style.left = `${sw.x}px`;
      this.div.style.top = `${ne.y}px`;
      this.div.style.width = `${ne.x - sw.x}px`;
      this.div.style.height = `${sw.y - ne.y}px`;
    }
  }
}

export default MapDashboard;
