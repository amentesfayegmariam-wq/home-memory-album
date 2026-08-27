import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookHeart, Camera, HeartHandshake } from "lucide-react";

import { MemoryGrid } from "@/components/gallery/memory-grid";
import { Button } from "@/components/ui/button";
import { useMemories } from "@/lib/memories/use-memories";
import { wedding } from "@/lib/wedding";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${wedding.brideName} & ${wedding.groomName} — Our Home Wedding Album` },
      {
        name: "description",
        content:
          "A shared photo and video album from Mahlet & Abel's intimate home wedding. Add your own memories from the day.",
      },
      {
        property: "og:title",
        content: `${wedding.brideName} & ${wedding.groomName} — Our Home Wedding Album`,
      },
      {
        property: "og:description",
        content: "Everyone's photos and videos from our wedding day, in one warm shared album.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { memories } = useMemories();
  const preview = memories.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={hero}
          alt="Mahlet and Abel surrounded by family in the courtyard of their family home"
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,oklch(0.99_0.01_88_/_0.82),oklch(0.98_0.02_84_/_0.72),oklch(0.98_0.01_84_/_0.95))]" />

        <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-24 text-center sm:py-32">
          <p className="eyebrow fade-up">Welcome to our home</p>
          <h1 className="fade-up mt-6 font-serif text-5xl leading-[1.05] text-foreground sm:text-7xl">
            {wedding.brideName}
            <span className="mx-3 text-gold">&amp;</span>
            {wedding.groomName}
          </h1>
          <span className="rule-gold fade-up mt-8 w-40" />
          <p className="fade-up mt-8 font-serif text-2xl text-foreground sm:text-3xl">
            {wedding.dateLabel}
          </p>
          <p className="eyebrow fade-up mt-3">{wedding.location}</p>

          <p className="fade-up mx-auto mt-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {wedding.welcome}
          </p>

          <div className="fade-up mt-11 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
              <Link to="/share">
                <Camera /> Share Your Photos &amp; Videos
              </Link>
            </Button>
            <Button asChild variant="quiet" size="xl" className="w-full sm:w-auto">
              <Link to="/gallery">View the album</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">One album, all of us</p>
          <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
            This website is our shared memory book
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            No photographer can be in every room of a house. Whatever you captured — a blurry
            dance, a quiet moment in the kitchen, the coffee ceremony — belongs here beside
            everyone else's.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: Camera,
              title: "Add in seconds",
              body: "Pick photos or videos from any phone, tablet or computer. No account, no sign-up.",
            },
            {
              icon: BookHeart,
              title: "Kept together",
              body: "Everything lands in one warm gallery you can browse any time, from anywhere.",
            },
            {
              icon: HeartHandshake,
              title: "Told by everyone",
              body: "Add your name or a short note so we know whose eyes we're seeing the day through.",
            },
          ].map((item) => (
            <div key={item.title} className="soft-card p-7 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/50 text-primary">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-serif text-xl text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery preview */}
      <section className="border-y border-border bg-secondary/40 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">From the day</p>
            <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
              Moments already shared
            </h2>
          </div>

          <MemoryGrid memories={preview} className="mt-12" />

          <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
              <Link to="/gallery">
                See the full gallery <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="quiet" size="lg" className="w-full sm:w-auto">
              <Link to="/share">Add yours</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Note from the family */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:py-24">
        <span className="rule-gold mx-auto w-24" />
        <blockquote className="mt-8 font-serif text-2xl leading-relaxed text-foreground sm:text-3xl">
          “{wedding.message}”
        </blockquote>
        <p className="eyebrow mt-8">
          {wedding.brideName} &amp; {wedding.groomName}
        </p>
      </section>
    </div>
  );
}
