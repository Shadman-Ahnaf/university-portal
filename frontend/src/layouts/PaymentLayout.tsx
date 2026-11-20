import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import PaymentSidebar from "../components/payment/PaymentSidebar";

export default function PaymentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        <PaymentSidebar />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close sidebar"
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="relative h-full w-72 max-w-[85%]">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-3 top-4 z-10 rounded-lg p-2 text-white hover:bg-white/10"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <PaymentSidebar />
          </div>
        </div>
      )}

      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-5 sm:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>

          <h1 className="text-lg font-semibold text-[#102E46]">
            University Payment
          </h1>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}