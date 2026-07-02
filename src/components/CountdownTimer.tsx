import { memo, useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-07-25T10:00:00").getTime();

const COUNTDOWN_ITEMS = [
  { key: "days", label: "DAYS" },
  { key: "hours", label: "HOURS" },
  { key: "minutes", label: "MINUTES" },
  { key: "seconds", label: "SECONDS" },
] as const;

type TimeRemaining = Record<(typeof COUNTDOWN_ITEMS)[number]["key"], number>;

function getTimeRemaining(): TimeRemaining {
  const diff = TARGET_DATE - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function timesEqual(a: TimeRemaining, b: TimeRemaining) {
  return (
    a.days === b.days &&
    a.hours === b.hours &&
    a.minutes === b.minutes &&
    a.seconds === b.seconds
  );
}

export const CountdownTimer = memo(function CountdownTimer() {
  const [time, setTime] = useState(getTimeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        const next = getTimeRemaining();
        return timesEqual(prev, next) ? prev : next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="py-12 flex justify-center"
      aria-label="Countdown to event"
      role="timer"
    >
      <div className="flex flex-nowrap justify-center gap-4 pb-4">
        {COUNTDOWN_ITEMS.map((item) => (
          <div key={item.label} className="group relative min-w-20 md:min-w-36">
            <div className="absolute -inset-2 rounded-[30px] bg-blue-900/20 blur-2xl transition duration-500 group-hover:bg-fuchsia-500/30" />

            <div className="relative flex h-20 w-20 md:h-40 md:w-36 flex-col items-center justify-center overflow-hidden rounded-[28px] border border-cyan-400/20 bg-white/3 backdrop-blur-3xl">
              <div className="absolute inset-0 rounded-[28px] border border-white/10" />
              <div className="absolute top-0 h-px w-full bg-linear-to-r from-transparent via-cyan-300 to-transparent" />

              <span
                className="bg-linear-to-b from-sky-500 via-fuchsia-500 to-pink-500 bg-clip-text font-['Orbitron'] text-3xl md:text-6xl font-black tracking-tight text-transparent drop-shadow-[0_0_25px_rgba(255,0,255,0.45)]"
                aria-hidden="true"
              >
                {String(time[item.key]).padStart(2, "0")}
              </span>

              <span className="mt-3 text-[8px] md:text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                {item.label}
              </span>

              <div className="absolute bottom-0 h-0.5 w-full bg-cyan-400 shadow-[0_0_30px_#22d3ee]" />
            </div>

            <span className="sr-only">
              {time[item.key]} {item.label.toLowerCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
