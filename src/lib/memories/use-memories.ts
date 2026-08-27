import { useEffect, useState } from "react";

import { memoryStore } from "./local-store";
import type { Memory } from "./types";

export function useMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = () => {
      memoryStore.list().then((list) => {
        if (!active) return;
        setMemories(list);
        setLoading(false);
      });
    };
    load();
    const unsubscribe = memoryStore.subscribe(load);
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return { memories, loading };
}
