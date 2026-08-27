import { sampleMemories } from "./sample-memories";
import type { Memory, MemoryStore, NewMemoryInput } from "./types";

/**
 * In-browser demo store. Keeps uploaded files as object URLs for the current
 * session and simulates upload progress, so the UI is complete before a real
 * backend (database + object storage) is connected.
 */
class LocalMemoryStore implements MemoryStore {
  private memories: Memory[] = [...sampleMemories];
  private listeners = new Set<() => void>();

  async list(): Promise<Memory[]> {
    return [...this.memories].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  async add(
    { file, guestName, caption }: NewMemoryInput,
    onProgress?: (percent: number) => void,
  ): Promise<Memory> {
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    if (!isVideo && !isImage) {
      throw new Error("That file type isn't supported. Please choose a photo or a video.");
    }

    const steps = 12;
    for (let i = 1; i <= steps; i++) {
      await new Promise((r) => setTimeout(r, 70));
      onProgress?.(Math.round((i / steps) * 100));
    }

    const memory: Memory = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      kind: isVideo ? "video" : "photo",
      url: URL.createObjectURL(file),
      guestName: guestName?.trim() || undefined,
      caption: caption?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    this.memories = [memory, ...this.memories];
    this.listeners.forEach((l) => l());
    return memory;
  }
}

export const memoryStore: MemoryStore = new LocalMemoryStore();
