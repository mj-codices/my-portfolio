// src/app/data/contact.ts

export const CONTACT_DATA = {
  // Shown in the footer beside the live clock. Update both when moving or
  // traveling — `timeZone` is an IANA zone name, used to show visitors my local time.
  location: {
    label: "Riverside, CA",
    timeZone: "America/Los_Angeles",
  },
  email: {
    address: "mjwhite.dev@gmail.com",
    label: "mjwhite.dev@gmail.com",
  },
  socials: [
    {
      id: "instagram",
      label: "Instagram",
      url: "https://instagram.com/casa_junbubby",
    },
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/mj-codices",
    },
  ],
} as const;