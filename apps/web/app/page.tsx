import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import FeaturedBanner from "@/components/banner/FeaturedBanner";
import GamesSection from "@/components/games/GamesSection";
import StatsSection from "@/components/stats/StatsSection";
import Footer from "@/components/footer/Footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />
          <Hero />
          <FeaturedBanner />
          <StatsSection />
          <GamesSection />
          <Footer />
        </div>
      </div>
    </main>
  );
}