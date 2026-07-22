import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <section className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="mb-8 inline-flex items-center text-sm gap-2 rounded-lg border border-cyan-500 px-3 py-1.5 text-cyan-300 transition hover:bg-cyan-500 hover:text-black"
        >
          ← Back
        </Link>
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm font-semibold">
            Future X
          </p>

          <h1 className="mt-4 mb-4 text-4xl gilroy-heading text-white">
            Registration Fee & Refund Policy
          </h1>
          <p className="text-slate-300">
            By registering for Future X, you acknowledge and agree to the
            following terms regarding registration fees:
          </p>
        </div>

        {/* Registration Fees */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
            Registration Fees
          </h2>

          <div className="space-y-4 text-slate-300">
            <div className="flex justify-between border-b border-slate-800 pb-3">
              <span>Delegate Pass</span>
              <span className="font-semibold text-white">₹399</span>
            </div>

            <div className="flex justify-between border-b border-slate-800 pb-3">
              <span>Student Pass</span>
              <span className="font-semibold text-white">₹100</span>
            </div>

            <div className="flex justify-between">
              <span>Non-Working Professional Pass</span>
              <span className="font-semibold text-white">₹100</span>
            </div>
          </div>
        </div>

        {/* Refund Policy */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
            Refund Policy
          </h2>

          <ul className="space-y-4 text-slate-300 list-disc pl-6">
            <li>
              The Delegate Pass (₹399) registration fee is strictly
              non-refundable.
            </li>

            <li>
              The Student Pass (₹100) registration fee is refundable only to
              students who attend the event and actively participate. Students
              who do not attend or do not participate will not be eligible for a
              refund.
            </li>

            <li>
              The Non-Working Professional Pass (₹100) registration fee is
              strictly non-refundable.
            </li>
          </ul>
        </div>

        {/* General Terms */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
            General Terms
          </h2>

          <ul className="space-y-4 text-slate-300 list-disc pl-6">
            <li>Registration is confirmed only upon successful payment.</li>

            <li>
              Refunds for eligible student registrations will be processed by
              the Future X organizing team after verification of attendance and
              participation.
            </li>

            <li>
              Registration cannot be transferred to another participant unless
              approved by the Future X organizing team.
            </li>

            <li>
              In the unlikely event that Future X is cancelled by the
              organizers, participants will be informed of the applicable refund
              or rescheduling process.
            </li>
          </ul>
        </div>

        {/* Acceptance */}
        <div className="rounded-2xl border border-cyan-500/40 bg-cyan-500/10 p-8">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-5">
            Acceptance
          </h2>

          <p className="text-slate-300 leading-8">
            By completing your registration and payment, you confirm that you
            have read, understood, and agreed to these Terms & Conditions and
            the applicable refund policy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Terms;
