import { motion } from "framer-motion";
import {
  BadgeCheck,
  Compass,
  MapPin,
  MessageCircleMore,
  Phone,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { RegisterModal } from "../components/RegisterModal";

const highlights = [
  "Creative Design",
  "Digital Marketing",
  "Entrepreneurship Panel",
  "Networking",
  "Career Opportunities",
  "Expert Speakers",
];

// const agenda = [
//   { time: "09:00", title: "Registration" },
//   { time: "10:00", title: "Opening" },
//   { time: "11:00", title: "Creative Design Session" },
//   { time: "12:30", title: "Lunch" },
//   { time: "14:00", title: "Digital Marketing" },
//   { time: "15:30", title: "Entrepreneur Panel" },
//   { time: "17:00", title: "Networking" },
// ];

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
  {
    name:"Suhail Abdulatif",
    role:"Co-founder of Ailution",
    image:"/Kochu.jpeg"
  }
];

export function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const targetDate = new Date("2026-07-25T10:00:00").getTime();

  const getTime = () => {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video2.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-slate-950" /> */}

        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
        linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
      `,
            backgroundSize: "70px 70px",
          }}
        />

        {/* Cyan Glow */}
        <div className="absolute left-1/2 top-1/2 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[180px]" />

        {/* Background Text */}
        <h1 className="gilroy-heading pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black uppercase tracking-[0.2em] text-white/3">
          FUTUREX
        </h1>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Caption */}
          <div className="mb-8 mt-6 flex items-center gap-3 rounded-full border border-cyan-400/20 bg-white/5 px-6 py-2 backdrop-blur-xl">
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-300">
              AI CREATIVE DIGITAL SUMMIT • 2026
            </span>
          </div>

          {/* Logo */}
          <motion.img
            src="/white-logo.png"
            alt="FutureX"
            className="w-175 max-w-[90vw] object-contain drop-shadow-[0_0_80px_rgba(34,211,238,.35)]"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Tagline */}
          <p className="mt-4 mb-10 max-w-2xl text-2xl font-medium tracking-wide text-slate-200 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,0,255,0.45)]">
            AI Creative Digital Summit
          </p>

          {/* Event Info */}
          <div className="mb-8 flex flex-wrap justify-center gap-4 mx-1">
            <span className="rounded-full border border-cyan-400/20 bg-white/5 px-6 py-3 text-sm text-white backdrop-blur-xl">
              📅 25 July 2026
            </span>

            <span className="rounded-full border border-cyan-400/20 bg-white/5 px-6 py-3 text-sm text-white backdrop-blur-xl">
              📍 Rydges Inn, Kottakkal
            </span>

            <span className="rounded-full border border-cyan-400/20 bg-white/5 px-6 py-3 text-sm text-white backdrop-blur-xl">
              ⏰ 10:00 AM
            </span>
          </div>

          {/* Tech Tags */}
          {/* <div className="mb-12 flex flex-wrap justify-center gap-3">
            {[
              "AI",
              "DESIGN",
              "MARKETING",
              "STARTUPS",
              "NETWORKING",
              "CREATORS",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-300 backdrop-blur-xl transition hover:border-cyan-400/40 hover:text-cyan-300"
              >
                {item}
              </span>
            ))}
          </div> */}

          {/* CTA */}
          <button
            onClick={() => setModalOpen(true)}
            className="group relative overflow-hidden rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 px-10 py-4 text-sm font-bold uppercase tracking-[0.3em] text-black shadow-[0_0_60px_rgba(34,211,238,.45)] transition duration-300 hover:scale-105"
          >
            <span className="relative z-10">Register Now</span>

            <div className="absolute inset-0 -translate-x-full bg-white/20 transition duration-700 group-hover:translate-x-full" />
          </button>
          <p className="mt-6 text-sm text-slate-300"> Contact for more information:</p>

          <a
            href="tel:+919633332476"
            className="mt-2 inline-flex items-center gap-2 text-cyan-300 font-semibold hover:text-cyan-200"
          >
            <Phone size={18} />
            +91 9633332476
          </a>
          <div className="pt-10">
            <div className="flex h-12 w-7 justify-center rounded-full border border-white/20">
              <div className="mt-2 h-2 w-2 animate-bounce rounded-full bg-cyan-300 shadow-[0_0_15px_#22d3ee]" />
            </div>
          </div>
        </div>
      </motion.section>

      <div className="min-h-screen px-6 pb-10 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="py-12 flex justify-center">
          <div className="flex flex-nowrap justify-center gap-4  pb-4">
            {[
              { value: time.days, label: "DAYS" },
              { value: time.hours, label: "HOURS" },
              { value: time.minutes, label: "MINUTES" },
              { value: time.seconds, label: "SECONDS" },
            ].map((item) => (
              <div
                key={item.label}
                className="group relative min-w-20 md:min-w-36"
              >
                {/* Glow */}
                <div className="absolute -inset-2 rounded-[30px] bg-blue-900/20 blur-2xl transition duration-500 group-hover:bg-fuchsia-500/30" />

                <div className="relative flex h-20 w-20 md:h-40 md:w-36 flex-col items-center justify-center overflow-hidden rounded-[28px] border border-cyan-400/20 bg-white/3 backdrop-blur-3xl">
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-[28px] border border-white/10" />

                  {/* Top Glow */}
                  <div className="absolute top-0 h-px w-full bg-linear-to-r from-transparent via-cyan-300 to-transparent" />

                  {/* Number */}
                  <span className="bg-linear-to-b from-sky-500 via-fuchsia-500 to-pink-500 bg-clip-text font-['Orbitron'] text-3xl md:text-6xl font-black tracking-tight text-transparent drop-shadow-[0_0_25px_rgba(255,0,255,0.45)]">
                    {String(item.value).padStart(2, "0")}
                  </span>

                  {/* Label */}
                  <span className="mt-3 text-[8px] md:text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                    {item.label}
                  </span>

                  {/* Bottom Neon Line */}
                  <div className="absolute bottom-0 h-0.5 w-full bg-cyan-400 shadow-[0_0_30px_#22d3ee]" />

                  {/* Corner Glow */}
                  {/* <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/20 blur-3xl" /> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="space-y-8 py-12" id="about">
          <div className="space-y-3">
            <p className="gilroy-heading text-5xl   text-cyan-300">
              FutureX: The Creative Digital Summit
            </p>
            {/* <h3 className="text-3xl font-bold text-white">
              Built for curious minds and future founders.
            </h3> */}
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

        <section className="py-12">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300">
              FEATURED SPEAKERS
            </p>

            <h2 className="gilroy-heading max-w-2xl text-5xl font-black  leading-tight text-white md:text-6xl">
              Voices
              <br />
              Building Tomorrow.
            </h2>
          </div>

          {/* <div className="hidden md:block h-px w-48 bg-gradient-to-r from-cyan-400/60 to-transparent mb-3" /> */}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {speakers.map((speaker) => (
              <article
                key={speaker.name}
                className="group relative h-130 overflow-hidden rounded-4xl"
              >
                {/* Image */}
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/20 to-black/90" />

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-cyan-500/10" />

                {/* Name */}
                <div className="absolute left-7 top-7">
                  <h3 className="text-3xl font-black uppercase tracking-wide text-white">
                    {speaker.name}
                  </h3>

                  <p className="mt-2 text-sm  tracking-[0.2em] text-cyan-300">
                    {speaker.role}
                  </p>
                </div>

                {/* Bottom */}
                <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between">
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-xl">
                    Guest Speaker
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8 py-12">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Highlights
            </p>
            <h3 className="text-3xl gilroy-heading font-bold text-white">
              Everything that matters for your next leap.
            </h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <motion.article
                whileHover={{ y: -6, scale: 1.01 }}
                key={item}
                className="flex items-start gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-100 shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
              >
                <BadgeCheck size={18} className="mt-1 text-cyan-300" />
                <h4 className="text-base font-semibold">{item}</h4>
              </motion.article>
            ))}
          </div>
        </section>

        {/* <section className="space-y-8 py-12" id="schedule">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Schedule
          </p>
          <h3 className="text-3xl font-bold text-white">
            Designed as a day of momentum.
          </h3>
        </div>
        <div className="grid gap-4">
          {agenda.map((item) => (
            <div
              key={item.time}
              className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <time className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                {item.time}
              </time>
              <h4 className="text-lg font-semibold text-white">{item.title}</h4>
            </div>
          ))}
        </div>
      </section> */}

        <section className="space-y-6 py-12 bg-blue-900/30 rounded-3xl border border-white/10 p-5">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Venue
            </p>
            <h3 className="text-3xl gilroy-heading font-bold text-white">
              Rydges Inn, Kottakkal
            </h3>
          </div>
          <div className="inline-flex items-center gap-3 text-slate-100">
            <MapPin size={16} className="text-cyan-300" />
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
            <h3 className="text-3xl gilroy-heading font-bold text-white">
              Learn, connect, launch.
            </h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
              <Users size={18} className="text-cyan-300" />
              <h4 className="font-semibold text-white">Networking</h4>
            </div>
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
              <Compass size={18} className="text-cyan-300" />
              <h4 className="font-semibold text-white">Career Opportunities</h4>
            </div>
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
              <MessageCircleMore size={18} className="text-cyan-300" />
              <h4 className="font-semibold text-white">Expert Guidance</h4>
            </div>
          </div>
        </section>

        <RegisterModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmitSuccess={() => setModalOpen(false)}
        />
      </div>
    </div>
  );
}
