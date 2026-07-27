import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/axiosInstance";
import Skeleton_component from "./Skeleton/Skeleton";
import { useAuth } from "../context/AuthContext";
import {
  Briefcase,
  Clock,
  Wallet,
  MapPin,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  User,
  GraduationCap,
  Award,
  MessageSquare,
} from "lucide-react";
import { message } from "antd";

interface Job {
  _id: string;
  title: string;
  companyName: string;
  description: string;
  skills: string[];
  category: string;
  jobType: string;
  location: string;
  salary: string;
  degree?: string;
  qualification?: string;
}

interface CompanyReview {
  _id: string;
  comment: string;
  seekerName: string;
}

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [companyReviews, setCompanyReviews] = useState<CompanyReview[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const [jobRes, reviewsRes] = await Promise.all([
          api.get(`/jobs/SingleJob/${jobId}`),
          api.get(`/jobs/${jobId}/company-reviews`).catch(() => ({ data: { reviews: [] } })),
        ]);
        setJob(jobRes.data.job);
        setCompanyReviews(reviewsRes.data.reviews || []);
        setCompanyName(reviewsRes.data.companyName || jobRes.data.job?.companyName || "");
      } catch {
        message.error("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    if (jobId) fetchJob();
  }, [jobId]);

  if (loading)
    return (
      <div className="w-full flex items-center justify-center">
        <div className="flex mt-40 justify-center min-h-screen container">
          <Skeleton_component />
        </div>
      </div>
    );
  if (!job)
    return (
      <div className="p-20 text-center font-medium text-red-500">
        Job not found.
      </div>
    );

  const canApply = user?.role === "JOBSEEKER";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6 pb-6 border-b border-slate-100">
        <div className="flex gap-4 items-start w-full">
          <div className="hidden sm:flex w-14 h-14 rounded-full bg-[#EAF5F3] items-center justify-center shrink-0">
            <Briefcase className="text-[#3BA59C]" size={24} />
          </div>
          <div className="grow min-w-0">
            <span className="inline-block bg-[#EAF5F3] text-[#3BA59C] text-xs font-semibold px-2.5 py-1 rounded-md">
              Open Role
            </span>
            <h1 className="text-lg md:text-xl font-semibold text-slate-900 mt-2 leading-snug">
              {job.title}
            </h1>
            <p className="text-slate-500 text-sm mt-1">{job.companyName}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
              <InfoItem icon={<Briefcase size={16} />} text={job.category} />
              <InfoItem icon={<Clock size={16} />} text={job.jobType} />
              <InfoItem icon={<Wallet size={16} />} text={job.salary} />
              <InfoItem icon={<MapPin size={16} />} text={job.location} />
            </div>
          </div>
        </div>
        <button
          type="button"
          className={`w-full md:w-auto shrink-0 px-8 py-2.5 rounded-lg font-semibold text-sm cursor-pointer transition-all
            ${
              canApply
                ? "bg-[#309689] text-white hover:bg-[#2d817a] active:scale-95"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          onClick={() => navigate(`/jobs/apply/${job._id}`)}
          disabled={!canApply}
        >
          Apply Job
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
        <div className="lg:col-span-2 space-y-10 order-2 lg:order-1">
          <section>
            <h2 className="text-lg font-bold mb-3 text-slate-900">Job Description</h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
              {job.description ||
                `${job.title} at ${job.companyName}. Location: ${job.location}. Type: ${job.jobType}. Salary: ${job.salary}.`}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3 text-slate-900">Required Skills</h2>
            <ul className="space-y-2.5">
              {(job.skills?.length ? job.skills : []).map((skill, i) => (
                <li key={i} className="flex gap-3 items-start text-slate-600 text-sm">
                  <Check size={16} className="text-[#3BA59C] mt-0.5 shrink-0" />
                  {skill}
                </li>
              ))}
              {!job.skills?.length && (
                <li className="text-slate-500 text-sm">No skills listed.</li>
              )}
            </ul>
          </section>

          <section className="border-t border-slate-100 pt-8">
            <h2 className="text-lg font-bold mb-2 text-slate-900 flex items-center gap-2">
              <MessageSquare size={20} className="text-[#3BA59C]" />
              Reviews from job seekers
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              What other job seekers said about hiring with{" "}
              <span className="font-medium text-slate-700">{companyName || job.companyName}</span>.
              Read these before you apply.
            </p>
            {companyReviews.length === 0 ? (
              <p className="text-slate-400 text-sm bg-slate-50 rounded-lg p-4">
                No seeker reviews for this company yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {companyReviews.map((review) => (
                  <li
                    key={review._id}
                    className="bg-slate-50 border border-slate-100 rounded-xl p-4"
                  >
                    <p className="text-slate-700 text-base leading-relaxed">“{review.comment}”</p>
                    <p className="text-slate-400 text-sm mt-2">— {review.seekerName}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
            <span className="font-semibold text-sm text-slate-900">Share Job:</span>
            <div className="flex gap-2">
              {[Facebook, Twitter, Linkedin].map((Icon, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="p-2 bg-slate-50 text-slate-600 rounded-full hover:bg-[#3BA59C] hover:text-white transition-all"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-5">
          <div className="bg-[#EBF5F4] p-5 md:p-6 rounded-2xl border border-slate-50">
            <h3 className="text-base font-bold mb-5 text-slate-800">Job Overview</h3>
            <div className="grid grid-cols-1 gap-y-5">
              <OverviewItem icon={<User size={16} />} label="Job Title" value={job.title} />
              <OverviewItem icon={<Clock size={16} />} label="Job Type" value={job.jobType} />
              <OverviewItem icon={<Briefcase size={16} />} label="Category" value={job.category} />
              <OverviewItem
                icon={<Award size={16} />}
                label="Qualification"
                value={job.qualification || job.degree || "—"}
              />
              <OverviewItem
                icon={<GraduationCap size={16} />}
                label="Skills"
                value={(job.skills || []).join(", ") || "—"}
              />
              <OverviewItem icon={<Wallet size={16} />} label="Offered Salary" value={job.salary} />
              <OverviewItem icon={<MapPin size={16} />} label="Location" value={job.location} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium shrink-0">
    <div className="text-[#3BA59C]">{icon}</div>
    <span>{text}</span>
  </div>
);

const OverviewItem = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex gap-3 items-start">
    <div className="text-[#3BA59C] p-1 bg-white rounded-md shadow-sm border border-slate-50">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-slate-800 text-sm font-medium leading-snug break-words">{value}</p>
    </div>
  </div>
);

export default JobDetails;
