"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";

export default function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-20 top-20 h-40 w-40 sm:h-60 sm:w-60 lg:h-72 lg:w-72 rounded-full bg-yellow-500/20 blur-3xl" />

        <div className="absolute right-20 bottom-20 h-40 w-40 sm:h-60 sm:w-60 lg:h-72 lg:w-72 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-sm text-yellow-400">
            🎰 India's Next Gaming Platform
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Play.
            <span className="text-yellow-400"> Win.</span>
            Repeat.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
            Experience a modern gaming platform with lightning-fast
            performance, exciting games, secure wallet, and rewarding gameplay.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="w-full rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 sm:w-auto">
              Start Playing
            </button>

            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 transition hover:bg-zinc-900 sm:w-auto">
              Explore Games
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}