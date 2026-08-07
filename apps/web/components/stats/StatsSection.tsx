import Container from "@/components/layout/Container";
import StatCard from "./StatCard";
import {
  Users,
  Wallet,
  Gamepad2,
  Star,
} from "lucide-react";

export default function StatsSection() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">

          <StatCard
            icon={<Users size={36} />}
            value="250K+"
            label="Players"
          />

          <StatCard
            icon={<Wallet size={36} />}
            value="₹50Cr+"
            label="Paid Out"
          />

          <StatCard
            icon={<Gamepad2 size={36} />}
            value="120+"
            label="Games"
          />

          <StatCard
            icon={<Star size={36} />}
            value="4.9"
            label="Rating"
          />

        </div>
      </Container>
    </section>
  );
}