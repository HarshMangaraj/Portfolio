import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Props {
  videoUrls: string[];
  onComplete: () => void;
}

export function Preloader({ videoUrls, onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Preload videos — track real progress
  useEffect(() => {
    let loaded = 0;
    const total = videoUrls.length;
    const target = { value: 0 };

    const tick = (val: number) => {
      gsap.to(target, {
        value: val,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => setProgress(Math.round(target.value)),
      });
    };

    const handleOne = () => {
      loaded += 1;
      tick(Math.min(99, Math.floor((loaded / total) * 100)));
    };

    const videos: HTMLVideoElement[] = videoUrls.map((url) => {
      const v = document.createElement("video");
      v.src = url;
      v.preload = "auto";
      v.muted = true;
      v.playsInline = true;
      const onReady = () => {
        v.removeEventListener("canplaythrough", onReady);
        v.removeEventListener("loadeddata", onReady);
        v.removeEventListener("error", onReady);
        handleOne();
      };
      v.addEventListener("canplaythrough", onReady);
      v.addEventListener("loadeddata", onReady);
      v.addEventListener("error", onReady);
      return v;
    });

    // Safety fallback — never hang the page
    const fallback = window.setTimeout(() => {
      while (loaded < total) handleOne();
    }, 9000);

    const finish = window.setTimeout(() => {
      tick(100);
      window.setTimeout(() => setDone(true), 900);
    }, 0);

    // When everything is loaded → go to 100
    const watcher = window.setInterval(() => {
      if (loaded >= total) {
        tick(100);
        window.setTimeout(() => setDone(true), 700);
        window.clearInterval(watcher);
      }
    }, 200);

    return () => {
      window.clearTimeout(fallback);
      window.clearTimeout(finish);
      window.clearInterval(watcher);
      videos.forEach((v) => (v.src = ""));
    };
  }, [videoUrls]);

  // Outro animation
  useEffect(() => {
    if (!done) return;
    const tl = gsap.timeline({ onComplete });
    tl.to(counterRef.current, { yPercent: -120, opacity: 0, duration: 0.7, ease: "expo.in" })
      .to(barRef.current, { scaleX: 1, duration: 0.6, ease: "expo.inOut" }, "<")
      .to(rootRef.current, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "+=0.1");
  }, [done, onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] bg-background flex flex-col justify-between p-6 md:p-12 will-change-transform"
    >
      <div className="flex justify-between items-start text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <span className="font-display italic text-xl normal-case tracking-normal text-foreground">
          Exotic Nature
        </span>
        <span>Loading the wild</span>
      </div>

      <div className="flex items-end justify-between gap-8">
        <div className="overflow-hidden">
          <span
            ref={counterRef}
            className="font-display italic font-light text-[22vw] md:text-[14vw] leading-none inline-block"
          >
            {String(progress).padStart(3, "0")}
          </span>
        </div>
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground pb-6">
          %
        </span>
      </div>

      <div className="w-full h-px bg-border relative overflow-hidden">
        <div
          ref={barRef}
          className="absolute inset-0 bg-accent origin-left"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  );
}
