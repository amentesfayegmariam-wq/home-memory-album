import { Link, createFileRoute } from "@tanstack/react-router";
import { CalendarHeart, Clock, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { wedding } from "@/lib/wedding";
import couple from "@/assets/couple.jpg";

export const Route = createFileRoute("/our-day")({
  head: () => ({
    meta: [
      { title: `Our Day — ${wedding.brideName} & ${wedding.groomName}` },
      {
        name: "description",
        content:
          "The date, the family home, and the timeline of Mahlet & Abel's intimate home wedding, with a note from the family.",
      },
      { property: "og:title", content: `Our Day — ${wedding.brideName} & ${wedding.groomName}` },
      {
        property: "og:description",
        content: "Date, location and timeline of our intimate home wedding.",
      },
    ],
  }),
  component: OurDay,
});

function OurDay() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Our day</p>
        <h1 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
          A wedding at home
        </h1>
        <span className="rule-gold mx-auto mt-7 w-28" />
      </header>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div className="space-y-5">
          <div className="soft-card grid gap-5 p-7 sm:grid-cols-2">
            <div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/50 text-primary">
                <CalendarHeart className="size-5" />
              </span>
              <h2 className="mt-4 font-serif text-xl text-foreground">When</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {wedding.dateLabel}
                <br />
                From 2:00 PM until late
              </p>
            </div>
            <div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/50 text-primary">
                <Home className="size-5" />
              </span>
              <h2 className="mt-4 font-serif text-xl text-foreground">Where</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {wedding.location}
                <br />
                {wedding.address}
              </p>
            </div>
          </div>

          <div className="soft-card p-7">
            <div className="flex items-center gap-3">
              <Clock className="size-4 text-gold" />
              <h2 className="font-serif text-xl text-foreground">How the day unfolded</h2>
            </div>
            <ol className="mt-6 space-y-0">
              {wedding.schedule.map((item, i) => (
                <li
                  key={item.time}
                  className={`flex gap-5 py-4 ${i > 0 ? "border-t border-border" : ""}`}
                >
                  <span className="w-20 shrink-0 pt-0.5 text-xs tracking-widest text-gold uppercase">
                    {item.time}
                  </span>
                  <span>
                    <span className="block font-serif text-lg text-foreground">{item.title}</span>
                    <span className="block text-sm text-muted-foreground">{item.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="soft-card bg-secondary/50 p-7">
            <p className="eyebrow">A word from the family</p>
            <blockquote className="mt-4 font-serif text-xl leading-relaxed text-foreground">
              “{wedding.message}”
            </blockquote>
          </div>

          <Button asChild variant="gold" size="xl" className="w-full">
            <Link to="/share">Share your photos &amp; videos</Link>
          </Button>
        </div>

        <img
          src={couple}
          alt="The couple's hands, wearing their wedding rings"
          width={1200}
          height={1504}
          loading="lazy"
          className="w-full rounded-3xl border border-border object-cover shadow-[var(--shadow-lift)]"
        />
      </div>
    </div>
  );
}
