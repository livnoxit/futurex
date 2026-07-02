import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { X } from "lucide-react";
import { memo, useCallback } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  place: z.string().min(2, "Please enter your place"),
  email: z.string().email("Please enter a valid email address"),
  age: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number()
      .min(1, "Please enter a valid age")
      .max(120, "Please enter a valid age")
      .optional(),
  ),
  qualification: z.string().min(2, "Please enter your qualification"),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"),
});

type FormValues = z.infer<typeof schema>;

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitSuccess?: (values: FormValues) => void;
}

export const RegisterModal = memo(function RegisterModal({
  open,
  onClose,
  onSubmitSuccess,
}: RegisterModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
  });

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        handleClose();
        onSubmitSuccess?.(values);
        toast.success("Form submitted successfully!");
      } catch {
        // Submission errors are handled silently until API integration is added.
      }
    },
    [handleClose, onSubmitSuccess],
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {open ? (
          <m.div
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/85 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            role="presentation"
          >
            <m.div
              className="
            w-full
            max-w-3xl
            max-h-[90vh]
            overflow-y-auto
            rounded-[28px]
            border border-white/15
            bg-slate-950/95
            p-8
            shadow-[0_40px_120px_rgba(0,0,0,0.45)]
"
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="register-modal-title"
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    Registration
                  </p>
                  <h2
                    id="register-modal-title"
                    className="mt-3 text-3xl font-bold text-white"
                  >
                    Reserve your seat at FutureX
                  </h2>
                </div>
                <button
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10"
                  onClick={handleClose}
                  type="button"
                  aria-label="Close registration form"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm text-slate-100">
                    Full Name
                    <input
                      {...register("name")}
                      id="register-name"
                      autoComplete="name"
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={errors.name ? "register-name-error" : undefined}
                      placeholder="John Doe"
                      className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                    />
                    {errors.name ? (
                      <span id="register-name-error" className="text-xs text-rose-400">
                        {errors.name.message}
                      </span>
                    ) : null}
                  </label>
                  <label className="grid gap-2 text-sm text-slate-100">
                    Place
                    <input
                      {...register("place")}
                      id="register-place"
                      autoComplete="address-level2"
                      aria-invalid={errors.place ? "true" : undefined}
                      aria-describedby={errors.place ? "register-place-error" : undefined}
                      placeholder="City"
                      className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                    />
                    {errors.place ? (
                      <span id="register-place-error" className="text-xs text-rose-400">
                        {errors.place.message}
                      </span>
                    ) : null}
                  </label>
                  <label className="grid gap-2 text-sm text-slate-100">
                    Email
                    <input
                      type="email"
                      {...register("email")}
                      id="register-email"
                      autoComplete="email"
                      aria-invalid={errors.email ? "true" : undefined}
                      aria-describedby={errors.email ? "register-email-error" : undefined}
                      placeholder="you@example.com"
                      className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                    />
                    {errors.email ? (
                      <span id="register-email-error" className="text-xs text-rose-400">
                        {errors.email.message}
                      </span>
                    ) : null}
                  </label>
                  <label className="grid gap-2 text-sm text-slate-100">
                    Age
                    <input
                      type="number"
                      {...register("age")}
                      id="register-age"
                      aria-invalid={errors.age ? "true" : undefined}
                      aria-describedby={errors.age ? "register-age-error" : undefined}
                      placeholder="age"
                      className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base  text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                    />
                    {errors.age ? (
                      <span id="register-age-error" className="text-xs text-rose-400">
                        {errors.age.message}
                      </span>
                    ) : null}
                  </label>
                  <label className="grid gap-2 text-sm text-slate-100">
                    Qualification
                    <input
                      {...register("qualification")}
                      id="register-qualification"
                      aria-invalid={errors.qualification ? "true" : undefined}
                      aria-describedby={
                        errors.qualification ? "register-qualification-error" : undefined
                      }
                      placeholder="Qualification"
                      className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                    />
                    {errors.qualification ? (
                      <span
                        id="register-qualification-error"
                        className="text-xs text-rose-400"
                      >
                        {errors.qualification.message}
                      </span>
                    ) : null}
                  </label>
                  <label className="grid gap-2 text-sm text-slate-100">
                    Phone
                    <input
                      {...register("phone")}
                      id="register-phone"
                      type="tel"
                      autoComplete="tel"
                      aria-invalid={errors.phone ? "true" : undefined}
                      aria-describedby={errors.phone ? "register-phone-error" : undefined}
                      placeholder="99999 99999"
                      className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                    />
                    {errors.phone ? (
                      <span id="register-phone-error" className="text-xs text-rose-400">
                        {errors.phone.message}
                      </span>
                    ) : null}
                  </label>
                </div>
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                  <p className="text-sm text-slate-200">
                    <span className="font-semibold text-cyan-300">
                      Important:
                    </span>{" "}
                    After submitting this form, our team will contact you.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-sky-400 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Register"}
                  </button>
                </div>
              </form>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
});
