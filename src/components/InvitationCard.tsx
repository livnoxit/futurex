import { motion } from 'framer-motion'

interface RegistrationData {
  name: string
  email: string
  phone: string
  college: string
  course: string
  city: string
  linkedin?: string
  reason: string
  photo?: string
}

interface InvitationCardProps {
  registration: RegistrationData
}

export function InvitationCard({ registration }: InvitationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[32px] border border-white/15 bg-slate-950/95 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.35)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-500/5 to-fuchsia-400/10 blur-3xl" />
      <div className="relative grid gap-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300">Official Invitation</p>
            <h3 className="mt-3 text-2xl font-bold text-white">FutureX</h3>
          </div>
          <div className="rounded-full bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
            Confirmed
          </div>
        </div>

        <div className="grid gap-6 rounded-[28px] bg-slate-950/90 p-6">
          <div className="space-y-4 text-slate-200">
            <p className="text-sm uppercase tracking-[0.26em] text-cyan-300">Congratulations!</p>
            <h4 className="text-2xl font-bold text-white">Congratulations, {registration.name}</h4>
            <p>
              You are officially registered for FutureX — The Creative Digital Summit.
            </p>
            <div className="flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:items-center sm:gap-6">
              <span>25 July 2026</span>
              <span>Emerald Hall, Kottakkal</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1.25fr_0.75fr]">
            <div className="flex items-center justify-center overflow-hidden rounded-[26px] bg-white/5 p-4">
              {registration.photo ? (
                <img
                  src={registration.photo}
                  alt={registration.name}
                  className="h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-800 text-3xl font-bold text-white">
                  {registration.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex flex-col justify-between rounded-[26px] bg-slate-900/80 p-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">Entry Pass</p>
                <p className="mt-4 text-3xl font-bold text-white">QR</p>
              </div>
              <p className="text-sm text-slate-400">Show this card at the entrance.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
