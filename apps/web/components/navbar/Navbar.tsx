"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Wallet,
  User,
  Trophy,
} from "lucide-react";
import GameSearch from "./GameSearch";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur-xl">
        <div className="flex h-20 items-center justify-between px-8">

          {/* Left */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2">
              <Trophy className="text-yellow-400" size={28} />
              <span className="text-2xl font-bold text-yellow-400">
                LuckyBro
              </span>
            </Link>

            <nav className="hidden lg:flex gap-8">
              <Link href="/">Games</Link>
              <Link href="/">Live</Link>
              <Link href="/">Promotions</Link>
              <Link href="/">Leaderboard</Link>
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            <div className="hidden lg:block">
              <GameSearch />
            </div>

            <button className="hidden lg:flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black">
              <Wallet size={18} />
              Wallet
            </button>

            <button className="hidden lg:flex rounded-xl border border-zinc-700 p-3">
              <User size={18} />
            </button>

            <button
              className="lg:hidden rounded-xl border border-zinc-700 p-3"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-800 bg-zinc-950">
          <nav className="flex flex-col gap-5 p-6">

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              Games
            </Link>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              Live
            </Link>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              Promotions
            </Link>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leaderboard
            </Link>

            <GameSearch />

            <button className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 font-semibold text-black">
              <Wallet size={18} />
              Wallet
            </button>

          </nav>
        </div>
      )}
    </>
  );
}