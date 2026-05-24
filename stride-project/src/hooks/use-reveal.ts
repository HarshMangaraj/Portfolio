import { useEffect } from "react";

/**
 * GSAP scroll-triggered reveal animations.
 * Targets:
 *  - [data-reveal]            → fade + rise
 *  - [data-reveal-stagger]    → stagger its direct children
 *  - [data-reveal-chars]      → split text into chars and rise
 *  - [data-parallax]          → small parallax y on scroll
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Char-by-char reveal for headlines
        document.querySelectorAll<HTMLElement>("[data-reveal-chars]").forEach((el) => {
          if (el.dataset.split === "1") return;
          const text = el.textContent ?? "";
          el.textContent = "";
          const frag = document.createDocumentFragment();
          for (const w of text.split(/(\s+)/)) {
            if (/\s+/.test(w)) {
              frag.appendChild(document.createTextNode(w));
            } else {
              const word = document.createElement("span");
              word.style.display = "inline-block";
              word.style.overflow = "hidden";
              word.style.verticalAlign = "bottom";
              for (const ch of Array.from(w)) {
                const span = document.createElement("span");
                span.textContent = ch;
                span.style.display = "inline-block";
                span.style.transform = "translateY(110%)";
                span.classList.add("_rc");
                word.appendChild(span);
              }
              frag.appendChild(word);
            }
          }
          el.appendChild(frag);
          el.dataset.split = "1";

          gsap.to(el.querySelectorAll("._rc"), {
            y: "0%",
            duration: 1,
            ease: "expo.out",
            stagger: 0.018,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        // Simple reveal
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            },
          );
        });

        // Stagger children
        gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((el) => {
          gsap.fromTo(
            el.children,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "expo.out",
              stagger: 0.08,
              scrollTrigger: { trigger: el, start: "top 85%" },
            },
          );
        });

        // Parallax
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax ?? "60");
          gsap.fromTo(
            el,
            { y: -amount },
            {
              y: amount,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);
}
