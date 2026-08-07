
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-yellow-400">
          {slug.toUpperCase()}
        </h1>

        <p className="mt-4 text-zinc-400">
          This is the {slug} game page.
        </p>
      </div>
    </main>
  );
}