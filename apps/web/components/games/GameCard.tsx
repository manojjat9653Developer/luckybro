import Link from "next/link";
type GameCardProps = {
  title: string;
  emoji: string;
  description: string;
  route: string;
};

export default function GameCard({
  title,
  emoji,
  description,
  route,
}: GameCardProps) {
  return (
    <Link
  href={route}
  className="group block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500"
>
      <div className="flex h-44 items-center justify-center bg-zinc-950 text-7xl">
        {emoji}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          {description}
        </p>

        <button className="mt-5 w-full rounded-xl bg-yellow-500 py-3 font-semibold text-black transition hover:bg-yellow-400">
          Play Now
        </button>
      </div>
    </Link>
  );
}