"use client";
import React, { useState } from "react";
import ClickableMap from "./ClickableMap";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { PhoneIcon } from "lucide-react";

const DynamicLiveMap = dynamic(() => import("./LiveMap"), {
  ssr: false,
});

const MapOption = () => {
  const [showLiveMap, setShowLiveMap] = useState(false); // Initially set to false to show skeleton

  // Simulate loading delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLiveMap(true); // Show map after 2 seconds (adjust as needed)
    }, 2000); // Simulating a 2 second loading delay
    return () => clearTimeout(timer);
  }, []);

  const toggleMap = () => {
    setShowLiveMap((prevState) => !prevState);
  };

  return (
    <div className="relative w-full">
      <div className=" flex-1 flex flex-col gap-3 max-w-2xl mx-auto">
        {showLiveMap ? (
          <DynamicLiveMap />
        ) : (
          <Skeleton
            className="  rounded-3xl w-full px-3"
            style={{ height: "600px", maxWidth: "95%", margin: "auto" }}
          />
        )}
      </div>

      <div className="flex flex-col items-center max-w-2xl mx-auto gap-1 my-3">
        {showLiveMap ? (
          <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Discover Tokun Hill</h1>
            <p className="text-lg leading-relaxed">
              Tokun Hill, located in Bukit Mertajam, Penang, Malaysia, is a
              renowned natural landmark offering breathtaking views and serene
              hiking trails. It is surrounded by lush greenery and rich
              biodiversity, making it a favorite spot for nature enthusiasts and
              hikers. Whether you&apos;re looking for adventure or a peaceful
              retreat into nature, Tokun Hill promises an unforgettable
              experience.
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
};

export default MapOption;
