"use client";

import Link from "next/link";
import { Wallet, User, Trophy } from "lucide-react";
import GameSearch from "./GameSearch";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-black/70 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-8">
        {/* Left */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Trophy size={28} className="text-yellow-400" />
            <span className="text-2xl font-extrabold text-yellow-400">
              LuckyBro
            </span>
          </Link>

          <nav className="hidden lg:flex gap-8">
            <Link href="/" className="text-zinc-300 transition hover:text-yellow-400">
              Games
            </Link>

            <Link href="/" className="text-zinc-300 transition hover:text-yellow-400">
              Live
            </Link>

            <Link href="/" className="text-zinc-300 transition hover:text-yellow-400">
              Promotions
            </Link>

            <Link href="/" className="text-zinc-300 transition hover:text-yellow-400">
              Leaderboard
            </Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
         <GameSearch />

          <button className="flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400">
            <Wallet size={18} />
            Wallet
          </button>

          <button className="rounded-xl border border-zinc-700 p-3 transition hover:border-yellow-400">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}