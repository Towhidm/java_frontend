import { useAuth } from "../../context/AuthContext";
import { ProfileHeader } from "./ProfileHeader";
import { AppliedJobs } from "./AppliedJobs";
import { PostedJobs } from "./PostedJobs";
import { JobSeekerProfile } from "./JobSeekerProfile";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

export const ProfileDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role;

  return (
    <div className="min-h-screen bg-[#EBF7F6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ProfileHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {userRole === "JOBSEEKER" ? (
              <>
                <JobSeekerProfile />
                <AppliedJobs />
              </>
            ) : (
              <PostedJobs />
            )}
          </div>

          <div className="space-y-6">
            {userRole === "EMPLOYER" && (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100">
                <h3 className="font-bold text-xl mb-4">Recruitment</h3>
                <button
                  onClick={() => navigate("/jobpost")}
                  className="w-full bg-[#00BC7D] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all active:scale-95 shadow-md shadow-emerald-200"
                >
                  <PlusCircle size={20} />
                  Post a New Job
                </button>
                <p className="text-xs text-slate-400 mt-3 text-center">
                  Creates rows in job and job_skill_required tables.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
