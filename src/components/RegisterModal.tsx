import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  GraduationCap,
  Briefcase,
  Mail,
  MapPin,
  Phone,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  submitRegistrationForm,
  type RegistrationFormValues,
} from "../api/registration";

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name"),

  place: z.string().trim().optional(),

  email: z
    .union([
      z.literal(""),
      z.string().trim().email("Please enter a valid email address"),
    ])
    .optional(),

  occupation: z.enum(["Student", "Professional", "Non Working"], {
    error: "Please select your occupation",
  }),

  age: z.preprocess(
    (val) =>
      val === "" || val === undefined || val === null
        ? undefined
        : Number(val),
    z
      .number({ error: "Please enter a valid age" })
      .min(1, "Please enter a valid age")
      .max(120, "Please enter a valid age")
  ),

  qualification: z.string().trim().optional(),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"),
});

type FormValues = z.infer<typeof schema>;

function FormFieldLabel({
  icon: Icon,
  required = false,
  children,
}: {
  icon: LucideIcon;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 font-medium text-white">
      <Icon
        className="size-4 shrink-0 text-cyan-400"
        strokeWidth={2}
        aria-hidden="true"
      />
      {children}
      {required ? (
        <span className="text-rose-400" aria-hidden="true">
          *
        </span>
      ) : null}
    </span>
  );
}

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitSuccess?: (values: RegistrationFormValues) => void;
}

export function RegisterModal({
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
  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await submitRegistrationForm(values);
      toast.success("Registration confirmed", {
        description:
          "Thank you for registering for FutureX. Our team will contact you shortly.",
        duration: 5000,
      });
      handleClose();
      onSubmitSuccess?.(values);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error("Unable to register", {
        description: message,
        duration: 6000,
      });
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/85 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
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
          >
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                  Registration
                </p>
                <h2 className="mt-3 text-3xl font-bold text-white">
                  Reserve your seat at FutureX
                </h2>
              </div>
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10"
                onClick={handleClose}
                type="button"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-slate-100">
                  <FormFieldLabel icon={User} required>
                    Full Name
                  </FormFieldLabel>
                  <input
                    id="full_name"
                    {...register("full_name")}
                    placeholder="John Doe"
                    aria-required="true"
                    className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                  />
                  {errors.full_name ? (
                    <span className="text-xs text-rose-400">
                      {errors.full_name.message}
                    </span>
                  ) : null}
                </label>
                <label className="grid gap-2 text-sm text-slate-100">
                  <FormFieldLabel icon={MapPin}>Place</FormFieldLabel>
                  <input
                    id="place"
                    {...register("place")}
                    placeholder="City"
                    className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                  />
                  {errors.place ? (
                    <span className="text-xs text-rose-400">
                      {errors.place.message}
                    </span>
                  ) : null}
                </label>
                <label className="grid gap-2 text-sm text-slate-100">
                  <FormFieldLabel icon={Mail}>Email</FormFieldLabel>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                    className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                  />
                  {errors.email ? (
                    <span className="text-xs text-rose-400">
                      {errors.email.message}
                    </span>
                  ) : null}
                </label>
                <label className="grid gap-2 text-sm text-slate-100">
                  <FormFieldLabel icon={Briefcase} required>
                    Occupation
                  </FormFieldLabel>

                  <select
                    id="occupation"
                    {...register("occupation")}
                    className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-black">
                      Select your occupation
                    </option>
                    <option value="Student">Student</option>
                    <option value="Professional">Professional</option>
                    <option value="Non Working">Non-Working</option>
                  </select>

                  {errors.occupation ? (
                    <span className="text-xs text-rose-400">
                      {errors.occupation.message}
                    </span>
                  ) : null}
                </label>
                <label className="grid gap-2 text-sm text-slate-100">
                  <FormFieldLabel icon={Calendar} required>Age</FormFieldLabel>
                  <input
                    id="age"
                    type="number"
                    {...register("age")}
                    placeholder="Age"
                    className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base  text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                  />
                  {errors.age ? (
                    <span className="text-xs text-rose-400">
                      {errors.age.message}
                    </span>
                  ) : null}
                </label>
                <label className="grid gap-2 text-sm text-slate-100">
                  <FormFieldLabel icon={GraduationCap}>
                    Qualification
                  </FormFieldLabel>
                  <input
                    id="qualification"
                    {...register("qualification")}
                    placeholder="Qualification"
                    className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                  />
                  {errors.qualification ? (
                    <span className="text-xs text-rose-400">
                      {errors.qualification.message}
                    </span>
                  ) : null}
                </label>
                <label className="grid gap-2 text-sm text-slate-100">
                  <FormFieldLabel icon={Phone} required>
                    Phone
                  </FormFieldLabel>
                  <input
                    id="phone"
                    {...register("phone")}
                    type="tel"
                    placeholder="99999 99999"
                    aria-required="true"
                    className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                  />
                  {errors.phone ? (
                    <span className="text-xs text-rose-400">
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
                  After submitting this registration form, our team will contact
                  you to confirm your participation. A registration fee is
                  applicable, and your seat will be confirmed only upon
                  successful payment. Lunch and refreshments will be provided
                  for all registered participants. (Terms & Conditions Apply)
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
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
                  className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-sky-400 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Register"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
