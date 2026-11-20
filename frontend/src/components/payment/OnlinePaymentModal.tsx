
import { useState } from "react";
import {
  X,
  CreditCard,
  Smartphone,
  Building2,
  ShieldCheck,
} from "lucide-react";

interface OnlinePaymentModalProps {
  open: boolean;
  onClose: () => void;
  amount: number;
}

export default function OnlinePaymentModal({
  open,
  onClose,
  amount,
}: OnlinePaymentModalProps) {
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState(String(amount));
  const [error, setError] = useState("");

  if (!open) return null;

  const paymentMethods = [
    {
      name: "Cards",
      description: "Visa, Mastercard and other cards",
      icon: CreditCard,
    },
    {
      name: "Mobile Banking",
      description: "bKash, Nagad and other services",
      icon: Smartphone,
    },
    {
      name: "Internet Banking",
      description: "Pay through your bank account",
      icon: Building2,
    },
  ];

  const handlePayment = () => {
    const value = Number(paymentAmount);

    if (!Number.isFinite(value) || value < 1000) {
      setError("Minimum payment amount is ৳1,000.");
      return;
    }

    if (value > amount) {
      setError("Payment amount cannot exceed your outstanding balance.");
      return;
    }

    if (!selectedGateway) return;

    setError("");
    window.alert(
      `Demo payment of ৳${value.toLocaleString("en-BD")} selected through ${selectedGateway}.`
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-[#102E46]">
              Online Payment
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Choose an amount and payment method
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close payment modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="mb-5 rounded-xl bg-[#F4F7FA] p-4">
            <p className="text-xs text-gray-500">Outstanding Balance</p>
            <p className="mt-1 text-2xl font-bold text-[#102E46]">
              ৳{amount.toLocaleString("en-BD")}
            </p>
          </div>

          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="paymentAmount"
                className="text-sm font-semibold text-gray-700"
              >
                Payment Amount
              </label>
              <span className="text-xs text-gray-500">Minimum ৳1,000</span>
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                ৳
              </span>
              <input
                id="paymentAmount"
                type="number"
                min="1000"
                max={amount}
                step="1"
                value={paymentAmount}
                onChange={(e) => {
                  setPaymentAmount(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 text-sm font-semibold text-gray-800 outline-none focus:border-[#167D8D] focus:ring-2 focus:ring-[#167D8D]/10"
              />
            </div>

            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-xs text-gray-500">
                You can make a partial payment.
              </p>
              <button
                onClick={() => {
                  setPaymentAmount(String(amount));
                  setError("");
                }}
                className="text-xs font-semibold text-[#167D8D] hover:underline"
              >
                Pay Full Amount
              </button>
            </div>

            {error && (
              <p className="mt-2 text-xs font-medium text-red-600">{error}</p>
            )}
          </div>

          <p className="mb-3 text-sm font-semibold text-gray-700">
            Available Payment Methods
          </p>

          <div className="space-y-3">
            {paymentMethods.map(({ name, description, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setSelectedGateway(name)}
                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                  selectedGateway === name
                    ? "border-[#167D8D] bg-[#167D8D]/5"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F0F3F6] text-[#102E46]">
                  <Icon size={21} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{name}</p>
                  <p className="mt-1 text-xs text-gray-500">{description}</p>
                </div>

                <div
                  className={`h-4 w-4 rounded-full border ${
                    selectedGateway === name
                      ? "border-[#167D8D] bg-[#167D8D] ring-2 ring-[#167D8D]/20"
                      : "border-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-dashed border-gray-200 p-3 text-center">
            <p className="text-xs text-gray-500">
              Demo payment gateway. SSLCOMMERZ and Stripe integration will be added later.
            </p>
          </div>

          <button
            disabled={!selectedGateway}
            onClick={handlePayment}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#102E46] py-3 text-sm font-semibold text-white transition hover:bg-[#194563] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShieldCheck size={17} />
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
