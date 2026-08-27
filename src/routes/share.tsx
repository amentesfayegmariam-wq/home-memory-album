import { Link, createFileRoute } from "@tanstack/react-router";

import { MemoryUploader } from "@/components/upload/memory-uploader";
import { Button } from "@/components/ui/button";
import { wedding } from "@/lib/wedding";

export const Route = createFileRoute("/share")({
  head: () => ({
    meta: [
      { title: `Share Your Memories — ${wedding.brideName} & ${wedding.groomName}` },
      {
        name: "description",
        content:
          "Upload your photos and videos from Mahlet & Abel's home wedding. Works from any phone, tablet or computer — no account needed.",
      },
      {
        property: "og:title",
        content: `Share Your Memories — ${wedding.brideName} & ${wedding.groomName}`,
      },
      {
        property: "og:description",
        content: "Add your photos and videos to our shared wedding album in a few taps.",
      },
    ],
  }),
  component: Share,
});

function Share() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <header className="text-center">
        <p className="eyebrow">Share memories</p>
        <h1 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
          Add your part of the day
        </h1>
        <span className="rule-gold mx-auto mt-7 w-28" />
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
          Three steps: choose your files, add your name if you'd like, then press share. It works
          from iPhone, Android, iPad, Windows and Mac.
        </p>
      </header>

      <div className="mt-12">
        <MemoryUploader />
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="quiet" size="lg">
          <Link to="/gallery">See everything shared so far</Link>
        </Button>
      </div>
    </div>
  );
}
