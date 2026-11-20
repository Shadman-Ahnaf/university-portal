import { useState } from "react";
import { CreditCard, Wallet } from "lucide-react";
import OnlinePaymentModal from "../../components/payment/OnlinePaymentModal";

const student = {
  name: "Shadman Ahnaf",
  id: "23103012",
  program: "BCSE",
};

const payments = [
  {
    semester: "Fall 2026",
    payable: 45000,
    previousDue: 5000,
  },
  {
    semester: "Summer 2026",
    payable: 42000,
    previousDue: 0,
  },
];

export default function PaymentHome() {
  const [modalOpen, setModalOpen] = useState(false);

  const totalAmount = payments.reduce(
    (sum, payment) => sum + payment.payable + payment.previousDue,
    0
  );

  return (
    <>
      <div className="space-y-7">
        <div>
          <h2 className="text-xl font-semibold text-[#102E46]">
            Payment Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Review your semester payment details and outstanding balance.
          </p>
        </div>

        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2F7] text-[#102E46]">
              <Wallet size={21} />
            </div>
            <div>
              <h3 className="font-semibold text-[#102E46]">Student Information</h3>
              <p className="text-xs text-gray-500">Registered student details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 border-t border-gray-100 pt-5 sm:grid-cols-3">
            <div>
              <p className="text-xs text-gray-500">Student Name</p>
              <p className="mt-1 text-sm font-semibold text-gray-800">
                {student.name}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Student ID</p>
              <p className="mt-1 text-sm font-semibold text-gray-800">
                {student.id}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Program</p>
              <p className="mt-1 text-sm font-semibold text-gray-800">
                {student.program}
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
            <h3 className="font-semibold text-[#102E46]">
              Semester Payment Summary
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Your payable amount and previous dues
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="bg-[#F7F8FA]">
                <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th className="px-6 py-4">Semester</th>
                  <th className="px-6 py-4 text-right">Payable Amount</th>
                  <th className="px-6 py-4 text-right">Previous Due</th>
                  <th className="px-6 py-4 text-right">Total</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {payments.map((payment) => (
                  <tr key={payment.semester} className="text-sm text-gray-700">
                    <td className="px-6 py-5 font-medium text-gray-800">
                      {payment.semester}
                    </td>
                    <td className="px-6 py-5 text-right tabular-nums">
                      ৳{payment.payable.toLocaleString("en-BD")}
                    </td>
                    <td className="px-6 py-5 text-right tabular-nums">
                      ৳{payment.previousDue.toLocaleString("en-BD")}
                    </td>
                    <td className="px-6 py-5 text-right font-semibold text-[#102E46] tabular-nums">
                      ৳{(payment.payable + payment.previousDue).toLocaleString("en-BD")}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot className="bg-[#F7F8FA]">
                <tr className="font-semibold text-[#102E46]">
                  <td className="px-6 py-4" colSpan={3}>
                    Grand Total
                  </td>
                  <td className="px-6 py-4 text-right tabular-nums">
                    ৳{totalAmount.toLocaleString("en-BD")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <section className="flex flex-col items-start justify-between gap-5 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <div className="flex items-center gap-2">
              <CreditCard size={19} className="text-[#167D8D]" />
              <h3 className="font-semibold text-[#102E46]">Online Payment</h3>
            </div>
            <p className="mt-2 max-w-lg text-sm text-gray-500">
              Pay your outstanding university fees securely through online payment methods.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="w-full rounded-lg bg-[#102E46] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#194563] sm:w-auto"
          >
            Pay Online
          </button>
        </section>
      </div>

      <OnlinePaymentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        amount={totalAmount}
      />
    </>
  );
}