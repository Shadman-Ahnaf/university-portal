import { useState } from "react";
const faculty = [
  { shortName: "MRA", fullName: "Mohammad Rashedul Alam", department: "CSE" },
  { shortName: "SKH", fullName: "Shahidul Karim Hossain", department: "CSE" },
  { shortName: "NAT", fullName: "Nusrat Akter", department: "CSE" },
  { shortName: "FAR", fullName: "Farhana Rahman", department: "CSE" },
  { shortName: "TAS", fullName: "Tanvir Ahmed Siddique", department: "CSE" },
  { shortName: "RKH", fullName: "Rezaul Karim Hridoy", department: "CSE" },
  { shortName: "MAH", fullName: "Mahmudul Hasan", department: "CATHM" },
  { shortName: "SNA", fullName: "Sadia Nasrin Akter", department: "CAAS" },
  { shortName: "MKI", fullName: "Mizanur Rahman Khan", department: "CEAT" },
  { shortName: "FNS", fullName: "Farida Nahar Sultana", department: "CSE" },
  { shortName: "ARH", fullName: "Abdul Rahman Hossain", department: "CEAT" },
  { shortName: "NKS", fullName: "Nabila Khan Sumi", department: "CAAS" },
];

export default function FacultyLists() {
  const [search, setSearch] = useState("");

  const filteredFaculty = faculty.filter((member) =>
    `${member.shortName} ${member.fullName}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Faculty Lists
      </h1>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
  <h2 className="font-semibold text-slate-800">Faculty Directory</h2>

  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search by short or full name..."
    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#167D8D] focus:ring-2 focus:ring-[#167D8D]/10 sm:w-72"
  />
</div>

        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#102E46] text-xs uppercase tracking-wide text-white">
                <th className="w-40 px-6 py-4 font-semibold">Short Name</th>
                <th className="px-6 py-4 font-semibold">Full Name</th>
                <th className="w-48 px-6 py-4 font-semibold">Department</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredFaculty.map((member) => (
                <tr
                  key={member.shortName}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <span className="inline-flex min-w-12 justify-center rounded-md bg-blue-50 px-3 py-1.5 text-sm font-bold text-[#102E46]">
                      {member.shortName}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-slate-700">
                    {member.fullName}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {member.department}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-slate-100 sm:hidden">
          {filteredFaculty.map((member) => (
            <div
              key={member.shortName}
              className="flex items-center justify-between gap-3 px-4 py-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">
                  {member.fullName}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Short Name: {member.shortName}
                </p>
              </div>

              <span className="shrink-0 rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                {member.department}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
