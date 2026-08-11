import Image from "next/image";
import Link from "next/link";

type GameSlideProps = {
  title: string;
  image: string;
  description: string;
};

export default function GameSlide({
  title,
  image,
  description,
}: GameSlideProps) {
  return (
    <Link
      href={`/games/${title.toLowerCase()}`}
      className="group block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-yellow-500"
    >
      <div className="relative aspect-video overflow-hidden rounded-t-2xl">
        <Image 
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-300 group-hover:scale-110"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          {description}
        </p>
      </div>
    </Link>
  );
}