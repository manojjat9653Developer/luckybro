"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { games } from "@/lib/games";

export default function GameSearch() {
  const [query, setQuery] = useState("");

  const filteredGames = useMemo(() => {
    if (!query.trim()) return [];

    return games.filter((game) =>
      game.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="relative">
      <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-900 px-3">
        <Search size={18} className="text-zinc-400" />

        <input
          type="text"
          placeholder="Search games..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-56 bg-transparent px-3 py-2 text-white outline-none placeholder:text-zinc-500"
        />
      </div>

      {filteredGames.length > 0 && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
          {filteredGames.map((game) => (
            <Link
              key={game.id}
              href={`/games/${game.title.toLowerCase()}`}
              className="flex items-center gap-3 px-4 py-3 transition hover:bg-zinc-800"
            >
              <Image
                src={game.image}
                alt={game.title}
                width={80}
                height={48}
                className="h-12 w-20 rounded-lg object-cover"
              />

              <div>
                <h4 className="font-semibold text-white">
                  {game.title}
                </h4>

                <p className="text-xs text-zinc-400">
                  {game.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {query.trim() && filteredGames.length === 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-center text-zinc-400">
          No games found.
        </div>
      )}
    </div>
  );
}