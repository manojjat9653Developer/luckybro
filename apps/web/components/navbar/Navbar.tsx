import { Trophy, Wallet } from "lucide-react";
import Container from "@/components/layout/Container";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <Container className="flex h-16 items-center justify-between">
        <h1 className="text-2xl font-bold text-yellow-400">
          LuckyBro
        </h1>

        <nav className="hidden gap-8 text-zinc-300 md:flex">
          <a href="#">Games</a>
          <a href="#">Leaderboard</a>
          <a href="#">VIP</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black">
            <Wallet size={18} />
            Wallet
          </button>

          <button className="rounded-lg border border-zinc-700 px-4 py-2 text-white">
            Login
          </button>
        </div>
    </Container>
    </header>
  );
}