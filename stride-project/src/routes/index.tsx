import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useReveal } from "@/hooks/use-reveal";

import heroRunner from "@/assets/hero-runner.jpg";
import shoe1 from "@/assets/shoe-1.jpg";
import shoe2 from "@/assets/shoe-2.jpg";
import shoe3 from "@/assets/shoe-3.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const BRAND = "Strider & Sole";

function Logo() {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
      <span className="font-display text-xl tracking-[0.2em]">{BRAND.toUpperCase()}</span>
    </span>
  );
}

function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-bone/70 border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="text-ink"><Logo /></a>
        <nav className="hidden md:flex items-center gap-10 font-mono-label text-ink/65">
          <a href="#collection" className="link-underline hover:text-ink transition">Collection</a>
          <a href="#technology" className="link-underline hover:text-ink transition">Technology</a>
          <a href="#athletes" className="link-underline hover:text-ink transition">Athletes</a>
          <a href="#journal" className="link-underline hover:text-ink transition">Journal</a>
        </nav>
        <a href="#collection" className="hidden sm:inline-flex items-center font-mono-label text-ink link-underline">
          Shop →
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 px-6 lg:px-10">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="font-mono-label text-ink/45 mb-10" data-reveal>
          (01) SS26 — Performance Drop 04
        </div>

        <h1 className="font-display text-[16vw] sm:text-[14vw] lg:text-[12vw] leading-[0.86] tracking-tight text-ink">
          <span className="block" data-reveal-chars>Built for the</span>
          <span className="block italic text-ink/85" data-reveal-chars>long run.</span>
        </h1>
      </div>

      <div className="mx-auto w-full max-w-[1400px] mt-16 grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-end">
        <div className="space-y-8" data-reveal>
          <p className="text-ink/65 max-w-sm text-base leading-relaxed">
            {BRAND} engineers minimalist performance footwear — designed in studio, tested on the street, refined on the track.
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <a href="#collection" className="inline-flex items-center font-mono-label bg-ink text-bone px-6 py-3.5 hover:bg-charcoal transition">
              Shop the Collection
            </a>
            <a href="#technology" className="font-mono-label text-ink/70 link-underline">
              See the Technology →
            </a>
          </div>
        </div>

        <figure className="relative overflow-hidden aspect-[16/10] lg:aspect-[16/9]">
          <img
            src={heroRunner}
            alt="Runner mid-stride wearing minimalist white performance running shoes on warm concrete"
            className="absolute inset-0 h-full w-full object-cover"
            data-parallax="40"
            width={1920}
            height={1080}
          />
        </figure>
      </div>

      <div className="mx-auto w-full max-w-[1400px] mt-12 flex items-center justify-between">
        <span className="font-mono-label text-ink/40">Scroll ↓</span>
        <span className="font-mono-label text-ink/40">est. 2026 — Portland, OR</span>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Velocity 01 — out now", "Free shipping over $100", "30-day return", "Carbon neutral shipping", "Engineered in Portland"];
  const loop = [...items, ...items, ...items];
  return (
    <div className="bg-ink text-bone overflow-hidden py-7">
      <div className="marquee">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center font-display text-3xl lg:text-5xl tracking-wider whitespace-nowrap">
            <span className="px-10">{t}</span>
            <span className="text-bone/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Collection() {
  const shoes = [
    { no: "01", tag: "Road Running", name: "Velocity 01", price: "$184", copy: "Carbon-plated racer for marathon pace.", img: shoe1, alt: "Minimalist white running shoe floating on warm cream background" },
    { no: "02", tag: "Daily Trainer", name: "Cadence Pro", price: "$148", copy: "All-day cushioning for every mile.", img: shoe2, alt: "Charcoal grey knit sneaker on beige stone background" },
    { no: "03", tag: "Lifestyle", name: "Drift Knit", price: "$112", copy: "Studio-to-street knit on a performance sole.", img: shoe3, alt: "Matte black low-top running shoe on warm taupe background" },
  ];
  return (
    <section id="collection" className="py-32 lg:py-48 px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-24 items-end mb-24">
          <div className="font-mono-label text-ink/45" data-reveal>(02) The Collection</div>
          <h2 className="font-display text-5xl lg:text-8xl leading-[0.9] text-ink" data-reveal-chars>
            Three shoes. One standard.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10" data-reveal-stagger>
          {shoes.map((s) => (
            <article key={s.no} className="flex flex-col group">
              <figure className="relative overflow-hidden aspect-[3/4] bg-sand mb-6">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  width={1080}
                  height={1440}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute top-4 left-4 right-4 flex items-baseline justify-between font-mono-label text-ink/60 mix-blend-multiply">
                  <span>{s.tag}</span>
                  <span>{s.no}</span>
                </div>
              </figure>

              <div className="hairline mb-5" />
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-display text-2xl lg:text-3xl tracking-wider text-ink">{s.name}</h3>
                <span className="font-display text-xl lg:text-2xl text-ink/55">{s.price}</span>
              </div>
              <p className="text-ink/60 text-sm leading-relaxed mb-8">{s.copy}</p>
              <a href="#contact" className="mt-auto font-mono-label text-ink link-underline self-start">Add to Bag →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Technology() {
  const features = [
    { n: "01", t: "Knit Upper", c: "Single-piece, seamless, breathable." },
    { n: "02", t: "PEBA Foam", c: "High energy return, every stride." },
    { n: "03", t: "Carbon Plate", c: "Snap-forward toe-off, race-ready." },
    { n: "04", t: "Rubber Sole", c: "Abrasion-resistant grip pattern." },
  ];
  return (
    <section id="technology" className="bg-ink text-bone py-32 lg:py-48 px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <div className="font-mono-label text-bone/45 mb-8" data-reveal>(03) Technology</div>
            <h2 className="font-display text-5xl lg:text-8xl leading-[0.9] mb-10" data-reveal-chars>
              Every layer engineered.
            </h2>
            <p className="text-bone/65 leading-relaxed max-w-sm mb-10" data-reveal>
              From woven knit to carbon plate — designed to make your next mile easier than the last.
            </p>
            <figure className="relative overflow-hidden aspect-[4/5] max-w-sm" data-reveal>
              <img
                src={shoe2}
                alt="Detail of charcoal grey knit sneaker"
                loading="lazy"
                width={1080}
                height={1440}
                className="absolute inset-0 h-full w-full object-cover grayscale"
              />
            </figure>
          </div>

          <div className="space-y-0 divide-y divide-bone/10" data-reveal-stagger>
            {features.map((f) => (
              <div key={f.n} className="py-10 lg:py-14 grid grid-cols-[auto_1fr_2fr] gap-8 lg:gap-16 items-baseline group">
                <span className="font-mono-label text-bone/40">{f.n}</span>
                <h3 className="font-display text-3xl lg:text-5xl tracking-wider group-hover:text-bone transition-colors duration-500">{f.t}</h3>
                <p className="text-sm lg:text-base text-bone/60 leading-relaxed">{f.c}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Athletes() {
  const stats = [
    { n: "2:14", l: "Marathon PB in Velocity 01" },
    { n: "92%", l: "Reorder within 6 months" },
    { n: "4.9", l: "Across 8,400 reviews" },
    { n: "47", l: "Countries shipping next-day" },
  ];
  return (
    <section id="athletes" className="py-32 lg:py-48 px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="font-mono-label text-ink/45 mb-12" data-reveal>(04) Athletes</div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-20 mb-32 items-end">
          <figure>
            <blockquote className="font-display text-4xl lg:text-7xl leading-[1.02] tracking-wide text-ink" data-reveal-chars>
              "I ran my fastest marathon in the Velocity 01. At kilometer 35 my legs still felt like they had something left."
            </blockquote>
            <figcaption className="mt-10 font-mono-label text-ink/50" data-reveal>
              Mara Okafor — Elite Marathoner — 2:24 PB
            </figcaption>
          </figure>
          <figure className="relative overflow-hidden aspect-[3/4] bg-sand" data-reveal>
            <img
              src={shoe1}
              alt="White Velocity 01 running shoe"
              loading="lazy"
              width={1080}
              height={1440}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </figure>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14" data-reveal-stagger>
          {stats.map((s) => (
            <div key={s.n} className="bg-bone">
              <div className="font-display text-5xl lg:text-7xl text-ink mb-4">{s.n}</div>
              <div className="font-mono-label text-ink/55 leading-snug">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journal() {
  const posts = [
    { no: "01", tag: "Field Notes", title: "Inside the lab where Velocity 01 was born", meta: "Portland — 8 min" },
    { no: "02", tag: "Training", title: "Why easy days matter more than long runs", meta: "Coach Notes — 6 min" },
    { no: "03", tag: "Materials", title: "The case for PEBA foam, without the jargon", meta: "Engineering — 5 min" },
  ];
  return (
    <section id="journal" className="bg-sand text-ink py-32 lg:py-48 px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-end mb-24">
          <div className="font-mono-label text-ink/45" data-reveal>(05) Journal</div>
          <h2 className="font-display text-5xl lg:text-8xl leading-[0.9]" data-reveal-chars>
            Stories from the studio &amp; the road.
          </h2>
        </div>

        <div className="divide-y divide-ink/15" data-reveal-stagger>
          {posts.map((p) => (
            <a key={p.no} href="#" className="py-10 lg:py-14 grid grid-cols-[auto_1fr_auto] gap-8 lg:gap-16 items-baseline group transition">
              <span className="font-mono-label text-ink/45">{p.no}</span>
              <h3 className="font-display text-2xl lg:text-4xl tracking-wider group-hover:translate-x-2 transition-transform duration-500">{p.title}</h3>
              <span className="font-mono-label text-ink/50 hidden md:inline">{p.meta} →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/harshmangaraj723@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email,
          _subject: `New Strider & Sole subscriber: ${email}`,
          message: `New newsletter signup from ${email}`,
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
    }
  }

  return (
    <section id="contact" className="py-32 lg:py-48 px-6 lg:px-10">
      <div className="mx-auto max-w-[1100px] text-center">
        <div className="font-mono-label text-ink/45 mb-10" data-reveal>(06) The Drop List</div>
        <h2 className="font-display text-5xl lg:text-8xl leading-[0.9] mb-12 text-ink" data-reveal-chars>
          Early access. Every drop.
        </h2>
        <form className="flex flex-col sm:flex-row max-w-xl mx-auto gap-3" data-reveal onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "sending"}
            className="flex-1 bg-transparent border-b border-ink/20 px-2 py-3 focus:border-ink outline-none transition text-ink placeholder:text-ink/30 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="font-mono-label text-ink link-underline px-2 py-3 text-left disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Notify Me →"}
          </button>
        </form>
        <p className="mt-8 font-mono-label text-ink/40 min-h-[1.2em]">
          {status === "ok" && "Thanks — you're on the list."}
          {status === "err" && "Something went wrong. Please try again."}
          {status === "idle" && "Unsubscribe anytime."}
          {status === "sending" && "Sending…"}
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-bone py-16 px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px] grid md:grid-cols-3 gap-10 items-start">
        <span className="inline-flex items-center gap-3">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-bone" />
          <span className="font-display text-xl tracking-[0.2em]">{BRAND.toUpperCase()}</span>
        </span>
        <div className="font-mono-label text-bone/60 space-y-2">
          <div>hello@striderandsole.com</div>
          <div>Portland, OR — Mon–Fri 9–5 PT</div>
        </div>
        <div className="font-mono-label text-bone/45 md:text-right">
          © 2026 {BRAND} — Performance Footwear
        </div>
      </div>
    </footer>
  );
}

function Index() {
  useSmoothScroll();
  useReveal();
  return (
    <main className="bg-bone text-ink overflow-clip">
      <Header />
      <Hero />
      <Marquee />
      <Collection />
      <Technology />
      <Athletes />
      <Journal />
      <Newsletter />
      <Footer />
    </main>
  );
}
