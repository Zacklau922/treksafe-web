import Image from "next/image";
import ClickableMap from "../components/ClickableMap";

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

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col items-center bg-green-50 text-green-700 min-h-screen">
      <div className="flex flex-col items-center pt-6">
        <p className="text-3xl font-bold lg:text-4xl mx-auto max-w-xl text-center">
          Cherok Tok Kun Map
        </p>
      </div>

      <div className="flex flex-col items-center py-3">
        <p className="text-sm font-bold  mx-auto max-w-xl text-center italic">
          Click the icon to view details
        </p>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-6 max-w-4xl px-3  ">
        <main className="flex-1 flex flex-col gap-6">
          <ClickableMap src="/map/tokun-01.png" points={points} />
        </main>
      </div>

      {/* <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Created by{" "}
          <a
            href="https://www.instagram.com/zack_922/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Zack Lau
          </a>
        </p>
      </footer> */}
    </div>
  );
}
