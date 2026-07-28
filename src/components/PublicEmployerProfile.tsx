import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Building2, Mail, MapPin, MessageSquare } from "lucide-react";
import { api } from "../api/axiosInstance";

interface SeekerReviewItem {
  _id: string;
  comment: string;
  seekerName?: string;
}

interface PublicEmployer {
  _id: string;
  name: string;
  email: string;
  companyName?: string;
  companyLocation?: string;
  companyDetails?: string;
  seekerReviews?: SeekerReviewItem[];
}

const PublicEmployerProfile = () => {
  const { employerId } = useParams();
  const [profile, setProfile] = useState<PublicEmployer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/employers/${employerId}`);
        setProfile(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Employer not found");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [employerId]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
        Loading company profile…
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 px-4">
        <p className="text-slate-500">{error || "Employer not found"}</p>
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
            <Building2 size={28} className="text-[#3BA59C]" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#3BA59C] mb-1">
              Public employer profile
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              {profile.companyName || profile.name}
            </h1>
            <p className="text-slate-500 text-base mt-1">{profile.name}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2 text-base text-slate-600">
            {profile.email && (
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-[#3BA59C]" /> {profile.email}
              </p>
            )}
            {profile.companyLocation && (
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-[#3BA59C]" /> {profile.companyLocation}
              </p>
            )}
          </div>

          {profile.companyDetails && (
            <div>
              <h2 className="text-base font-semibold text-slate-700 mb-2">About</h2>
              <p className="text-slate-600 text-base leading-relaxed">{profile.companyDetails}</p>
            </div>
          )}

          <div>
            <h2 className="text-base font-semibold text-slate-700 flex items-center gap-2 mb-3">
              <MessageSquare size={16} className="text-[#3BA59C]" /> Reviews from job seekers
            </h2>
            <p className="text-slate-500 text-sm mb-3">
              Public reviews from approved applicants about this employer.
            </p>
            {profile.seekerReviews?.length ? (
              <ul className="space-y-3">
                {profile.seekerReviews.map((review) => (
                  <li key={review._id} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <p className="text-slate-700 text-base leading-relaxed">“{review.comment}”</p>
                    <p className="text-slate-400 text-sm mt-2">— {review.seekerName || "Job seeker"}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-base">No seeker reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicEmployerProfile;
