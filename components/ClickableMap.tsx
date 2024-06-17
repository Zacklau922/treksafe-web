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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [preloadedImages, setPreloadedImages] = useState<{
    [key: string]: string;
  }>({});

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
    // Preload images
    const preloadImages = async () => {
      const loadedImages: { [key: string]: string } = {};
      for (const point of points) {
        if (point.image) {
          const img = new window.Image();
          img.src = point.image;
          await new Promise<void>((resolve) => {
            img.onload = () => resolve();
          });
          loadedImages[point.image] = point.image;
        }
      }
      setPreloadedImages(loadedImages);
    };
    preloadImages();
  }, [points]);

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

      <div className="flex justify-between items-center max-w-lg mx-auto gap-1">
        <div className="flex flex-col w-full py-3 px-1 gap-2">
          <Dialog>
            <DialogTrigger>
              {" "}
              <Button
                type="button"
                variant="outline"
                className="flex w-full border-green-600 rounded-xl font-semibold"
              >
                Survival Tips
              </Button>
            </DialogTrigger>
            <DialogContent className="flex w-10/12 rounded-xl flex-col items-center p-6">
              <DialogHeader>
                <DialogTitle>Hike Smart at Tokun Mountain!</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col justify-center items-center w-full py-4">
                    <ul>
                      <li>
                        Bring Essentials
                        <br />
                        Water, snacks, sun protection & first-aid kit.
                      </li>
                      <br />
                      <li>
                        Plan & Share
                        <br />
                        Research trail, tell someone your plan, be clear on
                        where you&apos;re heading
                      </li>
                      <br />
                      <li>
                        Stay Safe
                        <br />
                        Hike with a buddy, stay on trails, turn back when
                        needed.
                      </li>
                    </ul>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Button
            type="button"
            variant="outline"
            className="flex border-green-600 rounded-xl font-semibold"
          >
            Famous Trails
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex border-green-600 rounded-xl font-semibold"
          >
            Lost & Found
          </Button>
        </div>

        <div className="flex flex-col justify-center items-center rounded-2xl border border-green-600 w-full py-5 bg-white">
          <h1 className="font-bold">Emergency Contact</h1>
          <h1>Balai Bomba (BM)</h1>
          <li>04 – 538 4444</li>
          <li>04 – 537 4693</li>
        </div>
      </div>

      {points.map((point, index) => {
        const scaledCoords = getScaledCoords(point.coords);
        return (
          // <Dialog key={index} open={selectedPoint === point}>
          //   <DialogTrigger>
          //     <div
          //       className="absolute text-2xl cursor-pointer map-point"
          //       style={{
          //         left: `${scaledCoords.x}px`,
          //         top: `${scaledCoords.y}px`,
          //         transform: "translate(-50%, -50%)",
          //       }}
          //       onClick={(e) => {
          //         e.stopPropagation();
          //         handleClick(point);
          //       }}
          //     >
          //       <CircleIcon size={40} className="flex opacity-0 " />
          //     </div>
          //   </DialogTrigger>
          //   <DialogContent className="flex w-10/12 rounded-xl flex-col items-center">
          //     <div className="text-2xl font-bold text-inherit mx-auto max-w-2xl mb-10 pt-3 text-slate-800 px-4 overflow-y-auto max-h-[80vh] ">
          //       <div className="flex flex-col  items-center text-2xl xl:text-3xl mx-auto justify-center py-2">
          //         <div className="flex justify-center w-full items-center mx-auto">
          //           <h1>{point.name}</h1>
          //         </div>

          //         {point.image && preloadedImages[point.image] && (
          //           <div className="mx-auto max-w-2xl w-full">
          //             {point.image && (
          //               <Image
          //                 src={point.image}
          //                 alt={point.name}
          //                 width={1000}
          //                 height={1000}
          //                 className="w-full object-cover rounded-lg mb-2 p-3"
          //               />
          //             )}
          //           </div>
          //         )}
          //       </div>
          //     </div>
          //   </DialogContent>
          // </Dialog>

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
