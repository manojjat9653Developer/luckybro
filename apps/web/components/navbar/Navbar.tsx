"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Wallet,
  Trophy,
} from "lucide-react";

import GameSearch from "./GameSearch";
import AuthButton from "@/components/auth/AuthButton";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full border-b border-zinc-800 bg-black">
      {/* Desktop / Main Navbar */}
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Left */}
        <div className="flex min-w-0 items-center gap-6 lg:gap-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
          >
            <Trophy
              className="text-yellow-400"
              size={26}
            />

            <span className="text-xl font-bold text-yellow-400 sm:text-2xl">
              LuckyBro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            <Link
              href="/"
              className="text-sm text-zinc-300 transition hover:text-yellow-400"
            >
              Games
            </Link>

            <Link
              href="/"
              className="text-sm text-zinc-300 transition hover:text-yellow-400"
            >
              Live
            </Link>

            <Link
              href="/"
              className="text-sm text-zinc-300 transition hover:text-yellow-400"
            >
              Promotions
            </Link>

            <Link
              href="/"
              className="text-sm text-zinc-300 transition hover:text-yellow-400"
            >
              Leaderboard
            </Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Desktop Search */}
          <div className="hidden lg:block">
            <GameSearch />
          </div>

          {/* Desktop Wallet */}
          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400 lg:flex"
          >
            <Wallet size={18} />
            Wallet
          </button>

          {/* Desktop Auth */}
          <div className="hidden lg:block">
            <AuthButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-zinc-700 p-3 text-white transition hover:border-yellow-400 lg:hidden"
          >
            {mobileMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 lg:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-5 sm:px-6">

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-yellow-400"
            >
              Games
            </Link>

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-yellow-400"
            >
              Live
            </Link>

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-yellow-400"
            >
              Promotions
            </Link>

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-yellow-400"
            >
              Leaderboard
            </Link>

            {/* Mobile Search */}
            <div className="mt-3 w-full">
              <GameSearch />
            </div>

            {/* Mobile Wallet */}
            <button
              type="button"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 font-semibold text-black transition hover:bg-yellow-400"
            >
              <Wallet size={18} />
              Wallet
            </button>

            {/* Mobile Auth */}
            <div className="mt-3 flex justify-center">
              <AuthButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}