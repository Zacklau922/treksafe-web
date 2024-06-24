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
import {
  ChevronDownIcon,
  LocateIcon,
  MapPinIcon,
  MapPinOffIcon,
  NavigationIcon,
  StarsIcon,
} from "lucide-react";
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

type MarkerType = {
  position: [number, number];
  title: string;
  image: string;
  alt: string;
};

// Create a custom icon
const CustomIcon = L.icon({
  iconUrl: "/star-1.svg", // Update with your custom icon path
  iconSize: [15, 15],
  // iconAnchor: [12, 25],
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

interface LocationMarkerOldProps {
  triggerLocation: boolean;
}

const markers: MarkerType[] = [
  {
    position: [5.37391, 100.49861] as [number, number],
    title: "View Point 1",
    image: "/tokun/mengkuang-1.png",
    alt: "view-point-1",
  },
  {
    position: [5.37477, 100.48908] as [number, number],
    title: "View Point 2",
    image: "/tokun/mengkuang-2.png",
    alt: "view-point-2",
  },
  {
    position: [5.36969, 100.48472] as [number, number],
    title: "View Point 3",
    image: "/tokun/view-point.png",
    alt: "view-point-3",
  },
  {
    position: [5.35739, 100.49199] as [number, number],
    title: "Old Dam I",
    image: "/tokun/old-dam-2.png",
    alt: "old-dam-1",
  },
  {
    position: [5.37415, 100.49564] as [number, number],
    title: "Old Dam II",
    image: "/tokun/old-dam.png",
    alt: "old-dam-2",
  },
  {
    position: [5.36724, 100.4977] as [number, number],
    title: "800 Rock I",
    image: "/tokun/trek-800.jpg",
    alt: "800-1",
  },
  {
    position: [5.37141, 100.48466] as [number, number],
    title: "800 Rock II",
    image: "/tokun/800.png",
    alt: "800-2",
  },
  {
    position: [5.3643209, 100.4943647] as [number, number],
    title: "Big Tree",
    image: "/tokun/big-tree.png",
    alt: "big-tree",
  },
  {
    position: [5.35862, 100.48903] as [number, number],
    title: "The Mask",
    image: "/tokun/the-mask.png",
    alt: "the-mask",
  },
  {
    position: [5.36842, 100.49029] as [number, number],
    title: "Anak Irau Tree",
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
    title: "350 Rock",
    image: "/tokun/350.png",
    alt: "350",
  },

  {
    position: [5.36586, 100.48651] as [number, number],
    title: "Three Red Chairs",
    image: "/tokun/three-red-chair.png",
    alt: "three-red-chair",
  },
  {
    position: [5.36729, 100.48558] as [number, number],
    title: "Dragon Mustache Tree (龙须树)",
    image: "/tokun/dragon-mustache-tree.png",
    alt: "dragon-mustache-tree",
  },
  {
    position: [5.36319, 100.48438] as [number, number],
    title: "Rock Forest (岩林)",
    image: "/tokun/rock-forest.png",
    alt: "rock-forest",
  },
  {
    position: [5.36231, 100.48562] as [number, number],
    title: "Triple Rock",
    image: "/tokun/triple-rocks.png",
    alt: "triple-rocks",
  },
  {
    position: [5.36152, 100.48767] as [number, number],
    title: "Datuk Rock",
    image: "/tokun/datuk-rock.png",
    alt: "datuk-rock",
  },

  {
    position: [5.35822, 100.48878] as [number, number],
    title: "Ivy Roots Rock",
    image: "/tokun/ivg-roots-rock.png",
    alt: "ivg-roots-rock",
  },
  {
    position: [5.36464, 100.48199] as [number, number],
    title: "Big Fallen Tree",
    image: "/tokun/big-fallen-tree.png",
    alt: "big-fallen-tree",
  },

  {
    position: [5.36686, 100.48351] as [number, number],
    title: "Tower Station",
    image: "/tokun/tower-station.png",
    alt: "tower-station",
  },
  // {
  //   position: [5.36511, 100.49165] as [number, number],
  //   title: "Rest Point 1",
  //   image: "",
  //   alt: "rest-point-1",
  // },
  // {
  //   position: [5.36684, 100.48935] as [number, number],
  //   title: "Rest Point 2 - 康乐亭",
  //   image: "",
  //   alt: "rest-point-2",
  // },
  // {
  //   position: [5.36702, 100.49471] as [number, number],
  //   title: "Fallen Tree - 老年大树",
  //   image: "",
  //   alt: "old-fallen-tree",
  // },
];

export default function LiveMap() {
  const [defaultPosition, setDefaultPosition] = useState<[number, number]>([
    5.3666, 100.4905,
  ]);
  const [selectedLocation, setSelectedLocation] =
    useState<keyof LocationCoordinates>("Bukit Cherok Tokun");
  const [triggerLocation, setTriggerLocation] = useState(false);
  // const mapRef = useRef<L.Map | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);
  const [markersVisible, setMarkersVisible] = useState(true);
  const [showLiveMap, setShowLiveMap] = useState(false);

  const handleLocateMe = () => {
    setTriggerLocation(true);
  };

  const handleAttractionClick = (marker: MarkerType) => {
    setSelectedMarker(marker);
    if (mapContainerRef.current) {
      mapContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
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

  function LocationMarkerOld({
    triggerLocation,
  }: {
    triggerLocation: boolean;
  }) {
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

  useEffect(() => {
    if (selectedMarker && mapRef.current) {
      const map = mapRef.current;
      map.flyTo(selectedMarker.position, 15);
      const marker = L.marker(selectedMarker.position, {
        icon: CustomIcon,
      }).addTo(map);
      marker
        .bindPopup(
          // `<b>${selectedMarker.title}</b><br><img src="${selectedMarker.image}" alt="${selectedMarker.alt}" style="width: 100%; height: auto;">`
          `<b>${selectedMarker.title}</b>`
        )
        .openPopup();
    }
  }, [selectedMarker]);

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
      <div className="flex justify-between items-center max-w-2xl mx-auto gap-1 px-3 w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="w-full rounded-lg font-bold shadow-md border-green-700 text-green-700 px-3"
            >
              <span className="flex justify-between w-full items-center gap-1">
                <span className="flex items-center">
                  <MapPinIcon width={18} />
                </span>
                <span className="flex-grow text-center">
                  {selectedLocation}
                </span>
                <span className="flex items-center">
                  <ChevronDownIcon size={18} />
                </span>
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

        <div className="flex flex-col items-center mx-auto gap-1">
          <Button
            size="icon"
            variant="outline"
            className="rounded-lg font-bold shadow-md border-green-700 text-green-700 max-w-[120px]"
            onClick={handleLocateMe}
          >
            <LocateIcon width={18} />
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div
        ref={mapContainerRef}
        className=" flex-1 flex flex-col gap-3 max-w-2xl mx-auto mt-2"
      >
        {showLiveMap ? (
          <div className="max-w-2xl relative justify-center flex flex-col items-center">
            <MapContainer
              id="map"
              ref={mapRef}
              center={defaultPosition}
              zoomControl={false}
              zoom={15}
              scrollWheelZoom={true}
              style={{ maxWidth: "95%", margin: "auto" }}
              className="rounded-xl shadow-lg max-w-2xl z-10 border-4 border-green-700 max-h-[60vh]"
            >
              <ScaleControl position="bottomleft" />
              <LocateButton />

              <LocationMarkerOld triggerLocation={triggerLocation} />

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
                    {/* <Popup>
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
                    </Popup> */}
                    <Popup>
                      <div className=" max-w-[200px]">
                        <h2 className="truncate">{marker.title}</h2>
                        {/* {marker.image && (
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
                        )} */}
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

      {/* To Attractions */}
      <div className="flex flex-col items-center max-w-2xl mx-auto gap-1 mt-2">
        {showLiveMap ? (
          <div className="max-w-3xl mx-auto px-3 pt-2">
            <h1 className="text-lg font-bold mb-2 flex items-center mx-auto justify-center">
              <StarsIcon size={18} className="mr-2" />
              Top Attractions
            </h1>
            <div className="flex overflow-x-scroll space-x-4">
              {markers.map((marker, index) => (
                <div
                  key={index}
                  className="min-w-[30%] flex-shrink-0 relative rounded-xl overflow-hidden shadow-lg"
                  onClick={() => handleAttractionClick(marker)}
                >
                  <Image
                    src={marker.image}
                    alt={marker.alt}
                    height={200}
                    width={200}
                    objectFit="cover"
                    className={`rounded-xl ${
                      selectedMarker === marker
                        ? "border-4 border-blue-500"
                        : "border-2 border-transparent"
                    }`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
                    <h2 className="text-center text-xs font-semibold">
                      {marker.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Skeleton
            className="  rounded-3xl w-full"
            style={{ height: "200px", maxWidth: "95%", margin: "auto" }}
          />
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col items-center max-w-2xl mx-auto gap-1 my-6">
        {showLiveMap ? (
          <div className="max-w-3xl mx-auto px-3 mt-4">
            <h1 className="text-lg font-bold mb-2 text-center">
              {locationDescriptions[selectedLocation].title}
            </h1>
            <p className="text-sm leading-relaxed mb-2">
              {locationDescriptions[selectedLocation].description}
            </p>
            <p className="text-sm leading-relaxed">
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
          <div className="flex flex-col items-center max-w-2xl mx-auto gap-3 border border-green-700 border-dotted rounded-xl p-6 w-11/12 my-6">
            <h1 className="font-bold mb-3 text-lg">Emergency Contact</h1>

            <Button className="w-full rounded-full  bg-green-600 font-semibold text-sm">
              <a
                href="tel:04-5384444"
                className="flex items-center gap-2  text-white py-3 px-4"
              >
                <PhoneIcon size={15} />
                Balai Bomba (BM): 04 - 538 4444
              </a>
            </Button>

            <Button className="w-full rounded-full bg-green-600 font-semibold text-sm">
              <a
                href="tel:04-5374693"
                className="flex items-center  gap-2   text-white py-3 px-4"
              >
                <PhoneIcon size={15} />
                Balai Bomba (BM): 04 - 537 4693
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
