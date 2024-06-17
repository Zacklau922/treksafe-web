import Header from "@/components/Header";
import MapOption from "@/components/MapOption";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col items-center bg-green-50 text-green-700 min-h-screen">
      <Header />

      {/* <div className="animate-in flex-1 flex flex-col gap-6 max-w-2xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <ClickableMap src="/map/tokun-01.png" points={points} />
        </main>
      </div>

      <main className="flex-1 w-full">
        <LiveMap />
      </main> */}

      <MapOption />

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
