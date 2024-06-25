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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  HomeIcon,
  MenuIcon,
  MountainSnowIcon,
  SparklesIcon,
  UserIcon,
} from "lucide-react";

const Header = () => {
  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="flex justify-center items-center pt-2 pb-2 px-3">
        <div className="flex w-full justify-between items-center">
          <Sheet key="left">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full ">
                <MenuIcon size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Coming Soon....</SheetDescription>
              </SheetHeader>

              <SheetFooter></SheetFooter>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold">
            <span className="flex items-center gap-1 ">
              <MountainSnowIcon size={22} />
              TrekSafe
            </span>
          </h1>

          <Sheet key="left">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full ">
                <UserIcon size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Welcome Guest !</SheetTitle>
                <SheetDescription>Coming Soon....</SheetDescription>
              </SheetHeader>

              <SheetFooter></SheetFooter>
            </SheetContent>
          </Sheet>
          {/* <p className="text-xs font-normal text-center italic">
            <span className="flex items-center gap-1">
              <SparklesIcon size={13} />
              Uncover Hidden Gems on Every Summit
            </span>
          </p> */}
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
