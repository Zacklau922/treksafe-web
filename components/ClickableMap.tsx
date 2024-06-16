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
      <Image ref={imageRef} src={src} alt="Map" width={3000} height={3000} />
      {points.map((point, index) => {
        const scaledCoords = getScaledCoords(point.coords);
        return (
          <Drawer
            key={index}
            open={selectedPoint === point}
            onClose={handleClose}
          >
            <DrawerTrigger>
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
                📍
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{point.name}</DrawerTitle>
                <DrawerDescription>
                  Coordinates: ({point.coords.x}, {point.coords.y})
                </DrawerDescription>
              </DrawerHeader>
              <div>
                {point.image && (
                  <img
                    src={point.image}
                    alt={point.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                )}
              </div>
              <DrawerFooter>
                <Button onClick={handleClose}>Close</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        );
      })}
    </div>
  );
};

export default ClickableMap;
