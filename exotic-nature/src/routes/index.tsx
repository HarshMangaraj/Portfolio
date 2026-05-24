import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { Hero } from "@/components/Hero";
import { AnimalSection } from "@/components/AnimalSection";
import { Marquee } from "@/components/Marquee";
import { Preloader } from "@/components/Preloader";
// import whaleAsset from "../../public/videos/whale.mp4.asset.json";
// import eagleAsset from "../../public/videos/eagle.mp4.asset.json";
// import tigerAsset from "../../public/videos/tiger.mp4.asset.json";
// import horsesAsset from "../../public/videos/horses.mp4.asset.json";
// import foxAsset from "../../public/videos/fox.mp4.asset.json";
// import lionAsset from "../../public/videos/lion.mp4.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Exotic Nature — A visual journey through the wild" },
      {
        name: "description",
        content:
          "Exotic Nature is a cinematic single-page visual essay following the world's most magnificent wild animals across savannas, oceans, jungles and mountains.",
      },
      { property: "og:title", content: "Exotic Nature" },
      { property: "og:description", content: "A cinematic visual journey through the wild." },
    ],
  }),
});

const chapters = [
  {
    index: "01",
    title: "The Whale",
    subtitle: "Ocean · Pacific",
    location: "Open Sea",
    description:
      "An ancient mariner of the deep, the humpback rises through cobalt water carrying the songs of an older world.",
    videoUrl: "/videos/whale.mp4",
  },
  {
    index: "02",
    title: "The Eagle",
    subtitle: "Sky · Highlands",
    location: "Mountain Range",
    description:
      "Where clouds curl around granite peaks, the eagle writes silent geometry across the morning wind.",
    videoUrl: "/videos/eagle.mp4",
    reverse: true,
  },
  {
    index: "03",
    title: "The Tiger",
    subtitle: "Jungle · Bengal",
    location: "Deep Forest",
    description:
      "Soft thunder on damp leaves. The tiger moves like water through light, unhurried, unbothered, unmatched.",
    videoUrl: "/videos/tiger.mp4",
  },
  {
    index: "04",
    title: "Wild Horses",
    subtitle: "Plains · Camargue",
    location: "Shallow Waters",
    description:
      "Hooves and spray and gold. A herd reminds us what freedom looked like before we named it.",
    videoUrl: "/videos/horse.mp4",
    reverse: true,
  },
  {
    index: "05",
    title: "The Fox",
    subtitle: "Forest · Northern Pines",
    location: "Snowfall",
    description:
      "A small flame against the snow. The fox listens to a silence we have forgotten how to hear.",
    videoUrl: "/videos/fox.mp4",
  },
  {
    index: "06",
    title: "The Lion",
    subtitle: "Savanna · Serengeti",
    location: "Golden Hour",
    description:
      "When the sun lays low across the grass, the lion walks home, and the whole continent seems to lean in to watch.",
    videoUrl: "/videos/lion.mp4",
    reverse: true,
  },
];

const ALL_VIDEOS = [
  "/videos/lion.mp4",
  "/videos/whale.mp4",
  "/videos/eagle.mp4",
  "/videos/tiger.mp4",
  "/videos/horse.mp4",
  "/videos/fox.mp4",
];

function Index() {
  const [ready, setReady] = useState(false);
  useSmoothScroll();

  // Lock scroll while preloading
  useEffect(() => {
    if (ready) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [ready]);

  return (
    <main className="grain relative bg-background text-foreground overflow-x-hidden">
      {!ready && <Preloader videoUrls={ALL_VIDEOS} onComplete={() => setReady(true)} />}
      {ready && <Hero />}

      <section id="stories" className="relative py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
            (Manifesto)
          </p>
          <h2 className="font-display font-light text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-balance">
            Six chapters from a planet that does not need us — but tolerates our looking. <span className="italic text-accent">Watch closely.</span>
          </h2>
        </div>
      </section>

      {chapters.map((c) => (
        <AnimalSection key={c.index} {...c} />
      ))}

      <Marquee text="Exotic Nature — Wild Earth" />

      <footer id="contact" className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div>
            <h3 className="font-display italic text-5xl md:text-7xl font-light leading-none">
              Stay <span className="text-accent">wild.</span>
            </h3>
            <p className="mt-6 text-muted-foreground max-w-sm">
              A non-commercial visual study. No animals were disturbed. All footage is generated and imagined in tribute to the real ones.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.25em] text-muted-foreground">
            <a href="#" className="hover:text-accent transition">Instagram</a>
            <a href="#" className="hover:text-accent transition">Vimeo</a>
            <a href="#" className="hover:text-accent transition">Substack</a>
            <a href="mailto:hello@exoticnature.studio" className="hover:text-accent transition">Email</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-border flex justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span>© {new Date().getFullYear()} Exotic Nature</span>
          <span>Made with reverence</span>
        </div>
      </footer>
    </main>
  );
}
