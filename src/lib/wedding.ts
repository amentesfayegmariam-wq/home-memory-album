/** Single source of truth for wedding content. */
export const wedding = {
  brideName: "Mahlet",
  groomName: "Abel",
  dateLabel: "Saturday, 22 August 2026",
  shortDate: "22 . 08 . 2026",
  location: "The Gebremariam family home",
  address: "Bole Bulbula, Addis Ababa",
  welcome:
    "We opened our home, filled it with family, and said yes in the courtyard where we grew up. Every photo you add here becomes part of our shared album.",
  message:
    "Thank you for being in our house on the happiest day of our lives — for the singing, the coffee, the dancing, and for staying late. We couldn't be everywhere at once, so please share what you saw through your eyes.",
  schedule: [
    { time: "2:00 PM", title: "Guests arrive", detail: "Welcome drinks in the garden" },
    { time: "3:00 PM", title: "Blessing & vows", detail: "In the courtyard, with family" },
    { time: "4:30 PM", title: "Coffee ceremony", detail: "Jebena, incense and stories" },
    { time: "6:00 PM", title: "Dinner", detail: "One long table under the lights" },
    { time: "8:00 PM", title: "Music & dancing", detail: "Until the neighbours join in" },
  ],
} as const;
