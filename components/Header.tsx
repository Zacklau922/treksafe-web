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
  ChevronsRightIcon,
  GemIcon,
  HelpCircleIcon,
  InfoIcon,
  MapPinIcon,
  MountainSnowIcon,
  NavigationIcon,
  SearchIcon,
} from "lucide-react";

const Header = () => {
  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="flex justify-center items-center pt-2 pb-2 px-3">
        <div className="flex flex-col gap-1 justify-center text-center items-center">
          <h1 className="text-lg font-bold">
            <span className="flex items-center gap-1 text-center justify-center">
              <MountainSnowIcon size={15} />
              TrekSafe
            </span>
          </h1>
          <p className="text-xs font-medium text-center italic">
            <span className="flex items-center gap-1">
              <ChevronsRightIcon size={13} />
              Uncover Hidden Gems on Every Summit
            </span>
          </p>
        </div>
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full font-bold"
            >
              <span className="flex items-center gap-1 text-xs">
                <HelpCircleIcon width={25} />
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
        </Dialog> */}
      </div>
    </div>
  );
};

export default Header;
