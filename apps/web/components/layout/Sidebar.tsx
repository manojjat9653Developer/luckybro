import {
  Bomb,
  CircleDot,
  Dices,
  Gem,
  Home,
  Rocket,
} from "lucide-react";

const items = [
  { icon: Home, label: "Home" },
  { icon: Rocket, label: "Crash" },
  { icon: Bomb, label: "Mines" },
  { icon: Dices, label: "Dice" },
  { icon: CircleDot, label: "Plinko" },
  { icon: Gem, label: "VIP" },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-zinc-800 bg-zinc-950 lg:block">
      <div className="p-6">
        <h2 className="mb-8 text-2xl font-bold text-yellow-400">
          LuckyBro
        </h2>

        <nav className="space-y-2">
          {items.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}