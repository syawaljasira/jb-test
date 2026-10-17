import localFont from "next/font/local";

export const PPAgrandir = localFont({
  src: [
    {
      path: "./PPAgrandir-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./PPAgrandir-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-pp-agrandir",
  display: "swap",
  preload: true,
});

export const Bagoss = localFont({
  src: "./BagossTRIALVF.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-bagoss",
  display: "swap",
});

export const Sohne = localFont({
  src: "./Sohne-Buch.otf",
  weight: "400",
  style: "normal",
  variable: "--font-sohne",
  display: "swap",
});
