import Header from "@/components/Header";
import MapOption from "@/components/MapOption";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col items-center text-green-700 min-h-screen border-green-700">
      <Header />

      <MapOption />
      <footer className="w-full border-t border-t-foreground/10 p-8 mt-6 flex justify-center text-center text-xs">
        <p>
          Created By{" "}
          <a
            href="https://buymeacoffee.com/zacklau"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Zack Lau
          </a>
          <br />
          Support me by buying me a coffee!
        </p>
      </footer>
    </div>
  );
}
