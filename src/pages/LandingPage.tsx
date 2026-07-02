import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  BadgeCheck,
  Calendar,
  Clock,
  Compass,
  MapPin,
  MessageCircleMore,
  Users,
} from "lucide-react";
import { lazy, memo, Suspense, useCallback, useState } from "react";
import { CountdownTimer } from "../components/CountdownTimer";

const RegisterModal = lazy(() =>
  import("../components/RegisterModal").then((module) => ({
    default: module.RegisterModal,
  })),
);

const prefetchRegisterModal = () => {
  void import("../components/RegisterModal");
};

const highlights = [
  "Creative Design",
  "Digital Marketing",
  "Entrepreneurship Panel",
  "Networking",
  "Career Opportunities",
  "Expert Speakers",
] as const;

const speakers = [
  {
    name: "Favour Francis",
    role: "Brand Consultant & Creative Director",
    image: "/francis.jpeg",
  },
  {
    name: "Rashifa Thasneem",
    role: "Project manager at inspler ecommerce and content creator",
    image: "/rashifa.jpeg",
  },
] as const;

const HighlightsSection = memo(function HighlightsSection() {
  return (
    <section className="space-y-8 py-12">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
          Highlights
        </p>
        <h3 className="text-3xl font-bold text-white">
          Everything that matters for your next leap.
        </h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item) => (
          <m.article
            whileHover={{ y: -6, scale: 1.01 }}
            key={item}
            className="flex items-start gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-100 shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
          >
            <BadgeCheck size={18} className="mt-1 text-cyan-300" aria-hidden="true" />
            <h4 className="text-base font-semibold">{item}</h4>
          </m.article>
        ))}
      </div>
    </section>
  );
});

