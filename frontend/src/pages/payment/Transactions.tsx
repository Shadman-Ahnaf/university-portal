
import { ArrowDownToLine, Receipt } from "lucide-react";

const transactions = [
  {
    id: "TXN-2026-0081",
    date: "18 Nov 2026",
    semester: "Fall 2026",
    method: "Visa Card",
    amount: 15000,
    
  },
  {
    id: "TXN-2026-0076",
    date: "05 Nov 2026",
    semester: "Fall 2026",
    method: "bKash",
    amount: 10000,
    
  },
  {
    id: "TXN-2026-0062",
    date: "22 Oct 2026",
    semester: "Fall 2026",
    method: "Internet Banking",
    amount: 12000,
    
  },
  {
    id: "TXN-2026-0048",
    date: "10 Sep 2026",
    semester: "Summer 2026",
    method: "Mastercard",
    amount: 20000,
    
  },
  {
    id: "TXN-2026-0031",
    date: "25 Aug 2026",
    semester: "Summer 2026",
    method: "Nagad",
    amount: 8000,
    
  },
  {
    id: "TXN-2026-0019",
    date: "12 Aug 2026",
    semester: "Summer 2026",
    method: "Visa Card",
    amount: 5000,
  
  },
];

export default function Transactions() {
  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-xl font-semibold text-[#102E46]">
          Transactions
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          View your six most recent university payment transactions.
        </p>
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-5 sm:px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF2F7] text-[#102E46]">
            <Receipt size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-[#102E46]">
              Recent Payment History
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Last 6 transactions
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-[#F7F8FA]">
              <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4">Transaction ID</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Semester</th>
                <th className="px-5 py-4">Payment Method</th>
                <th className="px-5 py-4 text-right">Amount</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="text-sm text-gray-700 transition hover:bg-gray-50/70"
                >
                  <td className="whitespace-nowrap px-5 py-5 font-medium text-[#102E46]">
                    {transaction.id}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5">
                    {transaction.date}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5">
                    {transaction.semester}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5">
                    {transaction.method}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5 text-right font-semibold tabular-nums text-[#102E46]">
                    ৳{transaction.amount.toLocaleString("en-BD")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4">
        <ArrowDownToLine size={19} className="mt-0.5 text-[#167D8D]" />
        <div>
          <p className="text-sm font-medium text-[#102E46]">
            Payment records
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Your complete transaction history and downloadable payment receipts will be available here.
          </p>
        </div>
      </div>
    </div>
  );
}
