import localFont from "next/font/local";

export const sequelSans = localFont({
  src: [
    {
      path: "../public/font/sequel-sans/sequel-sans-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/sequel-sans/sequel-sans-light-italic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/font/sequel-sans/sequel-sans-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/sequel-sans/sequel-sans-regular-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/font/sequel-sans/sequel-sans-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/sequel-sans/sequel-sans-medium-italic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/font/sequel-sans/sequel-sans-semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/font/sequel-sans/sequel-sans-semibold-italic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/font/sequel-sans/sequel-sans-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/sequel-sans/sequel-sans-bold-italic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sequel-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});
