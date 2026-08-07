import { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  value: string;
  label: string;
};

export default function StatCard({
  icon,
  value,
  label,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/10">
      <div className="mb-4 flex justify-center text-yellow-400">
        {icon}
      </div>

      <h3 className="text-3xl font-bold text-white">
        {value}
      </h3>

      <p className="mt-2 text-zinc-400">
        {label}
      </p>
    </div>
  );
}