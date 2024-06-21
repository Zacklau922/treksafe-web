"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  DropletIcon,
  LanguagesIcon,
  MapPinIcon,
  MountainIcon,
  MountainSnowIcon,
  NavigationIcon,
  PinIcon,
  PointerIcon,
} from "lucide-react";

const Header = () => {
  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="flex justify-between items-center py-3 px-6">
        <h1 className="text-3xl font-bold">
          {" "}
          <span className="flex items-center gap-1">
            <MountainSnowIcon size={30} />
            TrekSafe
          </span>
        </h1>
        <Button
          size="sm"
          variant="outline"
          className="rounded-3xl font-bold border-green-700"
        >
          <span className="flex items-center gap-1">
            <MapPinIcon width={15} />
            Tokun Hill
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
