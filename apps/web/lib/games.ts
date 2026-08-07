export type Game = {
  id: number;
  title: string;
  emoji: string;
  description: string;
};

export const games: Game[] = [
  {
    id: 1,
    title: "Crash",
    emoji: "🚀",
    description: "Predict the multiplier before it crashes.",
  },
  {
    id: 2,
    title: "Mines",
    emoji: "💣",
    description: "Avoid mines and collect rewards.",
  },
  {
    id: 3,
    title: "Dice",
    emoji: "🎲",
    description: "Roll the dice and win instantly.",
  },
  {
    id: 4,
    title: "Plinko",
    emoji: "🔵",
    description: "Drop the ball and multiply your winnings.",
  },
  {
    id: 5,
    title: "Limbo",
    emoji: "⚡",
    description: "Choose a target multiplier.",
  },
  {
    id: 6,
    title: "Wheel",
    emoji: "🎡",
    description: "Spin the wheel and test your luck.",
  },
];