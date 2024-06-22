import Header from "@/components/Header";
import LiveMap from "@/components/LiveMap";
import MapOption from "@/components/MapOption";
import dynamic from "next/dynamic";

const DynamicLiveMap = dynamic(() => import("../components/LiveMap"), {
  ssr: false,
});

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col items-center text-green-700 min-h-screen border-green-700">
      <Header />

      {/* <MapOption /> */}
      <DynamicLiveMap />

      <footer className="w-full border-t border-t-foreground/10 p-8 mt-6 flex justify-center text-center text-xs">
        <p>
          <a
            href="https://www.instagram.com/trek_safe/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Follow us on Instagram
          </a>
        </p>
      </footer>
    </div>
  );
}
