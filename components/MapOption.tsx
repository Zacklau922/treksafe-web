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

const points = [
  {
    name: "Tower Station",
    coords: { x: 310, y: 1200 },
    image: "/tokun/tower-station.png",
  },
  {
    name: "Anak Irau",
    coords: { x: 1160, y: 1000 },
    image: "/tokun/anak-irau.png",
  },
  {
    name: "800",
    coords: { x: 2100, y: 1080 },
    image: "/tokun/trek-800.jpg",
  },
  {
    name: "Big Tree",
    coords: { x: 1660, y: 1530 },
    image: "/tokun/big-tree.png",
  },
  {
    name: "Datuk Gong 拿督公",
    coords: { x: 1700, y: 1050 },
    image: "/tokun/datuk-700.png",
  },
  {
    name: "350",
    coords: { x: 1410, y: 940 },
    image: "/tokun/350.png",
  },
  {
    name: "800",
    coords: { x: 560, y: 470 },
    image: "/tokun/trek-800-1.png",
  },
  {
    name: "View Point",
    coords: { x: 1070, y: 340 },
    image: "/tokun/mengkuang-2.png",
  },
  {
    name: "View Point",
    coords: { x: 2110, y: 370 },
    image: "/tokun/mengkuang-1.png",
  },
];

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
      <div className=" flex-1 flex flex-col gap-3 max-w-2xl px-3">
        {/* <Button
          variant="outline"
          className="flex items-center justify-center mx-auto px-3 rounded-xl"
          onClick={toggleMap}
        >
          Switch Map
        </Button> */}
        {/* <main className="">
          {showLiveMap ? (
            <div className="max-w-2xl mx-auto ">
              <DynamicLiveMap />
            </div>
          ) : (
            <ClickableMap src="/map/tokun-01.png" points={points} />
          )}
        </main> */}
      </div>

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

      <div className="flex justify-between items-center max-w-2xl mx-auto gap-1 my-3">
        {/* <div className="flex flex-col w-full py-3 px-1 gap-2">
          <Dialog>
            <DialogTrigger>
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
        </div> */}
        {showLiveMap ? (
          <div className="flex flex-col items-center gap-2 w-full mx-3 my-2 rounded-2xl border border-green-700 py-6 bg-white max-w-2xl px-9 shadow-lg">
            <h1 className="font-bold mb-3">Emergency Contact</h1>

            <Button
              size="lg"
              className="w-full rounded-xl  bg-green-700 font-bold"
            >
              <a
                href="tel:04-5384444"
                className="flex items-center justify-center gap-2 text-base text-white py-3 px-4"
              >
                <PhoneIcon size={18} />
                <span>Balai Bomba 04 - 538 4444</span>
              </a>
            </Button>

            <Button
              size="lg"
              className="w-full rounded-xl   bg-green-700 font-bold"
            >
              <a
                href="tel:04-5374693"
                className="flex items-center justify-center gap-2 text-base text-white py-3 px-4"
              >
                <PhoneIcon size={18} />
                <span>Balai Bomba 04 - 537 4693</span>
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
