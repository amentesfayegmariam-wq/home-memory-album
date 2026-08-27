import { CheckCircle2, ImagePlus, Loader2, Play, Trash2, TriangleAlert, UploadCloud } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { memoryStore } from "@/lib/memories/local-store";

type Status = "ready" | "uploading" | "done" | "error";

interface Picked {
  id: string;
  file: File;
  previewUrl: string;
  isVideo: boolean;
  progress: number;
  status: Status;
  error?: string;
}

const ACCEPT = "image/*,video/*";
const MAX_MB = 500;

export function MemoryUploader() {
  const [picked, setPicked] = useState<Picked[]>([]);
  const [guestName, setGuestName] = useState("");
  const [caption, setCaption] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [finishedCount, setFinishedCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const pickedRef = useRef<Picked[]>([]);

  pickedRef.current = picked;
  useEffect(
    () => () => pickedRef.current.forEach((p) => URL.revokeObjectURL(p.previewUrl)),
    [],
  );

  const addFiles = useCallback((files: FileList | File[]) => {
    const next: Picked[] = [];
    for (const file of Array.from(files)) {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");
      const tooBig = file.size > MAX_MB * 1024 * 1024;
      next.push({
        id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        isVideo,
        progress: 0,
        status: !isVideo && !isImage ? "error" : tooBig ? "error" : "ready",
        error: !isVideo && !isImage
          ? "Only photos and videos can be shared."
          : tooBig
            ? `This file is larger than ${MAX_MB} MB.`
            : undefined,
      });
    }
    setFinishedCount(0);
    setPicked((prev) => [...prev, ...next]);
  }, []);

  const remove = (id: string) => {
    setPicked((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  const uploadAll = async () => {
    const queue = picked.filter((p) => p.status === "ready");
    if (!queue.length) return;
    setUploading(true);
    let done = 0;

    for (const item of queue) {
      const patch = (changes: Partial<Picked>) =>
        setPicked((prev) => prev.map((p) => (p.id === item.id ? { ...p, ...changes } : p)));
      patch({ status: "uploading", progress: 0 });
      try {
        await memoryStore.add({ file: item.file, guestName, caption }, (percent) =>
          patch({ progress: percent }),
        );
        patch({ status: "done", progress: 100 });
        done += 1;
      } catch (err) {
        patch({
          status: "error",
          error: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        });
      }
    }

    setUploading(false);
    setFinishedCount(done);
    if (done > 0) setCaption("");
  };

  const readyCount = picked.filter((p) => p.status === "ready").length;

  return (
    <div className="space-y-8">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
        }}
        className={`soft-card flex flex-col items-center px-6 py-10 text-center transition-colors sm:py-14 ${
          dragging ? "border-gold bg-gold-soft/25" : ""
        }`}
      >
        <span className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-soft/50 text-primary">
          <UploadCloud className="size-7" />
        </span>
        <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
          Add your photos &amp; videos
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Drag files here from your computer, or tap the button to pick them from your phone,
          tablet or camera roll. You can choose as many as you like.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = "";
          }}
        />

        <Button
          type="button"
          variant="gold"
          size="xl"
          className="mt-7 w-full sm:w-auto"
          onClick={() => inputRef.current?.click()}
        >
          <ImagePlus /> Choose Photos &amp; Videos
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          JPG, PNG, HEIC, WEBP, MP4, MOV and more · up to {MAX_MB} MB each · no account needed
        </p>
      </div>

      {/* Optional details */}
      <div className="soft-card space-y-5 p-6 sm:p-8">
        <div>
          <h3 className="font-serif text-xl text-foreground">A little about your memory</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Both fields are optional — skip them if you'd rather just upload.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="guestName" className="text-sm">
              Your name (optional)
            </Label>
            <Input
              id="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Aunt Tsehay"
              className="h-12 rounded-xl text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="caption" className="text-sm">
              Caption or message (optional)
            </Label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What was happening in this moment?"
              rows={2}
              className="rounded-xl text-base"
            />
          </div>
        </div>
      </div>

      {/* Selected files */}
      {picked.length > 0 && (
        <div className="soft-card p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-serif text-xl text-foreground">
              {picked.length} file{picked.length > 1 ? "s" : ""} selected
            </h3>
            {!uploading && readyCount > 0 && (
              <Button variant="quiet" size="sm" onClick={() => setPicked([])}>
                Clear all
              </Button>
            )}
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {picked.map((item) => (
              <li
                key={item.id}
                className="flex items-start gap-4 rounded-2xl border border-border bg-secondary/40 p-3"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                  {item.isVideo ? (
                    <>
                      <video src={item.previewUrl} muted className="h-full w-full object-cover" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Play className="size-6 fill-current text-primary-foreground drop-shadow" />
                      </span>
                    </>
                  ) : (
                    <img
                      src={item.previewUrl}
                      alt={item.file.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{item.file.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {(item.file.size / (1024 * 1024)).toFixed(1)} MB ·{" "}
                    {item.isVideo ? "Video" : "Photo"}
                  </p>

                  {item.status === "uploading" && (
                    <div className="mt-2">
                      <Progress value={item.progress} className="h-1.5" />
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Loader2 className="size-3 animate-spin" /> Uploading {item.progress}%
                      </p>
                    </div>
                  )}
                  {item.status === "done" && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-primary">
                      <CheckCircle2 className="size-3.5 text-gold" /> Added to the album
                    </p>
                  )}
                  {item.status === "error" && (
                    <p className="mt-2 flex items-start gap-1.5 text-xs text-destructive">
                      <TriangleAlert className="mt-0.5 size-3.5 shrink-0" /> {item.error}
                    </p>
                  )}
                </div>

                {item.status !== "uploading" && (
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.file.name}`}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>

          <Button
            variant="gold"
            size="xl"
            className="mt-8 w-full"
            disabled={uploading || readyCount === 0}
            onClick={uploadAll}
          >
            {uploading ? (
              <>
                <Loader2 className="animate-spin" /> Uploading…
              </>
            ) : (
              <>
                <UploadCloud /> Share {readyCount > 0 ? readyCount : ""} memor
                {readyCount === 1 ? "y" : "ies"}
              </>
            )}
          </Button>
        </div>
      )}

      {finishedCount > 0 && !uploading && (
        <div className="soft-card fade-up border-gold/40 bg-gold-soft/25 p-6 text-center sm:p-8">
          <CheckCircle2 className="mx-auto size-9 text-gold" />
          <h3 className="mt-4 font-serif text-2xl text-foreground">Thank you!</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            {finishedCount} memor{finishedCount === 1 ? "y is" : "ies are"} now part of our shared
            album. Visit the gallery to see everything together.
          </p>
        </div>
      )}
    </div>
  );
}
