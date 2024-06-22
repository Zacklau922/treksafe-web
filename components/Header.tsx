"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  HelpCircleIcon,
  InfoIcon,
  MapPinIcon,
  MountainSnowIcon,
} from "lucide-react";

const Header = () => {
  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="flex justify-between items-center py-5 px-3">
        <h1 className="text-3xl font-bold">
          {" "}
          <span className="flex items-center gap-1">
            <MountainSnowIcon size={30} />
            TrekSafe
          </span>
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full font-bold shadow-md"
            >
              <span className="flex items-center gap-1 text-xs">
                <HelpCircleIcon width={12} />
                How To Use
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="dialog-content sm:max-w-[425px] w-11/12 rounded-xl">
            <DialogHeader>
              <DialogTitle>How To Use?</DialogTitle>
            </DialogHeader>
            <ul>
              <li>1. Select a mountain.</li>
              <li>2. Explore nearby attractions/viewpoints.</li>
              <li>3. Decide on your trail route before starting.</li>
              <li>4. Click the Navigate Icon to view your current location.</li>
            </ul>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;
