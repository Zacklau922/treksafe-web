import Header from "@/components/Header";
import LiveMap from "@/components/LiveMap";
import MapOption from "@/components/MapOption";
import { LinkIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicLiveMap = dynamic(() => import("../components/LiveMap"), {
  ssr: false,
});

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col items-center text-green-800 min-h-screen ">
      <Header />

      {/* <MapOption /> */}
      <DynamicLiveMap />

      <footer className="w-full border-t border-t-foreground/10 p-8 mt-6 flex justify-center text-center text-xs">
        <Link
          href="https://www.instagram.com/trek_safe/"
          target="_blank"
          className="font-bold "
          rel="noreferrer"
        >
          <span className="flex items-center gap-1 text-green-600 border border-green-500 rounded-full px-2 py-1 hover:bg-green-50">
            <LinkIcon size={12} />
            <p>Find us on Instagram</p>
          </span>
        </Link>
      </footer>
    </div>
  );
}
