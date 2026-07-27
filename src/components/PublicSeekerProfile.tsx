import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FileText, GraduationCap, Mail, User, ExternalLink } from "lucide-react";
import { api } from "../api/axiosInstance";

interface PublicSeeker {
  _id: string;
  name: string;
  email: string;
  education?: string;
  skills: string[];
  resume?: string | null;
}

const PublicSeekerProfile = () => {
  const { seekerId } = useParams();
  const [profile, setProfile] = useState<PublicSeeker | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/seekers/${seekerId}`);
        setProfile(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Profile not found");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [seekerId]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
        Loading profile…
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 px-4">
        <p className="text-slate-500">{error || "Profile not found"}</p>
        <Link to="/jobs" className="text-[#3BA59C] font-semibold hover:underline">
          Browse jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-8 border-b border-slate-100 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#E6F4F2] flex items-center justify-center">
            <User size={28} className="text-[#3BA59C]" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#3BA59C] mb-1">
              Public job seeker profile
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{profile.name}</h1>
            <p className="text-slate-500 text-sm flex items-center gap-1.5 mt-1">
              <Mail size={14} /> {profile.email}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
              <GraduationCap size={16} className="text-[#3BA59C]" /> Education
            </h2>
            <p className="text-slate-600">{profile.education || "Not provided"}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-2">Skills</h2>
            {profile.skills?.length ? (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#E6F4F2] text-[#2d817a] text-xs font-semibold px-3 py-1 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No skills listed</p>
            )}
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50 p-5">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
              <FileText size={16} className="text-[#3BA59C]" /> Public resume
            </h2>
            <p className="text-slate-500 text-xs mb-3">
              This resume is part of the public profile. Application CVs uploaded when applying to a job are private to that employer.
            </p>
            {profile.resume ? (
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#3BA59C] font-semibold text-sm hover:underline"
              >
                View resume PDF <ExternalLink size={14} />
              </a>
            ) : (
              <p className="text-amber-700 text-sm">No public resume uploaded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicSeekerProfile;
