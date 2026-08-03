import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bilal - Full Stack Developer Portfolio",
    short_name: "Bilal Portfolio",
    description:
      "Premium portfolio of Bilal, a Full Stack Developer specializing in modern web applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#2563EB",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
