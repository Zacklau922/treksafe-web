"use client";
import React from "react";
import { Button } from "./ui/button";
import { LanguagesIcon, NavigationIcon, PointerIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between items-center max-w-2xl mx-auto p-3 w-full">
      <div className="flex-1 flex justify-start">
        <Button variant="outline" size="icon">
          <NavigationIcon />
        </Button>
      </div>

      <div className="flex flex-col items-center text-center flex-none gap-1">
        <p className="text-2xl font-bold lg:text-4xl mx-auto max-w-xl">
          Tokun Map
        </p>
        <div className="flex gap-1 items-center">
          <PointerIcon size={12} />
          <p className="text-xs font-semibold mx-auto max-w-xl">
            Click the icon to view details
          </p>
        </div>
      </div>

      <div className="flex-1 flex justify-end">
        <Button variant="outline" size="icon">
          <LanguagesIcon />
        </Button>
      </div>
    </div>
  );
};

export default Header;
