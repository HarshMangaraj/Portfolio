import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import phoneHero from "../assets/phone-hero.jpg";
import earbuds from "../assets/earbuds.jpg";
import phoneDetail from "../assets/phone-detail.jpg";
import caseImg from "../assets/case.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOIR — Smartphones & Audio Engineered in the Dark" },
      { name: "description", content: "NOIR builds smartphones and wireless earphones for people who refuse the ordinary. Precision hardware, immersive sound." },
      { property: "og:title", content: "NOIR — Smartphones & Audio" },
      { property: "og:description", content: "Precision smartphones and wireless earphones, engineered in the dark." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased overflow-x-hidden">
      <Nav />
      <Hero />
      <BrandMark />
      <About />
      <Products />
      <Detail />
      <Specs />
      <Manifesto />
      <Contact />
      <Footer />
    </div>
  );
}

function Reveal({ children, delay = 0, y = 40, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 mix-blend-difference">
      <a href="#" className="font-black tracking-[0.3em] text-sm">NOIR<sup className="ml-1 text-[10px] opacity-60">10Y</sup></a>
      <nav className="hidden md:flex items-center gap-10 text-sm">
        <a href="#about" className="hover:opacity-60 transition">About</a>
        <a href="#products" className="hover:opacity-60 transition">Products</a>
        <a href="#specs" className="hover:opacity-60 transition">Tech</a>
        <a href="#manifesto" className="hover:opacity-60 transition">Manifesto</a>
        <a href="#contact" className="hover:opacity-60 transition">Contact</a>
      </nav>
      <div className="flex items-center gap-4 text-sm">
        <span className="font-bold">EN</span>
        <span className="opacity-50">ES</span>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-end pt-32 pb-0 overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={phoneHero} alt="NOIR flagship smartphone" width={1280} height={1600} className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
      </motion.div>
      <motion.div style={{ opacity }} className="relative px-6 md:px-12 pb-16 grid md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-6 md:col-start-7">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-xs tracking-[0.3em] opacity-60 mb-6">— FW.26 / FLAGSHIP DROP</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight">
            We build hardware for people who refuse the ordinary. Smartphones and audio, engineered in the dark.
          </motion.h1>
        </div>
      </motion.div>
      <div className="relative overflow-hidden border-t border-white/10">
        <div className="marquee flex whitespace-nowrap py-4 text-sm tracking-[0.3em] opacity-70">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="px-8">NOIR ZERO · TITANIUM FRAME · 6.7" AMOLED · ANC AUDIO · BUILT TO LAST ·</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandMark() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-25%"]);
  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <motion.h2 style={{ x }} className="whitespace-nowrap text-[28vw] leading-[0.85] font-black tracking-tighter px-6">
        NOIR · NOIR
      </motion.h2>
      <div className="px-6 md:px-12 mt-12 grid md:grid-cols-12 gap-10">
        <Reveal className="md:col-span-5 md:col-start-8">
          <p className="text-xs tracking-[0.3em] opacity-60 mb-4">— EST. 2016</p>
          <p className="text-lg md:text-xl leading-snug">
            A decade of building devices that disappear into your hand and reappear in your habits. Phones, earphones, and the silence in between.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-6 md:px-12 py-32 border-t border-white/10">
      <Reveal><p className="text-xs tracking-[0.3em] opacity-60 mb-10">— ABOUT</p></Reveal>
      <div className="grid md:grid-cols-12 gap-10">
        <Reveal className="md:col-span-7">
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight">
            Tools, not toys. <span className="opacity-50">Designed for the people who actually use them.</span>
          </h3>
        </Reveal>
        <div className="md:col-span-4 md:col-start-9 grid grid-cols-2 gap-8 self-end">
          {[
            { n: "10+", l: "years building hardware" },
            { n: "48", l: "engineers in-house" },
            { n: "62", l: "countries shipped" },
            { n: "1.2M", l: "devices in the wild" },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}><Stat n={s.n} l={s.l} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-4xl md:text-5xl font-medium">{n}</div>
      <div className="text-xs opacity-60 mt-2 tracking-wide">{l}</div>
    </div>
  );
}

const products = [
  { id: "01", name: "NOIR Zero", tag: "Flagship Smartphone", line: "6.7\" LTPO AMOLED · Titanium · 4nm SoC", img: phoneHero },
  { id: "02", name: "NOIR Buds Pro", tag: "Wireless Earphones", line: "Hybrid ANC · 12mm driver · 32h battery", img: earbuds },
  { id: "03", name: "NOIR Buds Lite", tag: "Daily Earphones", line: "IP55 · Low-latency · USB-C charging case", img: caseImg },
  { id: "04", name: "NOIR Edge", tag: "Compact Smartphone", line: "6.1\" OLED · Aluminum · Two-day battery", img: phoneDetail },
];

