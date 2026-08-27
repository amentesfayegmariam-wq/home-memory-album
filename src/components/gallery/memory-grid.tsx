import { Play } from "lucide-react";
import { useState } from "react";

import { MediaLightbox } from "./media-lightbox";
import type { Memory } from "@/lib/memories/types";
import { cn } from "@/lib/utils";

interface Props {
  memories: Memory[];
  className?: string;
}

/** Masonry gallery that keeps every photo at its natural aspect ratio. */
export function MemoryGrid({ memories, className }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className={cn("columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4", className)}>
        {memories.map((memory, i) => (
          <button
            type="button"
            key={memory.id}
            onClick={() => setOpenIndex(i)}
            className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-lift)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <img
              src={memory.kind === "video" ? (memory.thumbnailUrl ?? memory.url) : memory.url}
              alt={memory.caption ?? `Memory shared by ${memory.guestName ?? "a guest"}`}
              loading="lazy"
              decoding="async"
              className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {memory.kind === "video" && (
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(1_0_0_/_0.85)] shadow-[var(--shadow-soft)]">
                  <Play className="ml-0.5 size-6 fill-current text-primary" />
                </span>
              </span>
            )}

            {(memory.caption || memory.guestName) && (
              <span className="block bg-card px-4 py-3">
                {memory.caption && (
                  <span className="block font-serif text-lg leading-snug text-foreground">
                    {memory.caption}
                  </span>
                )}
                {memory.guestName && (
                  <span className="eyebrow mt-1 block text-[0.6rem]">{memory.guestName}</span>
                )}
              </span>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <MediaLightbox
          memories={memories}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
