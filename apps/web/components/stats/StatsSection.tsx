import Container from "@/components/layout/Container";

const stats = [
  { value: "250K+", label: "Active Players" },
  { value: "120+", label: "Games Available" },
  { value: "₹50Cr+", label: "Total Winnings" },
  { value: "4.9★", label: "User Rating" },
];

export default function StatsSection() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-2 gap-6 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <h3 className="text-4xl font-extrabold text-yellow-400">
                {stat.value}
              </h3>

              <p className="mt-2 text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}