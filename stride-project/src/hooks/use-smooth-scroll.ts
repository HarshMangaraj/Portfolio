import { useEffect } from "react";

/**
 * Initializes Locomotive Scroll v5 (native scroll, smooth) on the client.
 * Also wires GSAP ScrollTrigger to use window scroll so triggers fire correctly.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    let loco: { destroy: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const [{ default: LocomotiveScroll }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("locomotive-scroll"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      loco = new LocomotiveScroll({
        lenisOptions: {
          duration: 1.15,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        },
      } as unknown as ConstructorParameters<typeof LocomotiveScroll>[0]);

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      loco?.destroy();
    };
  }, []);
}
