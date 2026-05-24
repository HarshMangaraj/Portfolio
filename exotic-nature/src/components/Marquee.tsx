import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Marquee({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const items = Array.from({ length: 6 });
  return (
    <div className="overflow-hidden py-24 border-y border-border">
      <div ref={ref} className="flex whitespace-nowrap gap-16 font-display italic text-[12vw] leading-none font-light">
        {items.map((_, i) => (
          <span key={i} className="flex items-center gap-16">
            {text}
            <span className="text-accent">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
