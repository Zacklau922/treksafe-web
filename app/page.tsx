import Image from "next/image";
import ClickableMap from "../components/ClickableMap";

const points = [
  {
    name: "Peak",
    coords: { x: 260, y: 768 },
    image: "/tokun/trek-800.jpg",
  },
  {
    name: "Big Tree",
    coords: { x: 1077, y: 1046 },
    image: "/tokun/trek-800.jpg",
  },
  {
    name: "Trek 800",
    coords: { x: 1400, y: 778 },
    image: "/tokun/trek-800.jpg",
  },
];

export default async function Index() {
  const canInitSupabaseClient = () => {};

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-6 items-center">
      <div className="animate-in flex-1 flex flex-col gap-6 max-w-4xl px-3 py-6">
        <main className="flex-1 flex flex-col gap-6">
          <ClickableMap src="/map/tokun-01.png" points={points} />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
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
      </footer>
    </div>
  );
}
