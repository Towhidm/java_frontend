import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axiosInstance";
import Skeleton_component from "./Skeleton/Skeleton";
import { useNavigate } from "react-router-dom";
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

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/SingleJob/${jobId}`);
        setJob(res.data.job);
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 bg-white">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-10 gap-6">
        <div className="flex gap-4 md:gap-5 items-center w-full md:w-auto">
          <div className="hidden lg:flex lg:mt-10 lg:w-20 lg:h-20 lg:rounded-full lg:bg-[#EAF5F3] lg:items-center lg:justify-center lg:shrink-0">
            <Briefcase className="text-[#3BA59C]" size={32} />
          </div>
          <div className="grow">
            <div className="flex items-center justify-between gap-3 relative">
              <span className="bg-[#EAF5F3] text-[#3BA59C] text-[16px] md:text-xs px-3 py-1 rounded-lg tracking-wide">
                Open Role
              </span>
            </div>
            <div className="w-16 h-16 mt-10 rounded-full bg-[#EAF5F3] flex items-center justify-center shrink-0 lg:hidden">
              <Briefcase className="text-[#3BA59C]" size={28} />
            </div>
            <h1 className="text-2xl md:text-4xl font-semibold text-slate-900 mt-2 leading-tight">
              {job.title}
            </h1>
            <p className="text-slate-500 md:text-lg mt-2">{job.companyName}</p>
            <div className="lg:hidden flex flex-col gap-y-4 gap-x-8 py-8 lborder-b border-slate-100">
              <InfoItem icon={<Briefcase size={20} />} text={job.category} />
              <InfoItem icon={<Clock size={20} />} text={job.jobType} />
              <InfoItem icon={<Wallet size={20} />} text={job.salary} />
              <InfoItem icon={<MapPin size={20} />} text={job.location} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* RIGHT SIDEBAR - Appears FIRST on Mobile (order-1), SECOND on Desktop (order-2) */}
        <div className="order-1 lg:order-2 space-y-6">
          <button
            className={`w-full py-3 rounded-xl font-semibold text-lg cursor-pointer
    ${
      user?.role ==="JOBSEEKER"
        ? "bg-[#309689] text-white hover:bg-[#2d817a] shadow-lg shadow-teal-100 transition-all active:scale-95"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
            onClick={() => navigate(`/jobs/apply/${job._id}`)}
            disabled={user?.role !== "JOBSEEKER"}
          >
            Apply Job
          </button>

          {/* Job Overview Card */}
          <div className="bg-[#EBF5F4] p-6 md:p-8 rounded-3xl border border-slate-50">
            <h3 className="text-xl font-bold mb-8 text-slate-800">
              Job Overview
            </h3>
            <div className="grid grid-cols-1 gap-y-7">
              <OverviewItem
                icon={<User size={20} />}
                label="Job Title"
                value={job.title}
              />
              <OverviewItem
                icon={<Clock size={20} />}
                label="Job Type"
                value={job.jobType}
              />
              <OverviewItem
                icon={<Briefcase size={20} />}
                label="Category"
                value={job.category}
              />
              <OverviewItem
                icon={<Award size={20} />}
                label="Qualification"
                value={job.qualification || job.degree || "—"}
              />
              <OverviewItem
                icon={<GraduationCap size={20} />}
                label="Skills"
                value={(job.skills || []).join(", ") || "—"}
              />
              <OverviewItem
                icon={<Wallet size={20} />}
                label="Offered Salary"
                value={job.salary}
              />
              <OverviewItem
                icon={<MapPin size={20} />}
                label="Location"
                value={job.location}
              />
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200">
              <img
                src="https://api.maptiler.com/maps/basic-v2/static/-74.006,40.7128,12/400x250.png?key=get_your_own_key"
                alt="map"
                className="w-full h-40 object-cover opacity-80"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#EBF5F4] p-6 md:p-8 rounded-3xl border border-slate-50">
            <h3 className="text-xl font-bold mb-6 text-slate-800">
              Send Us Message
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Full name"
                className="w-full p-4 rounded-xl border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#3BA59C] bg-white transition-all"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 rounded-xl border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#3BA59C] bg-white transition-all"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-4 rounded-xl border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#3BA59C] bg-white transition-all"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full p-4 rounded-xl border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#3BA59C] bg-white transition-all"
              ></textarea>
              <button className="w-full bg-[#3BA59C] text-white py-4 rounded-xl font-bold hover:bg-[#2d817a] transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* LEFT CONTENT - Appears SECOND on Mobile (order-2), FIRST on Desktop (order-1) */}
        <div className="order-2 lg:order-1 lg:col-span-2 space-y-12">
          {/* Quick Info Bar - Now inside the top card area on mobile, above desc */}
          <div className="hidden lg:flex lg:flex-wrap lg:gap-y-4 lg:gap-x-8 lg:border-b lg:border-slate-100">
            <InfoItem icon={<Briefcase size={20} />} text={job.category} />
            <InfoItem icon={<Clock size={20} />} text={job.jobType} />
            <InfoItem icon={<Wallet size={20} />} text={job.salary} />
            <InfoItem icon={<MapPin size={20} />} text={job.location} />
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-slate-900">
              Job Description
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
              {job.description}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-slate-900">
              Professional Skills
            </h2>
            <ul className="space-y-4">
              {(job.skills?.length ? job.skills : []).map((skill, i) => (
                <li
                  key={i}
                  className="flex gap-4 items-start text-slate-600 text-[17px]"
                >
                  <Check size={20} className="text-[#3BA59C] mt-1 shrink-0" />{" "}
                  {skill}
                </li>
              ))}
              {!job.skills?.length && (
                <li className="text-slate-500">No skills listed.</li>
              )}
            </ul>
          </section>

          {/* Social Share */}
          <div className="flex items-center gap-6 pt-8 border-t border-slate-100">
            <span className="font-bold text-slate-900">Share Job:</span>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin].map((Icon, idx) => (
                <button
                  key={idx}
                  className="p-3 bg-slate-50 text-slate-600 rounded-full hover:bg-[#3BA59C] hover:text-white transition-all shadow-sm"
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components for better readability
const InfoItem = ({ icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-2.5 text-slate-500 font-medium shrink-0">
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
  <div className="flex gap-5 items-start">
    <div className="text-[#3BA59C] p-1 bg-white rounded-lg shadow-sm border border-slate-50">
      {icon}
    </div>
    <div>
      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-slate-800 font-bold leading-tight">{value}</p>
    </div>
  </div>
);

export default JobDetails;
