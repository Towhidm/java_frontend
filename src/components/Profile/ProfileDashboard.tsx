import { CheckCircle, PlusCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ProfileHeader } from "./ProfileHeader";
import { AppliedJobs } from "./AppliedJobs";
import { SavedJobs } from "./SavedJobs";
import { PostedJobs } from "./PostedJobs";
import { useNavigate } from "react-router-dom";

export const ProfileDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role;

  return (
    <div className="min-h-screen bg-[#EBF7F6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ProfileHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {userRole === "JOBSEEKER" ? (
              <>
                <AppliedJobs />
                <SavedJobs />
              </>
            ) : (
              <>
                <PostedJobs />
                <SavedJobs />
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {userRole === "EMPLOYER" && (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 animate-in zoom-in duration-300">
                <h3 className="font-bold text-xl mb-4">Recruitment</h3>
                <button
                  onClick={() => navigate("/JobPost")} 
                  className="w-full bg-[#00BC7D] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all active:scale-95 shadow-md shadow-emerald-200"
                >
                  <PlusCircle size={20} />
                  Post a New Job
                </button>
                <p className="text-xs text-slate-400 mt-3 text-center">
                  Reach thousands of qualified candidates today.
                </p>
              </div>
            )}

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-4">Account Status</h3>
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <CheckCircle size={20} /> Verified Account
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
