export type MemoryKind = "photo" | "video";

/** A single guest-contributed memory (photo or video). */
export interface Memory {
  id: string;
  kind: MemoryKind;
  /** Displayable media URL (remote URL, bundled asset, or object URL). */
  url: string;
  /** Poster image for videos; falls back to the media url for photos. */
  thumbnailUrl?: string | undefined;
  guestName?: string | undefined;
  caption?: string | undefined;
  createdAt: string;
  width?: number;
  height?: number;
}

export interface NewMemoryInput {
  file: File;
  guestName?: string | undefined;
  caption?: string | undefined;
}

/**
 * Storage boundary. Swap the local implementation for a real backend
 * (database + object storage) without touching any UI code.
 */
export interface MemoryStore {
  list(): Promise<Memory[]>;
  add(input: NewMemoryInput, onProgress?: (percent: number) => void): Promise<Memory>;
  subscribe(listener: () => void): () => void;
}
