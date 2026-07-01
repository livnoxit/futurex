import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
// import axios from "axios";

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

// function toBase64(file: File) {
//   return new Promise<string>((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });
// }

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
      // form submission
      // await axios.post("https://futurex-''''''/register", values);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted successfully:", values);
      handleClose();
      onSubmitSuccess?.(values);
      onClose();
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
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
                  Full Name
                  <input
                    {...register("name")}
                    placeholder="John Doe"
                    className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                  />
                  {errors.name ? (
                    <span className="text-xs text-rose-400">
                      {errors.name.message}
                    </span>
                  ) : null}
                </label>
                <label className="grid gap-2 text-sm text-slate-100">
                  Place
                  <input
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
                  Email
                  <input
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
                  Age
                  <input
                    type="number"
                    {...register("age")}
                    placeholder="age"
                    className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base  text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
                  />
                  {errors.age ? (
                    <span className="text-xs text-rose-400">
                      {errors.age.message}
                    </span>
                  ) : null}
                </label>
                <label className="grid gap-2 text-sm text-slate-100">
                  Qualification
                  <input
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
                  Phone
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="99999 99999"
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
                  A registration fee of <strong>₹100</strong> is required to
                  confirm your seat. After submitting this form, our team will
                  contact you with the payment details.
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
