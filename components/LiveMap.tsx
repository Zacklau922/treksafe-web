"use client";
import React, { useEffect, ReactNode, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { MapPinIcon, MapPinOffIcon, NavigationIcon } from "lucide-react";
import { FullscreenControl } from "react-leaflet-fullscreen";
import { ScaleControl } from "react-leaflet";
import "react-leaflet-fullscreen/styles.css";
import "leaflet/dist/leaflet.css";
import { createRoot } from "react-dom/client";
import { Skeleton } from "@/components/ui/skeleton";
import { PhoneIcon } from "lucide-react";

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

type LocationCoordinates = {
  "Bukit Cherok Tokun": [number, number];
  "Bukit Seraya": [number, number];
};

const locations: LocationCoordinates = {
  "Bukit Cherok Tokun": [5.3666, 100.4905],
  "Bukit Seraya": [5.3592, 100.507],
};

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
      style={{ border: "none" }}
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
  const [defaultPosition, setDefaultPosition] = useState<[number, number]>([
    5.3666, 100.4905,
  ]);
  const [selectedLocation, setSelectedLocation] =
    useState<keyof LocationCoordinates>("Bukit Cherok Tokun");
  const [triggerLocation, setTriggerLocation] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const [markersVisible, setMarkersVisible] = useState(true);
  const [showLiveMap, setShowLiveMap] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLiveMap(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMarkers = () => {
    setMarkersVisible((prevState) => !prevState);
  };

  const handleLocationSelect = (value: keyof LocationCoordinates) => {
    setSelectedLocation(value);
    setDefaultPosition(locations[value]);
    if (mapRef.current) {
      mapRef.current.setView(locations[value], 15);
    }
  };

  const locationDescriptions: Record<
    keyof LocationCoordinates,
    { title: string; description: string; description2: string }
  > = {
    "Bukit Cherok Tokun": {
      title: "Discover Bukit Cherok Tokun",
      description: `
      Bukit Cherok Tokun, also known as Tokun Hill, rises approximately 545 meters above sea level in Bukit Mertajam, Penang, Malaysia. It is a renowned natural landmark offering breathtaking panoramic views and serene hiking trails through lush rainforests.
     `,
      description2: `      The hill's name is believed to derive from the Malayan sun bear ('cherok'), once native to its slopes. Today, Bukit Cherok Tokun is a popular destination for nature enthusiasts and hikers alike. Its rich biodiversity, ancient trees, and historical significance make it a compelling spot for visitors seeking both adventure and tranquility.
`,
    },
    "Bukit Seraya": {
      title: "Discover Bukit Seraya",
      description: `
      Bukit Seraya, located in the northern region of Penang, Malaysia, stands gracefully at an altitude of 250 meters. This enchanting hill is renowned for its rich biodiversity, captivating vistas, and pristine hiking trails.

     `,
      description2: `      The hill's name, 'Seraya,' originates from the Malay word for the white meranti tree ('seraya putih'), once abundant in its forests. Today, Bukit Seraya invites visitors to explore its ancient trees and panoramic viewpoints, offering a serene escape for nature lovers and adventure seekers alike.
`,
    },
  };

  return (
    <div className="relative w-full">
      {/* Select Location */}
      <div className="flex flex-col items-center max-w-2xl mx-auto gap-1 mb-3">
        {showLiveMap ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl font-bold  w-[95%] shadow-md bg-green-50 border-green-600 text-green-600 border-2"
              >
                <span className="flex items-center gap-1">
                  <MapPinIcon width={15} />
                  {selectedLocation}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="dialog-content sm:max-w-[425px] w-11/12 rounded-xl">
              <DialogHeader>
                <DialogTitle>Select a Mountain</DialogTitle>
              </DialogHeader>
              <Select
                onValueChange={handleLocationSelect}
                defaultValue={selectedLocation}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a mountain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Bukit Cherok Tokun">
                      Bukit Cherok Tokun
                    </SelectItem>
                    <SelectItem value="Bukit Seraya">Bukit Seraya</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button className="w-full" type="button" variant="default">
                    Confirm
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Skeleton
            className="  rounded-3xl w-full"
            style={{ height: "50px", maxWidth: "95%", margin: "auto" }}
          />
        )}
      </div>

      {/* Map Container */}
      <div className=" flex-1 flex flex-col gap-3 max-w-2xl mx-auto">
        {showLiveMap ? (
          <div className="max-w-2xl relative justify-center flex flex-col items-center">
            <MapContainer
              id="map"
              ref={mapRef}
              center={defaultPosition}
              zoomControl={false}
              zoom={15}
              scrollWheelZoom={true}
              style={{ height: "600px", maxWidth: "95%", margin: "auto" }}
              className="rounded-xl shadow-lg max-w-2xl z-10"
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
                  <Marker
                    key={index}
                    position={marker.position}
                    icon={CustomIcon}
                  >
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
        ) : (
          <Skeleton
            className="  rounded-3xl w-full px-3"
            style={{ height: "600px", maxWidth: "95%", margin: "auto" }}
          />
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col items-center max-w-2xl mx-auto gap-1 my-3">
        {showLiveMap ? (
          <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">
              {locationDescriptions[selectedLocation].title}
            </h1>
            <p className="text-lg leading-relaxed  mb-4">
              {locationDescriptions[selectedLocation].description}
            </p>
            <p className="text-lg leading-relaxed">
              {locationDescriptions[selectedLocation].description2}
            </p>
          </div>
        ) : (
          <Skeleton
            className="  rounded-3xl w-full"
            style={{ height: "200px", maxWidth: "95%", margin: "auto" }}
          />
        )}

        {showLiveMap ? (
          <div className="flex flex-col items-center gap-2 w-11/12 justify-center  my-3 rounded-2xl border border-green-700 py-6 bg-green-50 max-w-2xl px-9 shadow-lg border-dotted">
            <h1 className="font-bold mb-3">Emergency Contact</h1>

            <Button
              size="lg"
              className="w-full rounded-full  bg-green-600 font-semibold"
            >
              <a
                href="tel:04-5384444"
                className="flex items-center justify-center gap-2 text-base text-white py-3 px-4"
              >
                <PhoneIcon size={18} />
                <span>Balai Bomba (BM): 04 - 538 4444</span>
              </a>
            </Button>

            <Button
              size="lg"
              className="w-full rounded-full bg-green-600 font-semibold"
            >
              <a
                href="tel:04-5374693"
                className="flex items-center justify-center gap-2 text-base text-white py-3 px-4"
              >
                <PhoneIcon size={18} />
                <span>Balai Bomba (BM): 04 - 537 4693</span>
              </a>
            </Button>
          </div>
        ) : (
          <Skeleton
            className="  rounded-3xl w-full"
            style={{ height: "200px", maxWidth: "95%", margin: "auto" }}
          />
        )}
      </div>
    </div>
  );
}
