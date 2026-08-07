import Link from "next/link";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-yellow-400">
            LuckyBro Games
          </h1>

          <Link
            href="/"
            className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-8">
        {children}
      </main>
    </div>
  );
}