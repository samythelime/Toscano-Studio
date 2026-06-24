'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import ContactForm from './components/ContactForm';
import CustomCursor from './components/CustomCursor';

const cases = [
  {
    name: 'Conquer Plumbing',
    description: 'Plumbing company, Santa Monica',
    href: 'https://conquer-plumbing.vercel.app',
    image: '/conquer-plumbing.png',
    objectPosition: 'left center',
  },
  {
    name: 'Joyful Music & Arts',
    description: 'Music school, South Bay',
    href: 'https://joma-website-1.vercel.app',
    image: '/joyful-music.png',
    objectPosition: 'center bottom',
  },
];

const steps = [
  {
    n: '01',
    title: 'Your vision, visualized free',
    body: 'Before a single dollar changes hands, you\'ll see exactly what your new site looks like. A gift, not a gimmick.',
  },
  {
    n: '02',
    title: 'Refined until it\'s right',
    body: 'Your input shapes everything. We move together until it feels exactly like you.',
  },
  {
    n: '03',
    title: 'Live within the week',
    body: 'Seven days from approval to launch. Built to rank, built to convert, built to last.',
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function FadeSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

const heroWords = ['Your', 'business', 'deserves', 'to', 'be'];
const heroAccent = 'found.';

function CountUp({ to, prefix = '' }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = prefix + Math.round(v).toLocaleString();
      },
    });
    return () => ctrl.stop();
  }, [inView, to, prefix]);
  return <span ref={ref}>{prefix}0</span>;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {mounted && <CustomCursor />}

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-16 py-5 bg-[#0a1628]/90 backdrop-blur-md border-b border-[rgba(0,201,177,0.08)]">
        <span className="font-display text-[#F0FFFC] font-semibold text-xl tracking-wide italic">
          Toscano Studio
        </span>
        <a
          href="#contact"
          className="bg-[#00C9B1] text-white font-semibold text-sm px-5 py-2.5 hover:bg-[#4ECDC4] transition-colors"
        >
          Get your free mockup
        </a>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="min-h-screen flex flex-col px-6 md:px-10 lg:px-16 pt-32 pb-16"
      >
        {/* Index row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-5">
            <span className="text-[#00C9B1] text-[10px] font-semibold uppercase tracking-[0.28em]">
              Web Design
            </span>
            <span className="w-10 h-px bg-[rgba(0,201,177,0.2)]" />
            <span className="text-[#F0FFFC]/30 text-[10px] uppercase tracking-[0.28em]">
              Los Angeles
            </span>
          </div>
          <span className="text-[#F0FFFC]/20 text-[10px] uppercase tracking-[0.28em]">001</span>
        </motion.div>

        {/* Headline — word by word */}
        <div className="flex-1 flex flex-col justify-center py-16">
          <h1 className="font-display text-[clamp(56px,10vw,140px)] font-light italic leading-[0.88] text-[#F0FFFC]">
            {heroWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease: EASE }}
                className="inline-block mr-[0.25em]"
              >
                {word}
                {word === 'be' && <br />}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + heroWords.length * 0.12, duration: 0.7, ease: EASE }}
              className="inline-block text-[#00C9B1]"
            >
              {heroAccent}
            </motion.span>
          </h1>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="border-t border-[rgba(0,201,177,0.08)] pt-8 flex flex-col md:flex-row md:items-end gap-8 justify-between"
        >
          <p className="text-[#6a9e9a] text-sm max-w-xs leading-relaxed">
            I craft websites for contractors and local businesses that command attention, build trust, and turn visitors into calls.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-[#00C9B1] text-white font-bold px-7 py-3.5 text-xs uppercase tracking-[0.12em] hover:bg-[#4ECDC4] transition-colors shrink-0"
          >
            Get your free mockup
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </section>

      {/* ── CINEMATIC SWEEP ─────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: 120 }}>
        {/* base bg fill so there's no gap */}
        <div className="absolute inset-0 bg-[#0a1628]" />
        {/* sweeping warm band */}
        <motion.div
          initial={{ x: '-100%' }}
          whileInView={{ x: '100%' }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] as const }}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, transparent 0%, rgba(0,201,177,0.12) 30%, rgba(78,205,196,0.2) 50%, rgba(0,201,177,0.12) 70%, transparent 100%)',
            skewX: '-8deg',
          }}
        />
        {/* bottom fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 40,
            background: 'linear-gradient(to bottom, transparent, #0d1f35)',
          }}
        />
        {/* subtle SVG curved wipe line */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d="M-100 60 Q360 10 720 60 Q1080 110 1540 60"
            fill="none"
            stroke="rgba(0,201,177,0.35)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] as const, delay: 0.15 }}
          />
          <motion.path
            d="M-100 75 Q360 25 720 72 Q1080 118 1540 72"
            fill="none"
            stroke="rgba(78,205,196,0.15)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] as const, delay: 0.25 }}
          />
        </svg>
      </div>

      {/* ── WORK ────────────────────────────────────────────────────── */}
      <section
        id="work"
        className="px-6 md:px-10 lg:px-16 py-24"
      >
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <FadeItem>
              <p className="text-[#00C9B1] text-xs font-semibold uppercase tracking-[0.22em] mb-4">
                Work
              </p>
            </FadeItem>
            <FadeItem>
              <h2 className="font-display text-5xl md:text-6xl font-light italic text-[#F0FFFC] tracking-tight mb-16">
                Crafted with intention.
              </h2>
            </FadeItem>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cases.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 50, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              >
                <div className="aspect-[4/3] bg-[#0d1f35] border border-[rgba(0,201,177,0.08)] mb-5 relative overflow-hidden group">
                  {c.image && (
                    <Image
                      src={c.image}
                      alt={`${c.name} website screenshot`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: c.objectPosition }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[#F0FFFC] font-semibold text-base leading-snug">{c.name}</h3>
                    <p className="text-[#6a9e9a] text-sm mt-1">{c.description}</p>
                  </div>
                  {c.href && (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[#00C9B1] text-sm font-medium hover:text-[#4ECDC4] transition-colors whitespace-nowrap">
                      View site →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
            >
              <div className="aspect-[4/3] bg-[#0d1f35] border border-[rgba(0,201,177,0.08)] mb-5 relative overflow-hidden flex flex-col items-center justify-center gap-4 px-8 text-center">
                <h3 className="font-display text-[#F0FFFC] font-light italic text-4xl leading-tight">Your business?</h3>
                <p className="text-[#6a9e9a] text-sm">Get your free mockup in 48 hours</p>
                <a
                  href="#contact"
                  className="mt-2 inline-block bg-[#00C9B1] hover:bg-[#4ECDC4] text-white font-semibold text-sm px-5 py-2.5 transition-colors"
                >
                  Get your free mockup →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(0,201,177,0.15)] to-transparent" />

      {/* ── HOW IT WORKS ────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="px-6 md:px-10 lg:px-16 py-24"
      >
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <FadeItem>
              <p className="text-[#00C9B1] text-xs font-semibold uppercase tracking-[0.22em] mb-4">
                Process
              </p>
            </FadeItem>
            <FadeItem>
              <h2 className="font-display text-5xl md:text-6xl font-light italic text-[#F0FFFC] tracking-tight mb-16">
                A process as smooth as the result.
              </h2>
            </FadeItem>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                className="border-t border-[rgba(0,201,177,0.08)] pt-8"
              >
                <p className="font-display text-[#00C9B1] text-5xl font-light italic tabular-nums mb-5">
                  {step.n}
                </p>
                <h3 className="text-[#F0FFFC] font-bold text-xl mb-3 leading-snug">{step.title}</h3>
                <p className="text-[#6a9e9a] text-base leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(0,201,177,0.15)] to-transparent" />

      {/* ── PRICING ─────────────────────────────────────────────────── */}
      <section
        id="pricing"
        className="px-6 md:px-10 lg:px-16 py-24"
      >
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <FadeItem>
              <p className="text-[#00C9B1] text-xs font-semibold uppercase tracking-[0.22em] mb-4">
                Pricing
              </p>
            </FadeItem>
            <FadeItem>
              <h2 className="font-display text-5xl md:text-6xl font-light italic text-[#F0FFFC] tracking-tight mb-4">
                Investment, not expense.
              </h2>
            </FadeItem>
            <FadeItem>
              <p className="text-[#6a9e9a] text-lg max-w-md mb-16">
                Every quote is honest, every price is fixed. You&apos;ll never open an invoice and be surprised.
              </p>
            </FadeItem>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {/* Website Build */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="bg-[#0d1f35] border border-[rgba(0,201,177,0.08)] p-8"
            >
              <p className="text-[#6a9e9a] text-sm font-medium uppercase tracking-widest mb-3">
                Website Build
              </p>
              <p className="text-[#F0FFFC] text-4xl font-black mb-1">
                Starting at{' '}
                <span className="text-[#00C9B1]">
                  $<CountUp to={800} />
                </span>
              </p>
              <p className="text-[#6a9e9a] text-sm mb-8">one-time</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Custom design, built from scratch',
                  'Mobile-responsive & fast-loading',
                  'Basic SEO setup',
                  'Contact form + click-to-call',
                  'Goes live within 1 week',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#8bbdb9]">
                    <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7l3.5 3.5L12 3" stroke="#00C9B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block text-center bg-[#00C9B1] text-white font-bold py-3 text-sm hover:bg-[#4ECDC4] transition-colors">
                Get your free mockup
              </a>
            </motion.div>

            {/* Monthly Care */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
              className="bg-[#0d1f35] border border-[rgba(0,201,177,0.08)] p-8"
            >
              <p className="text-[#6a9e9a] text-sm font-medium uppercase tracking-widest mb-3">
                Monthly Care
              </p>
              <p className="text-[#F0FFFC] text-4xl font-black mb-1">
                Starting at{' '}
                <span className="text-[#4ECDC4]">
                  $<CountUp to={100} />
                </span>
              </p>
              <p className="text-[#6a9e9a] text-sm mb-8">per month</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Hosting & domain management',
                  'Security updates & backups',
                  'Google Business integration',
                  'Minor content updates',
                  'Priority support',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#8bbdb9]">
                    <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7l3.5 3.5L12 3" stroke="#00C9B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block text-center border border-[rgba(0,201,177,0.15)] text-[#F0FFFC] font-bold py-3 text-sm hover:border-[rgba(0,201,177,0.3)] hover:bg-[rgba(0,201,177,0.04)] transition-colors">
                Get in touch
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(0,201,177,0.15)] to-transparent" />

      {/* ── CONTACT ─────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="px-6 md:px-10 lg:px-16 py-24"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <FadeSection>
              <FadeItem>
                <p className="text-[#00C9B1] text-xs font-semibold uppercase tracking-[0.22em] mb-4">
                  Contact
                </p>
              </FadeItem>
              <FadeItem>
                <h2 className="font-display text-5xl md:text-6xl font-light italic text-[#F0FFFC] tracking-tight mb-6">
                  Your next chapter starts here.
                </h2>
              </FadeItem>
              <FadeItem>
                <p className="text-[#6a9e9a] text-lg leading-relaxed mb-10">
                  Tell me about your business. Within 48 hours I&rsquo;ll send you a free mockup — no strings, no pressure, just possibility.
                </p>
              </FadeItem>
              <FadeItem>
                <a
                  href="tel:+13109050806"
                  className="flex items-center gap-3 text-[#F0FFFC] font-bold text-2xl md:text-3xl hover:text-[#00C9B1] transition-colors"
                >
                  <svg className="text-[#00C9B1] shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  (310) 905-0806
                </a>
              </FadeItem>
            </FadeSection>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="px-6 md:px-10 lg:px-16 py-10 border-t border-[rgba(0,201,177,0.06)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="font-display text-[#F0FFFC] font-semibold italic text-lg">Toscano Studio</span>
          <p className="text-[#6a9e9a] text-sm">
            &copy; {new Date().getFullYear()} Toscano Studio · Los Angeles, CA
          </p>
        </div>
      </footer>
    </>
  );
}
