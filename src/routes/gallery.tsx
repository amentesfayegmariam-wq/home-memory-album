import { Link, createFileRoute } from "@tanstack/react-router";

import { MemoryGrid } from "@/components/gallery/memory-grid";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemories } from "@/lib/memories/use-memories";
import { wedding } from "@/lib/wedding";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `Gallery — ${wedding.brideName} & ${wedding.groomName}` },
      {
        name: "description",
        content:
          "Browse every photo and video guests shared from Mahlet & Abel's intimate home wedding.",
      },
      { property: "og:title", content: `Gallery — ${wedding.brideName} & ${wedding.groomName}` },
      {
        property: "og:description",
        content: "Every photo and video our guests shared from the wedding day.",
      },
    ],
  }),
  component: Gallery;
});

function Gallery() {
  const { memories, loading } = useMemories();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">The album</p>
        <h1 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
          Everyone's memories
        </h1>
        <span className="rule-gold mx-auto mt-7 w-28" />
        <p className="mt-7 text-base leading-relaxed text-muted-foreground">
          {memories.length} moment{memories.length === 1 ? "" : "s"} shared so far. Tap any photo
          or video to open it.
        </p>
        <Button asChild variant="gold" size="lg" className="mt-8 w-full sm:w-auto">
          <Link to="/share">Add your memories</Link>
        </Button>
      </header>

      {loading ? (
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : (
        <MemoryGrid memories={memories} className="mt-14" />
      )}
    </div>
  );
}
