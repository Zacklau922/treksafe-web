"use client";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from "next/image";

// Importing leaflet default marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";
import { Button } from "./ui/button";
import { Navigation2Icon, NavigationIcon } from "lucide-react";

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

// new but not tracking current location
function LocationMarker() {
  const map = useMapEvents({
    locationfound(e) {
      map.setView(e.latlng, map.getZoom()); // Set the map view to the found location
      L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
      L.circle(e.latlng, { radius: 200 }).addTo(map);
    },
    locationerror(e) {
      alert(e.message);
    },
  });

  return null;
}

interface LocationMarkerOldProps {
  triggerLocation: boolean;
}

//old but tracking current location
function LocationMarkerOld({ triggerLocation }: LocationMarkerOldProps) {
  const map = useMap();

  useEffect(() => {
    if (triggerLocation) {
      map.locate({ setView: true, maxZoom: 16 });
    }
  }, [map, triggerLocation]);

  useEffect(() => {
    function onLocationFound(e: L.LocationEvent) {
      const radius = e.accuracy;

      L.marker(e.latlng)
        .addTo(map)
        .bindPopup(`You are within ${radius} meters from this point`)
        .openPopup();
    }

    function onLocationError(e: L.ErrorEvent) {
      alert(e.message);
    }

    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);

    return () => {
      map.off("locationfound", onLocationFound);
      map.off("locationerror", onLocationError);
    };
  }, [map]);

  return null;
}

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
      <Button
        size="sm"
        className="rounded-2xl mb-3 px-5"
        onClick={handleLocationRequest}
      >
        <span className="flex items-center gap-1">
          <NavigationIcon width={18} />
          Locate Me
        </span>
      </Button>

      <MapContainer
        center={defaultPosition}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "600px", maxWidth: "95%", margin: "auto" }}
        className="rounded-lg shadow-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarkerOld triggerLocation={triggerLocation} />
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
