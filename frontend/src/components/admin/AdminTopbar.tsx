
import { Bell, Menu, UserCircle } from "lucide-react";

interface AdminTopbarProps {
  onMenuClick: () => void;
}

export default function AdminTopbar({
  onMenuClick,
}: AdminTopbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-haspopup="true"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#167D8D] lg:hidden"
        >
          <Menu size={22} />
        </button>

        <h2 className="text-base font-semibold text-[#102E46] sm:text-lg">
          Administration
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#167D8D]"
        >
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:pl-4">
          <UserCircle size={30} className="text-[#167D8D]" />

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-800">
              Administrator
            </p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
