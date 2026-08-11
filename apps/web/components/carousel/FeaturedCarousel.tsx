import Container from "@/components/layout/Container";
import GameSlide from "./GameSlide";
import { games } from "@/lib/games";

export default function FeaturedCarousel() {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">
            Featured Games
          </h2>

          <p className="mt-2 text-zinc-400">
            Play our most popular games with exciting rewards.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameSlide
              key={game.id}
              title={game.title}
              image={game.image}
              description={game.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}