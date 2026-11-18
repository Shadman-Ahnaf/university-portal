
import { useState } from "react";
import {
  MapPin,
  Bus,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import StudentLayout from "../../layouts/StudentLayout";

const busRoutes = [
  {
    route: "Narayanganj",
    stoppage: "Narayanganj Shopping Complex",
    busNo: "18",
    pickup: "6:30 AM",
    stops: [
      { name: "Narayanganj Shopping Complex", time: "6:30 AM" },
      { name: "Chashara", time: "6:40 AM" },
      { name: "Signboard", time: "6:55 AM" },
      { name: "Jatrabari", time: "7:10 AM" },
      { name: "Sayedabad", time: "7:20 AM" },
      { name: "Gulistan", time: "7:35 AM" },
      { name: "Campus", time: "8:00 AM" },
    ],
  },
  {
    route: "Gazipur",
    stoppage: "Gazipur Chowrasta",
    busNo: "21",
    pickup: "6:35 AM",
    stops: [
      { name: "Gazipur Chowrasta", time: "6:35 AM" },
      { name: "Board Bazar", time: "6:45 AM" },
      { name: "Tongi Station Road", time: "7:00 AM" },
      { name: "Abdullahpur", time: "7:15 AM" },
      { name: "House Building", time: "7:25 AM" },
      { name: "Campus", time: "7:55 AM" },
    ],
  },
  {
    route: "Savar",
    stoppage: "Savar Bus Stand",
    busNo: "12",
    pickup: "6:25 AM",
    stops: [
      { name: "Savar Bus Stand", time: "6:25 AM" },
      { name: "Radio Colony", time: "6:40 AM" },
      { name: "Amin Bazar", time: "6:55 AM" },
      { name: "Gabtoli", time: "7:10 AM" },
      { name: "Technical", time: "7:25 AM" },
      { name: "Campus", time: "8:05 AM" },
    ],
  },
  {
    route: "Tongi",
    stoppage: "Tongi College Gate",
    busNo: "15",
    pickup: "6:45 AM",
    stops: [
      { name: "Tongi College Gate", time: "6:45 AM" },
      { name: "Tongi Station", time: "6:55 AM" },
      { name: "Mill Gate", time: "7:05 AM" },
      { name: "Abdullahpur", time: "7:20 AM" },
      { name: "Azampur", time: "7:35 AM" },
      { name: "Campus", time: "7:50 AM" },
    ],
  },
  {
    route: "Keraniganj",
    stoppage: "Keraniganj Bus Stand",
    busNo: "09",
    pickup: "6:20 AM",
    stops: [
      { name: "Keraniganj Bus Stand", time: "6:20 AM" },
      { name: "Babubazar", time: "6:40 AM" },
      { name: "Naya Bazar", time: "6:50 AM" },
      { name: "Gulistan", time: "7:05 AM" },
      { name: "Mohakhali", time: "7:35 AM" },
      { name: "Campus", time: "8:10 AM" },
    ],
  },
  {
    route: "Demra",
    stoppage: "Demra Staff Quarter",
    busNo: "24",
    pickup: "6:30 AM",
    stops: [
      { name: "Demra Staff Quarter", time: "6:30 AM" },
      { name: "Matuail", time: "6:45 AM" },
      { name: "Signboard", time: "7:00 AM" },
      { name: "Jatrabari", time: "7:15 AM" },
      { name: "Gulistan", time: "7:35 AM" },
      { name: "Campus", time: "8:10 AM" },
    ],
  },
  {
    route: "Purbachal",
    stoppage: "Purbachal 300 Feet",
    busNo: "27",
    pickup: "6:40 AM",
    stops: [
      { name: "Purbachal 300 Feet", time: "6:40 AM" },
      { name: "Kanchan Bridge", time: "6:55 AM" },
      { name: "Kuril", time: "7:15 AM" },
      { name: "Khilkhet", time: "7:30 AM" },
      { name: "Airport Road", time: "7:40 AM" },
      { name: "Campus", time: "8:00 AM" },
    ],
  },
  {
    route: "Mirpur",
    stoppage: "Mirpur 10",
    busNo: "11",
    pickup: "6:50 AM",
    stops: [
      { name: "Mirpur 10", time: "6:50 AM" },
      { name: "Mirpur 11", time: "7:00 AM" },
      { name: "Pallabi", time: "7:10 AM" },
      { name: "ECB Chattar", time: "7:25 AM" },
      { name: "Kalshi", time: "7:35 AM" },
      { name: "Campus", time: "8:05 AM" },
    ],
  },
  {
    route: "Mohammadpur",
    stoppage: "Mohammadpur Bus Stand",
    busNo: "16",
    pickup: "6:35 AM",
    stops: [
      { name: "Mohammadpur Bus Stand", time: "6:35 AM" },
      { name: "Shyamoli", time: "6:50 AM" },
      { name: "Kallyanpur", time: "7:00 AM" },
      { name: "Technical", time: "7:15 AM" },
      { name: "Mirpur 1", time: "7:30 AM" },
      { name: "Campus", time: "8:05 AM" },
    ],
  },
  {
    route: "Narsingdi",
    stoppage: "Madhabdi Bus Stand",
    busNo: "30",
    pickup: "6:15 AM",
    stops: [
      { name: "Madhabdi Bus Stand", time: "6:15 AM" },
      { name: "Narsingdi Bus Stand", time: "6:30 AM" },
      { name: "Ghorashal", time: "6:50 AM" },
      { name: "Kanchan Bridge", time: "7:15 AM" },
      { name: "Kuril", time: "7:35 AM" },
      { name: "Campus", time: "8:10 AM" },
    ],
  },
];

export default function BusSchedule() {
  const [expandedBus, setExpandedBus] = useState<string | null>(null);

  return (
    <StudentLayout>
      <div className="mx-auto max-w-6xl space-y-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Bus Schedule
        </h1>

        <div className="space-y-3">
          {busRoutes.map((bus) => {
            const isExpanded = expandedBus === bus.busNo;

            return (
              <div
                key={bus.busNo}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        Route
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {bus.route}
                      </p>
                    </div>

                    <div>
                      <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        <MapPin size={13} /> Stoppage
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {bus.stoppage}
                      </p>
                    </div>

                    <div>
                      <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        <Bus size={13} /> Bus No.
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {bus.busNo}
                      </p>
                    </div>

                    <div>
                      <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        <Clock size={13} /> Pickup Time
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {bus.pickup}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setExpandedBus(isExpanded ? null : bus.busNo)
                    }
                    className="flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-800 transition-colors hover:bg-blue-100 sm:self-center"
                  >
                    {isExpanded ? "Hide Route" : "See Route"}
                    {isExpanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                </div>

                {isExpanded && (
                  <div className="border-t border-slate-200 bg-slate-50 px-5 py-5 sm:px-7">
                    <h3 className="mb-5 text-sm font-semibold text-slate-800">
                      {bus.route} Route
                    </h3>

                    <div className="ml-2 border-l-2 border-blue-200 pl-5">
                      {bus.stops.map((stop, index) => {
                        const isCampus = index === bus.stops.length - 1;

                        return (
                          <div
                            key={`${stop.name}-${index}`}
                            className="relative flex items-center justify-between gap-3 pb-5 last:pb-0"
                          >
                            <span
                              className={`absolute -left-[27px] flex h-3 w-3 items-center justify-center rounded-full border-2 border-white ${
                                isCampus ? "bg-blue-700" : "bg-sky-400"
                              }`}
                            />

                            <div className="min-w-0">
                              <p
                                className={`text-sm ${
                                  isCampus
                                    ? "font-bold text-blue-800"
                                    : "font-medium text-slate-700"
                                }`}
                              >
                                {stop.name}
                              </p>
                              {isCampus && (
                                <span className="mt-1 inline-block rounded bg-blue-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-blue-800">
                                  Destination
                                </span>
                              )}
                            </div>

                            <span className="shrink-0 text-sm font-semibold tabular-nums text-slate-600">
                              {stop.time}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </StudentLayout>
  );
}
