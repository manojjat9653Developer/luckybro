import Container from "@/components/layout/Container";
import { ArrowRight } from "lucide-react";

export default function FeaturedBanner() {
  return (
    <section className="py-16">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/15 via-zinc-900 to-zinc-950 p-10">
          <div className="max-w-2xl">
            <span className="rounded-full bg-yellow-500 px-4 py-1 text-sm font-semibold text-black">
              🎁 Limited Time Offer
            </span>

            <h2 className="mt-6 text-5xl font-extrabold text-white">
              Get
              <span className="text-yellow-400"> 100% Welcome Bonus</span>
            </h2>

            <p className="mt-5 text-lg text-zinc-300">
              Deposit today and double your balance instantly.
              Start playing your favourite games with exclusive rewards.
            </p>

            <button className="mt-8 flex items-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-yellow-400">
              Claim Bonus
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}