function Products() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section ref={ref} id="products" className="px-6 md:px-12 py-32 border-t border-white/10">
      <div className="flex items-end justify-between mb-16">
        <Reveal>
          <p className="text-xs tracking-[0.3em] opacity-60 mb-4">— THE LINEUP</p>
          <h3 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] max-w-2xl">
            Four devices. <span className="opacity-50">Zero compromises.</span>
          </h3>
        </Reveal>
      </div>
      <div className="divide-y divide-white/10 border-y border-white/10">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08} y={30}>
            <a href="#" className="group grid md:grid-cols-12 gap-6 py-10 items-center hover:bg-white/5 transition px-2">
              <div className="md:col-span-1 text-sm opacity-50">{p.id}</div>
              <div className="md:col-span-3">
                <div className="text-2xl md:text-3xl font-medium">{p.name}</div>
                <div className="text-xs opacity-50 mt-1 tracking-wider uppercase">{p.tag}</div>
              </div>
              <div className="md:col-span-4 text-sm opacity-70">{p.line}</div>
              <div className="md:col-span-3 aspect-[4/3] overflow-hidden bg-neutral-950 rounded-sm">
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-1000 ease-out" />
              </div>
              <div className="md:col-span-1 text-right text-sm opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition">→</div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Detail() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
  return (
    <section ref={ref} className="relative h-[80vh] my-32 overflow-hidden">
      <motion.img style={{ y, scale }} src={phoneDetail} alt="Edge detail" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-end p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
        <Reveal className="grid md:grid-cols-12 gap-8 w-full">
          <p className="md:col-span-5 text-2xl md:text-3xl font-medium leading-snug">
            Cold-forged titanium. CNC-machined to a tolerance of 0.02mm. No plastic where metal belongs.
          </p>
          <div className="md:col-span-3 md:col-start-10 text-xs tracking-[0.3em] opacity-60 self-end">— BUILD QUALITY / 01</div>
        </Reveal>
      </div>
    </section>
  );
}

function Specs() {
  const rows = [
    ["Display", "6.7\" LTPO AMOLED · 120Hz · 2500 nits peak"],
    ["Chipset", "NOIR N1 · 4nm · 8-core"],
    ["Camera", "50MP main · 48MP ultrawide · 12MP 5× tele"],
    ["Battery", "5,000 mAh · 80W wired · 50W wireless"],
    ["Frame", "Grade-5 titanium · Sapphire crystal"],
    ["Audio", "Spatial 360 · Hi-Res certified"],
  ];
  return (
    <section id="specs" className="px-6 md:px-12 py-32 border-t border-white/10">
      <div className="grid md:grid-cols-12 gap-10">
        <Reveal className="md:col-span-5">
          <p className="text-xs tracking-[0.3em] opacity-60 mb-6">— NOIR ZERO / SPEC</p>
          <h3 className="text-4xl md:text-5xl font-medium leading-tight tracking-tight">
            Engineered down to the last micron.
          </h3>
        </Reveal>
        <dl className="md:col-span-6 md:col-start-7 divide-y divide-white/10 border-y border-white/10">
          {rows.map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.06} y={20}>
              <div className="py-5 grid grid-cols-3 gap-4">
                <dt className="text-xs uppercase tracking-widest opacity-50">{k}</dt>
                <dd className="col-span-2 text-base md:text-lg">{v}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="px-6 md:px-12 py-40 border-t border-white/10">
      <Reveal><p className="text-xs tracking-[0.3em] opacity-60 mb-10">— MANIFESTO</p></Reveal>
      <Reveal delay={0.15} y={60}>
        <p className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight max-w-6xl">
          We don&apos;t chase specs. We chase the feeling of a device that respects your attention. Slower release cycles. Longer support. Better materials. <span className="opacity-50">Hardware is not disposable.</span>
        </p>
      </Reveal>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 md:px-12 py-32 border-t border-white/10">
      <div className="grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-7">
          <p className="text-xs tracking-[0.3em] opacity-60 mb-6">— GET IN TOUCH</p>
          <h3 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1]">
            Press, retail,<br/>or just to say hello.
          </h3>
        </div>
        <div className="md:col-span-4 md:col-start-9 space-y-6 text-sm">
          <div>
            <div className="opacity-50 text-xs tracking-widest uppercase mb-2">Studio</div>
            <div>Calle Industria 112<br />08025 Barcelona, ES</div>
          </div>
          <div>
            <div className="opacity-50 text-xs tracking-widest uppercase mb-2">Mail</div>
            <a href="mailto:hello@noir.dev" className="border-b border-white/30">hello@noir.dev</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10 border-t border-white/10 text-xs flex flex-wrap gap-6 items-center justify-between opacity-70">
      <div>© 2026 NOIR Devices. All rights reserved.</div>
      <div className="flex gap-6">
        <a href="#">Instagram</a>
        <a href="#">YouTube</a>
        <a href="#">Press kit</a>
        <a href="#">Privacy</a>
      </div>
    </footer>
  );
}
