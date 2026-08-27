import { wedding } from "@/lib/wedding";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-5 py-14 text-center">
        <span className="rule-gold mx-auto mb-8 w-24" />
        <p className="font-serif text-2xl text-foreground">
          {wedding.brideName} &amp; {wedding.groomName}
        </p>
        <p className="eyebrow mt-3">{wedding.shortDate}</p>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          {wedding.location} · {wedding.address}
        </p>
        <p className="mt-8 text-xs text-muted-foreground">
          Made with love for everyone who filled our home.
        </p>
      </div>
    </footer>
  );
}
