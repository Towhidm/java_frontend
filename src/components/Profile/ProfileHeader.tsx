import { useAuth } from "../../context/AuthContext";
import { User } from "lucide-react";
import UploadProfileImageModal from "./UploadProfileImageModal";
import { useState } from "react";

export const ProfileHeader = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-emerald-50 flex flex-col md:flex-row items-center gap-8 animate-in fade-in slide-in-from-top duration-700">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#00BC7D] shadow-lg">
          <img
            src={
              user?.profileImage?.url ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
            }
            alt="Profile"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <button
          className="absolute bottom-0 right-0 bg-[#00BC7D] text-white p-2 rounded-full shadow-md hover:bg-emerald-600 transition-colors"
          onClick={() => setOpen(true)}
        >
          <User size={16} />
        </button>
      </div>

      <div className="text-center md:text-left flex-1">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
          <h1 className="text-3xl font-extrabold text-slate-900">
            {user?.name}
          </h1>
          <span className="bg-[#00BC7D]/10 text-[#00BC7D] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {user?.role}
          </span>
        </div>
        <p className="text-slate-500 font-medium mb-4">{user?.email}</p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <button
            className="bg-[#00BC7D] text-white px-6 py-2 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
            onClick={() => setOpen(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <UploadProfileImageModal open={open} setOpen={setOpen} />
    </div>
  );
};
