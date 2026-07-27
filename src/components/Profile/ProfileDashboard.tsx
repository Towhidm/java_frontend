import { useAuth } from "../../context/AuthContext";
import { ProfileHeader } from "./ProfileHeader";
import { AppliedJobs } from "./AppliedJobs";
import { PostedJobs } from "./PostedJobs";
import { JobSeekerProfile } from "./JobSeekerProfile";
import { EmployerProfile } from "./EmployerProfile";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Briefcase, FileText, Building2, Home } from "lucide-react";

export const ProfileDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role;
  const isSeeker = userRole === "JOBSEEKER";

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 text-base">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="mb-2 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-[#3BA59C] mb-1">
              Account
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              {isSeeker ? "Job Seeker Dashboard" : "Employer Dashboard"}
            </h1>
            <p className="text-slate-500 text-base mt-2">
              {isSeeker
                ? "Manage education, skills, resume, and applications."
                : "Manage company details, job posts, and applicants."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 self-start px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-base font-medium hover:border-[#3BA59C] hover:text-[#3BA59C] transition-colors"
          >
            <Home size={18} />
            Home
          </button>
        </div>

        <ProfileHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {isSeeker ? (
              <>
                <JobSeekerProfile />
                <AppliedJobs />
              </>
            ) : (
              <>
                <EmployerProfile />
                <PostedJobs />
              </>
            )}
          </div>

          <aside className="space-y-4">
            {userRole === "EMPLOYER" && (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={20} className="text-[#3BA59C]" />
                  <h3 className="text-xl font-semibold text-slate-900">Recruitment</h3>
                </div>
                <button
                  onClick={() => navigate("/jobpost")}
                  className="w-full bg-[#3BA59C] hover:bg-[#2d817a] text-white py-3 rounded-lg font-medium text-base flex items-center justify-center gap-2 transition-colors"
                >
                  <PlusCircle size={18} />
                  Post a New Job
                </button>
                <p className="text-sm text-slate-400 mt-3 text-center leading-relaxed">
                  Complete your company profile before posting jobs.
                </p>
                <button
                  onClick={() => navigate("/jobs")}
                  className="w-full mt-3 border border-slate-200 hover:border-[#3BA59C] hover:text-[#3BA59C] text-slate-700 py-2.5 rounded-lg font-medium text-base flex items-center justify-center gap-2 transition-colors"
                >
                  <Briefcase size={18} />
                  View Jobs Board
                </button>
              </div>
            )}

            {isSeeker && (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <FileText size={20} className="text-[#3BA59C]" />
                  <h3 className="text-xl font-semibold text-slate-900">Quick tip</h3>
                </div>
                <p className="text-base text-slate-500 leading-relaxed">
                  Your profile resume is public. When you apply, upload a separate CV — only that job’s employer can open it.
                </p>
                <button
                  onClick={() => navigate("/jobs")}
                  className="w-full border border-slate-200 hover:border-[#3BA59C] hover:text-[#3BA59C] text-slate-700 py-2.5 rounded-lg font-medium text-base flex items-center justify-center gap-2 transition-colors"
                >
                  <Briefcase size={18} />
                  Browse Jobs
                </button>
              </div>
            )}

            <div className="bg-[#E6F4F2]/60 p-6 rounded-xl border border-[#3BA59C]/15">
              <h3 className="font-semibold text-slate-900 text-base mb-2">Profile checklist</h3>
              <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                {isSeeker ? (
                  <>
                    <li>Add education & skills</li>
                    <li>Upload resume (PDF)</li>
                    <li>Apply and track status</li>
                  </>
                ) : (
                  <>
                    <li>Set company name & location</li>
                    <li>Post jobs with skills</li>
                    <li>Shortlist & schedule interviews</li>
                  </>
                )}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
