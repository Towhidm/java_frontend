import { useAuth } from "../../context/AuthContext";
import { User } from "lucide-react";

export const ProfileHeader = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-emerald-50 flex flex-col md:flex-row items-center gap-8 animate-in fade-in slide-in-from-top duration-700">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#00BC7D] shadow-lg bg-[#EBF7F6] flex items-center justify-center">
        <User size={56} className="text-[#00BC7D]" />
      </div>

      <div className="text-center md:text-left flex-1">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
          <h1 className="text-3xl font-extrabold text-slate-900">{user?.name}</h1>
          <span className="bg-[#00BC7D]/10 text-[#00BC7D] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {user?.role}
          </span>
        </div>
        <p className="text-slate-500 font-medium">{user?.email}</p>
      </div>
    </div>
  );
};
