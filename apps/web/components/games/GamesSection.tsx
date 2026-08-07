import Container from "@/components/layout/Container";
import GameCard from "./GameCard";
import { games } from "@/lib/games";

export default function GamesSection() {
  return (
    <section className="py-20">
      <Container>
        <h2 className="mb-10 text-center text-4xl font-bold">
          Popular Games
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              image={game.image}
              description={game.description}
              route={`/games/${game.title.toLowerCase()}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}