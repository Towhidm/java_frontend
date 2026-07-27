import { User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const ProfileHeader = () => {
  const { user } = useAuth();
  const roleLabel = user?.role === "JOBSEEKER" ? "Job Seeker" : "Employer";

  return (
    <div className="bg-white px-6 py-5 md:px-8 md:py-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-4 md:gap-5">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#3BA59C]/40 bg-[#E6F4F2] flex items-center justify-center shrink-0">
        <User size={28} className="text-[#3BA59C]" strokeWidth={1.75} />
      </div>

      <div className="text-center sm:text-left flex-1 min-w-0">
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mb-1">
          <h1 className="text-2xl font-semibold text-slate-900 truncate">
            {user?.name}
          </h1>
          <span className="bg-[#E6F4F2] text-[#2d817a] px-2.5 py-0.5 rounded-md text-xs font-medium uppercase tracking-wide">
            {roleLabel}
          </span>
        </div>
        <p className="text-slate-500 text-base truncate">{user?.email}</p>
      </div>
    </div>
  );
};
