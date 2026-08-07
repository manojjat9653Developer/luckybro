import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import GamesSection from "@/components/games/GamesSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />
          <Hero />
          <GamesSection />
        </div>
      </div>
    </main>
  );
}