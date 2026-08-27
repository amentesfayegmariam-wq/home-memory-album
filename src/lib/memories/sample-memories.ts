import type { Memory } from "./types";

import couple from "@/assets/couple.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import hero from "@/assets/hero.jpg";

export const sampleMemories: Memory[] = [
  {
    id: "s1",
    kind: "photo",
    url: hero,
    guestName: "Selam T.",
    caption: "The blessing in the courtyard — everyone was crying happy tears.",
    createdAt: "2026-08-22T15:10:00Z",
    width: 1920,
    height: 1280,
  },
  {
    id: "s2",
    kind: "photo",
    url: couple,
    guestName: "Aunt Tsehay",
    caption: "Their hands, and those rings.",
    createdAt: "2026-08-22T15:40:00Z",
    width: 1200,
    height: 1504,
  },
  {
    id: "s3",
    kind: "photo",
    url: g1,
    guestName: "Dawit",
    caption: "Coffee ceremony in the living room.",
    createdAt: "2026-08-22T16:05:00Z",
    width: 1000,
    height: 1250,
  },
  {
    id: "s4",
    kind: "video",
    url: "https://cdn.coverr.co/videos/coverr-a-couple-dancing-at-their-wedding-7161/1080p.mp4",
    thumbnailUrl: g3,
    guestName: "Hana & Mikael",
    caption: "First dance under the string lights 🎶",
    createdAt: "2026-08-22T20:30:00Z",
    width: 1000,
    height: 1250,
  },
  {
    id: "s5",
    kind: "photo",
    url: g2,
    guestName: "Yonas",
    caption: "The long table before dinner.",
    createdAt: "2026-08-22T18:15:00Z",
    width: 1400,
    height: 933,
  },
  {
    id: "s6",
    kind: "photo",
    url: g4,
    caption: "Laughter that filled the whole house.",
    createdAt: "2026-08-22T19:00:00Z",
    width: 1200,
    height: 900,
  },
];
