
import { useState } from "react";
import { FileText, ArrowRight } from "lucide-react";
import OnlinePaymentModal from "../../components/payment/OnlinePaymentModal";

const paymentParticulars = [
  "ELCT",
  "Authorization Fee",
  "Certificate Fee",
  "Testimonial Fee",
  "Transcript Fee",
  "Provisional Certificate Fee",
  "Duplicate ID Card Fee",
  "Retake Examination Fee",
  "Late Registration Fee",
  "Other Academic Fee",
];

export default function OtherFeeTransactions() {
  const [particular, setParticular] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const paymentAmount = Number(amount);

    if (!particular || !email || !amount || !Number.isFinite(paymentAmount) || paymentAmount <= 0) {
      return;
    }

    setModalOpen(true);
  };

  return (
    <>
      <div className="mx-auto max-w-4xl space-y-7">
        <div>
          <h2 className="text-xl font-semibold text-[#102E46]">
            Other Fee Transactions
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Submit payment details for additional university fees.
          </p>
        </div>

        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-5 sm:px-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2F7] text-[#102E46]">
              <FileText size={21} />
            </div>
            <div>
              <h3 className="font-semibold text-[#102E46]">
                Payment Information
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Enter the required information to proceed.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-7">
            <div className="space-y-2">
              <label
                htmlFor="particular"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Particulars <span className="text-red-500">*</span>
              </label>

              <select
                id="particular"
                value={particular}
                onChange={(e) => setParticular(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#167D8D] focus:ring-2 focus:ring-[#167D8D]/10"
              >
                <option value="" disabled>
                  Select payment particulars
                </option>
                {paymentParticulars.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#167D8D] focus:ring-2 focus:ring-[#167D8D]/10"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount (BDT) <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                  ৳
                </span>
                <input
                  id="amount"
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter payment amount"
                  required
                  className="w-full rounded-lg border border-gray-200 py-3 pl-9 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#167D8D] focus:ring-2 focus:ring-[#167D8D]/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="remarks"
                className="block text-sm font-medium text-gray-700"
              >
                Remarks <span className="text-gray-400">(Optional)</span>
              </label>

              <textarea
                id="remarks"
                rows={4}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter additional information if necessary"
                className="w-full resize-y rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#167D8D] focus:ring-2 focus:ring-[#167D8D]/10"
              />
            </div>

            <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-5 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setParticular("");
                  setEmail("");
                  setAmount("");
                  setRemarks("");
                }}
                className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
              >
                Clear Form
              </button>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#102E46] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#194563]"
              >
                Proceed Payment
                <ArrowRight size={17} />
              </button>
            </div>
          </form>
        </section>
      </div>

      <OnlinePaymentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        amount={Number(amount) || 0}
      />
    </>
  );
}
