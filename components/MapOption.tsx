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
  const [showLiveMap, setShowLiveMap] = useState(false);

  const toggleMap = () => {
    setShowLiveMap((prevState) => !prevState);
  };

  return (
    <div className="relative">
      <div className=" flex-1 flex flex-col gap-6 max-w-2xl px-3">
        <Button
          className="flex items-center justify-center mx-auto px-3 rounded-xl"
          onClick={toggleMap}
        >
          Show Live Map
        </Button>
        <main className="">
          {showLiveMap ? (
            <div className="max-w-2xl w-full">
              <DynamicLiveMap />
            </div>
          ) : (
            <ClickableMap src="/map/tokun-01.png" points={points} />
          )}
        </main>
      </div>

      <div className="flex justify-between items-center max-w-2xl mx-auto gap-1 px-3">
        <div className="flex flex-col w-full py-3 px-1 gap-2">
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
        </div>

        <div className="flex flex-col justify-center items-center rounded-2xl border border-green-600 w-full py-5 bg-white">
          <h1 className="font-bold">Emergency Contact</h1>
          <h1>Balai Bomba (BM)</h1>
          <li>04 – 538 4444</li>
          <li>04 – 537 4693</li>
        </div>
      </div>
    </div>
  );
};

export default MapOption;
