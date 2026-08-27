import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";

import type { Memory } from "@/lib/memories/types";

interface Props {
  memories: Memory[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function MediaLightbox({ memories, index, onClose, onNavigate }: Props) {
  const memory = memories[index];

  const prev = useCallback(
    () => onNavigate((index - 1 + memories.length) % memories.length),
    [index, memories.length, onNavigate],
  );
  const next = useCallback(
    () => onNavigate((index + 1) % memories.length),
    [index, memories.length, onNavigate],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  if (!memory) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Memory viewer"
      className="fixed inset-0 z-50 flex flex-col bg-[oklch(0.21_0.02_50_/_0.94)] p-3 sm:p-6"
    >
      <div className="flex items-center justify-between text-primary-foreground">
        <span className="text-xs tracking-widest uppercase opacity-80">
          {index + 1} / {memories.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(1_0_0_/_0.12)] transition hover:bg-[oklch(1_0_0_/_0.2)]"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden py-3">
        {memories.length > 1 && (
          <button
            type="button"
            onClick={prev}
            aria-label="Previous memory"
            className="absolute left-0 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(1_0_0_/_0.12)] text-primary-foreground transition hover:bg-[oklch(1_0_0_/_0.2)]"
          >
            <ChevronLeft className="size-6" />
          </button>
        )}

        {memory.kind === "video" ? (
          <video
            key={memory.id}
            src={memory.url}
            poster={memory.thumbnailUrl}
            controls
            autoPlay
            playsInline
            className="max-h-full max-w-full rounded-2xl"
          />
        ) : (
          <img
            key={memory.id}
            src={memory.url}
            alt={memory.caption ?? "Wedding memory"}
            className="max-h-full max-w-full rounded-2xl object-contain"
          />
        )}

        {memories.length > 1 && (
          <button
            type="button"
            onClick={next}
            aria-label="Next memory"
            className="absolute right-0 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(1_0_0_/_0.12)] text-primary-foreground transition hover:bg-[oklch(1_0_0_/_0.2)]"
          >
            <ChevronRight className="size-6" />
          </button>
        )}
      </div>

      {(memory.caption || memory.guestName) && (
        <div className="mx-auto max-w-2xl pb-2 text-center text-primary-foreground">
          {memory.caption && <p className="font-serif text-xl">{memory.caption}</p>}
          {memory.guestName && (
            <p className="mt-2 text-xs tracking-widest uppercase opacity-70">
              shared by {memory.guestName}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
