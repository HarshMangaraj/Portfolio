import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  index: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  videoUrl: string;
  reverse?: boolean;
}

export function AnimalSection({ index, title, subtitle, location, description, videoUrl, reverse }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale the video wrap as it scrolls
      gsap.fromTo(
        videoWrapRef.current,
        { scale: 0.72, borderRadius: "32px" },
        {
          scale: 1,
          borderRadius: "8px",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1.2,
          },
        },
      );

      // Parallax on inner video
      gsap.fromTo(
        videoRef.current,
        { yPercent: -12, scale: 1.15 },
        {
          yPercent: 12,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // Title reveal
      const split = titleRef.current?.querySelectorAll<HTMLElement>(".word");
      if (split) {
        gsap.fromTo(
          split,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          },
        );
      }

      // Play/pause when in view
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 90%",
        end: "bottom 10%",
        onEnter: () => videoRef.current?.play().catch(() => {}),
        onEnterBack: () => videoRef.current?.play().catch(() => {}),
        onLeave: () => videoRef.current?.pause(),
        onLeaveBack: () => videoRef.current?.pause(),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[140vh] py-32 px-6 md:px-12 flex flex-col items-center"
    >
      <div
        className={`w-full max-w-7xl flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-end justify-between gap-10 mb-12`}
      >
        <div className="flex items-baseline gap-6">
          <span className="text-sm tracking-[0.3em] text-muted-foreground font-mono">
            {index}
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">
              {location}
            </p>
            <h2
              ref={titleRef}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tight overflow-hidden"
            >
              {title.split(" ").map((w, i) => (
                <span key={i} className="inline-block overflow-hidden mr-4">
                  <span className="word inline-block italic">{w}</span>
                </span>
              ))}
            </h2>
          </div>
        </div>
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <div
        ref={videoWrapRef}
        className="relative w-full max-w-7xl aspect-[16/9] overflow-hidden bg-muted will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-xs uppercase tracking-[0.25em] text-foreground/80">
          <span>{location}</span>
          <span>{index} / 06</span>
        </div>
      </div>

      <p className="mt-12 max-w-xl text-lg text-muted-foreground leading-relaxed font-display italic">
        {description}
      </p>
    </section>
  );
}
