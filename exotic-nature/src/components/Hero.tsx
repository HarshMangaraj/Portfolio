import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lionAsset from "../../public/videos/lion.mp4.asset.json";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial intro
      gsap.from(titleRef.current?.querySelectorAll(".word") || [], {
        yPercent: 120,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.1,
        delay: 0.3,
      });

      // Shrink hero video on scroll into card
      gsap.to(wrapRef.current, {
        scale: 0.82,
        borderRadius: "24px",
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        ref={wrapRef}
        className="absolute inset-0 w-full h-full will-change-transform overflow-hidden"
        style={{ transformOrigin: "center center" }}
      >
        <video
          ref={videoRef}
          src="/videos/lion.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-12">
        <nav className="flex justify-between items-center text-xs uppercase tracking-[0.3em]">
          <span className="font-display text-xl italic normal-case tracking-normal">Exotic Nature</span>
          <div className="hidden md:flex gap-10">
            {["Stories", "About", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="relative text-foreground/90 hover:text-accent transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-accent after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500"
              >
                {l}
              </a>
            ))}
          </div>
          <span className="hidden md:inline">{new Date().getFullYear()}</span>
        </nav>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/70 mb-6">
            A visual journey · est. wild
          </p>
          <h1
            ref={titleRef}
            className="font-display font-light text-[14vw] md:text-[12vw] leading-[0.85] tracking-tight"
          >
            <span className="block overflow-hidden">
              <span className="word inline-block">Exotic</span>
            </span>
            <span className="block overflow-hidden">
              <span className="word inline-block italic text-accent">Nature</span>
            </span>
          </h1>
        </div>

        <div className="flex justify-between items-end text-xs uppercase tracking-[0.3em] text-foreground/70">
          <span>Scroll to begin</span>
          <span className="hidden md:inline">06 chapters · wild · earth</span>
        </div>
      </div>
    </section>
  );
}
