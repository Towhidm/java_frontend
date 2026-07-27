import React, { useEffect, useState } from "react";
import HeroBgImage from "../assets/hero-bg.jpg";
import { PiBriefcase } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import Spotify from "../assets/Spotify.png";
import Slack from "../assets/Slack.png";
import Adobe from "../assets/Adobe.png";
import Asana from "../assets/Asana.png";
import Linear from "../assets/Linear.png";
import {
  Sprout,
  ScrollText,
  ShoppingBag,
  HardHat,
  Palmtree,
  GraduationCap,
  Coins,
  Bus,
  Code2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/axiosInstance";

interface Category {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const HomePageHero: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({ jobs: 0, candidates: 0, companies: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await api.get("/stats/overview");
        setStats({
          jobs: data.jobs ?? 0,
          candidates: data.candidates ?? 0,
          companies: data.companies ?? 0,
        });
      } catch {
        // keep zeros if API unavailable
      }
    };
    loadStats();
  }, []);

  const goSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = search.trim();
    navigate(q ? `/jobs?search=${encodeURIComponent(q)}` : "/jobs");
  };

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col justify-center text-white pt-20"
      style={{ backgroundImage: `url(${HeroBgImage})` }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 text-center w-full">
        <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight max-w-5xl mx-auto">
          Find Your Dream Job Today!
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          JobPortal connects job seekers and employers — post jobs, apply with your resume, and manage applications in one place.
        </p>

        <form
          onSubmit={goSearch}
          className="bg-white p-3 md:p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto mb-16 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center"
        >
          <div className="flex-1 flex items-center px-4 py-3">
            <FiSearch className="text-gray-400 mr-3 text-xl shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs by title, skill, or company..."
              className="w-full text-black placeholder-gray-400 focus:outline-none bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="bg-[#00BBA7] hover:bg-[#00a392] text-white flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-lg cursor-pointer"
          >
            Search Jobs
          </button>
        </form>
        <p className="text-sm text-gray-400 -mt-12 mb-16">
          Opens the Jobs page where you can browse and filter openings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-16 h-16 rounded-full bg-[#00BBA7]/20 flex items-center justify-center border border-[#00BBA7]/30">
              <PiBriefcase className="w-8 h-8 text-[#00BBA7]" />
            </div>
            <div className="text-left">
              <span className="block text-2xl font-bold">{stats.jobs}</span>
              <span className="text-sm text-gray-400">Jobs posted</span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-16 h-16 rounded-full bg-[#00BBA7]/20 flex items-center justify-center border border-[#00BBA7]/30">
              <IoIosPeople className="w-8 h-8 text-[#00BBA7]" />
            </div>
            <div className="text-left">
              <span className="block text-2xl font-bold">{stats.candidates}</span>
              <span className="text-sm text-gray-400">Job seekers</span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-16 h-16 rounded-full bg-[#00BBA7]/20 flex items-center justify-center border border-[#00BBA7]/30">
              <HiOutlineBuildingOffice2 className="w-8 h-8 text-[#00BBA7]" />
            </div>
            <div className="text-left">
              <span className="block text-2xl font-bold">{stats.companies}</span>
              <span className="text-sm text-gray-400">Companies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageHero;

export const LogoCloud = () => {
  const logos = [
    { name: "Spotify", src: Spotify },
    { name: "Slack", src: Slack },
    { name: "Adobe", src: Adobe },
    { name: "Asana", src: Asana },
    { name: "Linear", src: Linear },
  ];

  return (
    <section className="bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-8">
          Partner logos (sample / demo)
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:justify-between">
          {logos.map((logo) => (
            <div key={logo.name} className="flex justify-center">
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="h-8 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CategoryCard = () => {
  const categories: Category[] = [
    { id: 1, title: "IT & Software", icon: <Code2 size={32} strokeWidth={1.5} /> },
    { id: 2, title: "Agriculture", icon: <Sprout size={32} strokeWidth={1.5} /> },
    { id: 3, title: "Commerce", icon: <ShoppingBag size={32} strokeWidth={1.5} /> },
    { id: 4, title: "Construction", icon: <HardHat size={32} strokeWidth={1.5} /> },
    { id: 5, title: "Hotels & Tourism", icon: <Palmtree size={32} strokeWidth={1.5} /> },
    { id: 6, title: "Education", icon: <GraduationCap size={32} strokeWidth={1.5} /> },
    { id: 7, title: "Financial Services", icon: <Coins size={32} strokeWidth={1.5} /> },
    { id: 8, title: "Transport", icon: <Bus size={32} strokeWidth={1.5} /> },
    { id: 9, title: "Metal Production", icon: <ScrollText size={32} strokeWidth={1.5} /> },
  ];

  return (
    <section className="bg-[#EBF7F6] py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
            Browse by Category
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-lg">
            Explore career areas on JobPortal. Category filters are coming soon — for now, search all openings on the Jobs page.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative bg-white rounded-2xl py-16 md:p-10 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#0F172A]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                <span className="text-white text-xl font-bold tracking-wide">Upcoming</span>
              </div>
              <div className="text-[#3BA59C] mb-6 transition-transform duration-300 group-hover:scale-110">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] text-center">{cat.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CompanyInfo = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 space-y-24">
      <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="w-full lg:w-1/2">
          <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
              alt="Team collaborating"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
            Built for Job Seekers <br /> & Employers
          </h2>
          <p className="text-slate-500 leading-relaxed text-lg">
            JobPortal is a full-stack job board. Employers create company profiles and post openings.
            Job seekers upload resumes, apply with a cover letter, track application status, and join interviews scheduled by employers.
          </p>
          <div className="flex items-center gap-8 pt-4">
            <Link to="/jobs">
              <button className="bg-[#3BA59C] hover:bg-[#2d817a] text-white font-bold py-3.5 px-8 rounded-xl transition-all active:scale-95 cursor-pointer">
                Browse Jobs
              </button>
            </Link>
            <Link to="/about-us" className="text-[#3BA59C] font-bold border-b-2 border-transparent hover:border-[#3BA59C] transition-all">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        {[
          {
            label: "Apply",
            title: "Upload resume & apply",
            text: "Job seekers save a PDF resume on the server and apply with an optional cover letter.",
          },
          {
            label: "Hire",
            title: "Post jobs & shortlist",
            text: "Employers complete a company profile, post jobs with required skills, and shortlist applicants.",
          },
          {
            label: "Interview",
            title: "Schedule & review",
            text: "Schedule interviews with date, time, and link. Both sides can leave reviews after the process.",
          },
        ].map((stat, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-[#3BA59C] text-4xl font-bold">{stat.label}</h3>
            <h4 className="text-xl font-bold text-[#0F172A]">{stat.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{stat.text}</p>
          </div>
        ))}
      </section>

      <section className="relative overflow-hidden bg-[#020617] rounded-2xl min-h-100 flex items-center p-8 md:p-20">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200"
            alt="People working"
            className="w-full h-full object-cover blur-sm"
          />
        </div>
        <div className="relative z-10 max-w-lg space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Start Your Next <br /> Career Move
          </h2>
          <p className="text-slate-300">
            Create an account, complete your profile, and start posting or applying today — all data is stored in your local MySQL JobPortal database.
          </p>
          <Link to="/register">
            <button className="bg-[#3BA59C] hover:bg-[#2d817a] text-white font-bold py-3.5 px-8 rounded-xl transition-all active:scale-95 cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};
