import Image from "next/image";
import Link from "next/link";

type GameCardProps = {
  title: string;
  image: string;
  description: string;
  route: string;
};

export default function GameCard({
  title,
  image,
  description,
  route,
}: GameCardProps) {
  return (
    <Link
      href={route}
      className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500 hover:shadow-[0_0_35px_rgba(234,179,8,0.35)]"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-white transition-colors group-hover:text-yellow-400">
          {title}
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          {description}
        </p>

        <button className="mt-5 w-full rounded-xl bg-yellow-500 py-3 font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-yellow-400">
          Play Now
        </button>
      </div>
    </Link>
  );
}