const SpeakersSection = memo(function SpeakersSection() {
  return (
    <section className="py-12">
      <div className="mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300">
          FEATURED SPEAKERS
        </p>

        <h2 className="max-w-2xl text-5xl font-black leading-tight text-white md:text-6xl">
          Voices
          <br />
          Building Tomorrow.
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker) => (
          <article
            key={speaker.name}
            className="group relative h-130 overflow-hidden rounded-4xl"
          >
            <img
              src={speaker.image}
              alt={speaker.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/20 to-black/90" />

            <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-cyan-500/10" />

            <div className="absolute left-7 top-7">
              <h3 className="text-3xl font-black uppercase tracking-wide text-white">
                {speaker.name}
              </h3>

              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-cyan-300">
                {speaker.role}
              </p>
            </div>

            <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-xl">
                Guest Speaker
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
});

export function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleSubmitSuccess = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <div>
        <m.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/video2.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/65" aria-hidden="true" />

          <div
            className="absolute inset-0 opacity-20"
            aria-hidden="true"
            style={{
              backgroundImage: `
        linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
      `,
              backgroundSize: "70px 70px",
            }}
          />

          <div
            className="absolute left-1/2 top-1/2 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[180px]"
            aria-hidden="true"
          />

          <h1
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black uppercase tracking-[0.2em] text-white/3"
            aria-hidden="true"
          >
            FUTUREX
          </h1>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-8 flex items-center gap-3 rounded-full border border-cyan-400/20 bg-white/5 px-6 py-2 backdrop-blur-xl">
              <div
                className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"
                aria-hidden="true"
              />
              <span className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-300">
                THE CREATIVE DIGITAL SUMMIT • 2026
              </span>
            </div>

            <m.img
              src="/white-logo.png"
              alt="FutureX"
              fetchPriority="high"
              decoding="async"
              className="w-175 max-w-[90vw] object-contain drop-shadow-[0_0_80px_rgba(34,211,238,.35)]"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <p className="mt-4 mb-10 max-w-2xl text-2xl font-medium tracking-wide text-slate-200 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,0,255,0.45)]">
              AI Creative Digital Summit
            </p>

            <div className="mb-8 flex flex-wrap justify-center gap-4 mx-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-6 py-3 text-sm text-white backdrop-blur-xl">
                <Calendar size={16} className="shrink-0 text-cyan-300" aria-hidden="true" />
                25 July 2026
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-6 py-3 text-sm text-white backdrop-blur-xl">
                <MapPin size={16} className="shrink-0 text-cyan-300" aria-hidden="true" />
                Rydges Inn, Kottakkal
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-6 py-3 text-sm text-white backdrop-blur-xl">
                <Clock size={16} className="shrink-0 text-cyan-300" aria-hidden="true" />
                10:00 AM
              </span>
            </div>

            <button
              type="button"
              onClick={openModal}
              onMouseEnter={prefetchRegisterModal}
              onFocus={prefetchRegisterModal}
              className="group relative overflow-hidden rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 px-10 py-4 text-sm font-bold uppercase tracking-[0.3em] text-black shadow-[0_0_60px_rgba(34,211,238,.45)] transition duration-300 hover:scale-105"
            >
              <span className="relative z-10">Register Now</span>

              <div
                className="absolute inset-0 -translate-x-full bg-white/20 transition duration-700 group-hover:translate-x-full"
                aria-hidden="true"
              />
            </button>
            <div className="pt-10" aria-hidden="true">
              <div className="flex h-14 w-8 justify-center rounded-full border border-white/20">
                <div className="mt-2 h-2 w-2 animate-bounce rounded-full bg-cyan-300 shadow-[0_0_15px_#22d3ee]" />
              </div>
            </div>
          </div>
        </m.section>

        <main className="min-h-screen px-6 pb-10 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <CountdownTimer />

          <section className="space-y-8 py-12" id="about">
            <div className="space-y-3">
              <p className="text-5xl font-semibold uppercase  text-cyan-300">
                FutureX: The Creative Digital Summit
              </p>
            </div>
            <p className=" text-slate-200 leading-8">
              FutureX is a future-focused platform designed to empower students,
              aspiring career seekers, creators, and entrepreneurs to thrive in
              the evolving creative and digital landscape. Bringing together
              industry experts, creative professionals, and business leaders,
              FutureX offers immersive sessions in Creative Design, Digital
              Marketing, and Entrepreneurship, providing participants with
              practical skills, real-world insights, and meaningful industry
              exposure.
            </p>
            <p className=" text-slate-200 leading-8">
              More than just an event, FutureX is a launchpad for ambitious
              minds—a place where ideas are sparked, connections are built, and
              opportunities are discovered. Our mission is to inspire and equip
              students and young professionals with the knowledge, skills,
              confidence, and future-ready mindset needed to build successful
              careers and create lasting impact.
            </p>
          </section>

          <SpeakersSection />

          <HighlightsSection />

          <section className="space-y-6 py-12 bg-blue-900/30 rounded-3xl border border-white/10 p-5">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Venue
              </p>
              <h3 className="text-3xl font-bold text-white">
                Rydges Inn, Kottakkal
              </h3>
            </div>
            <div className="inline-flex items-center gap-3 text-slate-100">
              <MapPin size={16} className="text-cyan-300" aria-hidden="true" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rydges+Inn+Kottakkal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-100 transition hover:text-white"
              >
                Way to Venue
              </a>
            </div>
          </section>

          <section className="space-y-8 py-12">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Why Attend
              </p>
              <h3 className="text-3xl font-bold text-white">
                Learn, connect, launch.
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
                <Users size={18} className="text-cyan-300" aria-hidden="true" />
                <h4 className="font-semibold text-white">Networking</h4>
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
                <Compass size={18} className="text-cyan-300" aria-hidden="true" />
                <h4 className="font-semibold text-white">Career Opportunities</h4>
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
                <MessageCircleMore
                  size={18}
                  className="text-cyan-300"
                  aria-hidden="true"
                />
                <h4 className="font-semibold text-white">Expert Guidance</h4>
              </div>
            </div>
          </section>

          {modalOpen ? (
            <Suspense fallback={null}>
              <RegisterModal
                open={modalOpen}
                onClose={closeModal}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </Suspense>
          ) : null}
        </main>
      </div>
    </LazyMotion>
  );
}
