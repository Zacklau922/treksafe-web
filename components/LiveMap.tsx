"use client";
import React, { useEffect, ReactNode, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import customIcon from "/pin-drop-01.svg";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";
import { Button } from "./ui/button";
import {
  MapPinIcon,
  MapPinOffIcon,
  Navigation2Icon,
  NavigationIcon,
} from "lucide-react";
import { FullscreenControl } from "react-leaflet-fullscreen";
import { ScaleControl } from "react-leaflet";
import "react-leaflet-fullscreen/styles.css";
import "leaflet/dist/leaflet.css";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

const thunderforestApiKey = "3606dcc00ff541e2988c1b5db48efbcb";

const DefaultIcon = L.icon({
  // iconUrl: markerIcon.src,
  iconUrl: "/trekker-02.svg",
  // shadowUrl: markerIconShadow.src,
  iconSize: [30, 50],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Create a custom icon
const CustomIcon = L.icon({
  iconUrl: "/pin-drop-01.svg", // Update with your custom icon path
  iconSize: [25, 40],
  iconAnchor: [12, 25],
});
interface CustomControlProps {
  position: "topleft" | "topright" | "bottomleft" | "bottomright";
  children: ReactNode;
}

const CustomControl = ({ position, children }: CustomControlProps) => {
  const map = useMap();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const CustomControlClass = L.Control.extend({
      options: { position },
      onAdd: () => {
        const container = containerRef.current!;
        L.DomEvent.disableClickPropagation(container);

        const root = createRoot(container);
        root.render(children as React.ReactElement);

        return container;
      },
      onRemove: () => {
        const container = containerRef.current!;
        const root = createRoot(container);
        root.unmount();
      },
    });

    const controlInstance = new CustomControlClass();
    controlInstance.addTo(map);

    return () => {
      controlInstance.remove();
    };
  }, [children, map, position]);

  return (
    <div
      ref={containerRef}
      className="leaflet-bar leaflet-control leaflet-control-custom"
      style={{ border: "none" }} // Add inline style to remove border
    />
  );
};

function LocateButton() {
  const map = useMap();

  const handleLocationRequest = () => {
    map.locate({ setView: true, maxZoom: 16 });
  };

  return (
    <div style={{ position: "absolute", top: 120, right: 10, zIndex: 1000 }}>
      <Button
        size="icon"
        variant="outline"
        className="flex "
        onClick={handleLocationRequest}
      >
        <NavigationIcon size={18} />
      </Button>
    </div>
  );
}

interface LocationMarkerOldProps {
  triggerLocation: boolean;
}

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
  {
    position: [5.37415, 100.49564] as [number, number],
    title: "Old Dam",
    image: "/tokun/old-dam.png",
    alt: "old-dam",
  },
  {
    position: [5.36511, 100.49165] as [number, number],
    title: "Rest Point 1",
    image: "",
    alt: "rest-point-1",
  },
  {
    position: [5.36684, 100.48935] as [number, number],
    title: "Rest Point 2 - 康乐亭",
    image: "",
    alt: "rest-point-2",
  },
  {
    position: [5.37391, 100.49861] as [number, number],
    title: "View Point 1 (Mengkuang Dam)",
    image: "/tokun/mengkuang-1.png",
    alt: "view-point-mengkuang-dam-1",
  },
  {
    position: [5.37477, 100.48908] as [number, number],
    title: "View Point 2 (Mengkuang Dam)",
    image: "/tokun/mengkuang-2.png",
    alt: "view-point-mengkuang-dam-2",
  },
  {
    position: [5.36842, 100.49029] as [number, number],
    title: "Anak Irau",
    image: "/tokun/anak-irau.png",
    alt: "anak-irau",
  },
  {
    position: [5.3686, 100.49519] as [number, number],
    title: "Datuk Gong - 拿督公",
    image: "/tokun/datuk-700.png",
    alt: "datuk-gong-700",
  },
  {
    position: [5.36899, 100.49368] as [number, number],
    title: "350",
    image: "/tokun/350.png",
    alt: "350",
  },
  {
    position: [5.36702, 100.49471] as [number, number],
    title: "Fallen Tree - 老年大树",
    image: "",
    alt: "old-fallen-tree",
  },
];

export default function LiveMap() {
  const [triggerLocation, setTriggerLocation] = useState(false);
  const defaultPosition: [number, number] = [5.3645, 100.4909];
  const [markersVisible, setMarkersVisible] = useState(true);

  const handleLocationRequest = () => {
    setTriggerLocation(true);
  };

  const toggleMarkers = () => {
    setMarkersVisible((prevState) => !prevState);
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
        className="rounded-3xl shadow-lg max-w-2xl z-10"
      >
        <ScaleControl position="bottomleft" />
        <LocateButton />

        <LocationMarkerOld triggerLocation={false} />

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

        {markersVisible &&
          markers.map((marker, index) => (
            <Marker key={index} position={marker.position} icon={CustomIcon}>
              <Popup>
                <div className="min-w-[200px] max-w-[200px]">
                  <h2 className="truncate">{marker.title}</h2>
                  {marker.image && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Image
                          src={marker.image}
                          alt={marker.alt}
                          width={1000}
                          height={1000}
                          style={{ width: "200px", height: "auto" }}
                          className="object-cover cursor-pointer"
                        />
                      </DialogTrigger>
                      <DialogContent className="dialog-content sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>{marker.title}</DialogTitle>
                        </DialogHeader>
                        <Image
                          src={marker.image}
                          alt={marker.alt}
                          width={1000}
                          height={1000}
                          style={{ width: "auto", height: "auto" }}
                          className="object-cover"
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

        <CustomControl position="topright">
          <Button
            size="icon"
            variant="outline"
            onClick={toggleMarkers}
            className="font-bold"
          >
            {markersVisible ? (
              <MapPinOffIcon size={18} />
            ) : (
              <MapPinIcon size={18} />
            )}
          </Button>
        </CustomControl>
      </MapContainer>
    </div>
  );
}
