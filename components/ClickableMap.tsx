"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import Image from "next/image";
import { CircleIcon, InfoIcon, Loader2Icon } from "lucide-react";

type Point = {
  name: string;
  coords: { x: number; y: number };
  image?: string; // Optional image URL for the point
};

type ClickableMapProps = {
  src: string;
  points: Point[];
};

const ClickableMap: React.FC<ClickableMapProps> = ({ src, points }) => {
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleClick = (point: Point) => {
    setSelectedPoint(point);
  };

  const handleClose = () => {
    setSelectedPoint(null);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".map-point") && !target.closest(".popup")) {
      setSelectedPoint(null);
    }
  }, []);

  useEffect(() => {
    const img = imageRef.current;
    if (img) {
      const updateImageSize = () => {
        setImageSize({ width: img.clientWidth, height: img.clientHeight });
      };
      img.addEventListener("load", updateImageSize);
      window.addEventListener("resize", updateImageSize);
      return () => {
        img.removeEventListener("load", updateImageSize);
        window.removeEventListener("resize", updateImageSize);
      };
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const getScaledCoords = (coords: { x: number; y: number }) => {
    if (!imageRef.current) return coords;
    const naturalWidth = imageRef.current.naturalWidth;
    const naturalHeight = imageRef.current.naturalHeight;
    const x = (coords.x / naturalWidth) * imageSize.width;
    const y = (coords.y / naturalHeight) * imageSize.height;
    return { x, y };
  };

  return (
    <div className="relative">
      <Image
        className="rounded-2xl"
        ref={imageRef}
        src={src}
        alt="Map"
        width={3000}
        height={3000}
      />
      {points.map((point, index) => {
        const scaledCoords = getScaledCoords(point.coords);
        return (
          <Drawer
            key={index}
            open={selectedPoint === point}
            onClose={handleClose}
          >
            <DrawerTrigger asChild className="focus:outline-none ">
              <div
                className="absolute text-2xl cursor-pointer map-point"
                style={{
                  left: `${scaledCoords.x}px`,
                  top: `${scaledCoords.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(point);
                }}
              >
                <CircleIcon size={40} className="flex opacity-0 " />
              </div>
            </DrawerTrigger>
            <DrawerContent className="focus:outline-none">
              <div className="text-2xl font-bold text-inherit mx-auto max-w-2xl mb-10 pt-3 text-slate-800 px-4 overflow-y-auto max-h-[80vh] ">
                <div className="flex flex-col  items-center text-2xl xl:text-3xl mx-auto justify-center py-2">
                  <div className="flex justify-center w-full items-center mx-auto">
                    <h1>{point.name}</h1>
                  </div>

                  {/* <div className="flex items-center gap-1 mx-auto px-3">
                    <InfoIcon width={12} color="grey" />
                    <p className="text-xs font-light italic text-slate-500">
                      Good place
                    </p>
                  </div> */}

                  <div className="mx-auto max-w-2xl w-full">
                    {point.image && (
                      <Image
                        src={point.image}
                        alt={point.name}
                        width={1000}
                        height={1000}
                        className="w-full object-cover rounded-lg mb-2 p-3"
                      />
                    )}
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        );
      })}
    </div>
  );
};

export default ClickableMap;
