"use client";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from "next/image";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";
import { Button } from "./ui/button";
import { Navigation2Icon, NavigationIcon } from "lucide-react";
import { FullscreenControl } from "react-leaflet-fullscreen";
import { ScaleControl } from "react-leaflet";
import "react-leaflet-fullscreen/styles.css";
import "leaflet/dist/leaflet.css";

const thunderforestApiKey = "3606dcc00ff541e2988c1b5db48efbcb";

// Fixing the default icon issue
const DefaultIcon = L.icon({
  iconUrl: markerIcon.src,
  shadowUrl: markerIconShadow.src,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Create a custom icon
const CustomIcon = L.icon({
  iconUrl: markerIcon.src, // Update with your custom icon path
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocateButton() {
  const map = useMap();

  const handleLocationRequest = () => {
    map.locate({ setView: true, maxZoom: 16 });
  };

  return (
    <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>
      <Button
        size="icon"
        variant="outline"
        className="flex "
        onClick={handleLocationRequest}
      >
        <NavigationIcon />
      </Button>
    </div>
  );
}

// interface LocationMarkerOldProps {
//   triggerLocation: boolean;
// }

// function LocationMarkerOld({ triggerLocation }: LocationMarkerOldProps) {
//   const map = useMap();

//   useEffect(() => {
//     if (triggerLocation) {
//       map.locate({ setView: true, maxZoom: 16 });
//     }
//   }, [map, triggerLocation]);

//   useEffect(() => {
//     function onLocationFound(e: L.LocationEvent) {
//       const radius = e.accuracy;

//       L.marker(e.latlng)
//         .addTo(map)
//         .bindPopup(`You are within ${radius} meters from this point`)
//         .openPopup();
//     }

//     function onLocationError(e: L.ErrorEvent) {
//       alert(e.message);
//     }

//     map.on("locationfound", onLocationFound);
//     map.on("locationerror", onLocationError);

//     return () => {
//       map.off("locationfound", onLocationFound);
//       map.off("locationerror", onLocationError);
//     };
//   }, [map]);

//   return null;
// }

const markers = [
  {
    position: [5.3643209, 100.4943647] as [number, number],
    title: "Big Tree",
    image: "/tokun/big-tree.png",
    alt: "big-tree",
  },
  {
    position: [5.36969, 100.48474] as [number, number],
    title: "Viewing Point",
    image: "",
    alt: "view-point",
  },
  {
    position: [5.36686, 100.48351] as [number, number],
    title: "Tower Station",
    image: "/tokun/tower-station.png",
    alt: "tower-station",
  },
  {
    position: [5.36724, 100.4977] as [number, number],
    title: "Trek 800",
    image: "/tokun/trek-800.jpg",
    alt: "trek-800",
  },
];

export default function LiveMap() {
  const [triggerLocation, setTriggerLocation] = useState(false);
  const defaultPosition: [number, number] = [5.3645, 100.4909];

  const handleLocationRequest = () => {
    setTriggerLocation(true);
  };

  return (
    <div className="max-w-2xl relative justify-center flex flex-col items-center">
      {/* <Button
        size="sm"
        className="rounded-3xl mb-3 px-5"
        onClick={handleLocationRequest}
      >
        <span className="flex items-center gap-1">
          <NavigationIcon width={15} />
          Locate Me
        </span>
      </Button> */}

      <MapContainer
        id="map"
        center={defaultPosition}
        zoomControl={false}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "600px", maxWidth: "95%", margin: "auto" }}
        className="rounded-3xl shadow-lg max-w-2xl"
      >
        <ScaleControl position="bottomleft" />
        <LocateButton />

        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenCycleMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="https://www.thunderforest.com/maps/cycle/">Thunderforest</a>'
              url={`https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Outdoors">
            <TileLayer
              attribution='&copy; <a href="https://www.thunderforest.com/maps/outdoors/">Thunderforest</a>'
              url={`https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Transport Dark">
            <TileLayer
              attribution='&copy; <a href="https://www.thunderforest.com/maps/outdoors/">Thunderforest</a>'
              url={`https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* <FullscreenControl position="topright"/> */}

        {/* <LocationMarkerOld triggerLocation={triggerLocation} /> */}

        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={CustomIcon}>
            <Popup>
              <div>
                <h2>{marker.title}</h2>
                {marker.image && (
                  <Image
                    src={marker.image}
                    alt={marker.alt}
                    width={1000}
                    height={1000}
                    style={{ width: "100px", height: "auto" }}
                  />
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
