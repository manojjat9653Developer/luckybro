import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";

export default function Hero() {
  return (
    <section className="flex min-h-[80vh] items-center">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-sm text-yellow-400">
            🎰 India's Next Gaming Platform
          </span>

          <h1 className="mt-6 text-6xl font-extrabold leading-tight">
            Play.
            <span className="text-yellow-400"> Win.</span>
            Repeat.
          </h1>

          <p className="mt-6 text-lg text-zinc-400">
            Experience a modern gaming platform with lightning-fast performance,
            exciting games, secure wallet, and rewarding gameplay.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400">
              Start Playing
            </button>

            <button className="flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 hover:bg-zinc-900">
              Explore Games
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}