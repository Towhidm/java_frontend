import React from "react";
import HeroBgImage from "../assets/hero-bg.jpg";
import { PiBriefcase } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FiSearch, FiChevronDown } from "react-icons/fi";
//for LogoCloud  component
import Spotify from "../assets/Spotify.png";
import Slack from "../assets/Slack.png";
import Adobe from "../assets/Adobe.png";
import Asana from "../assets/Asana.png";
import Linear from "../assets/Linear.png";

//for catagoryCard component 

import { 
  Sprout, 
  ScrollText, 
  ShoppingBag, 
  HardHat, 
  Palmtree, 
  GraduationCap, 
  Coins, 
  Bus 
} from 'lucide-react';

interface Category {
  id: number;
  title: string;
  count: number;
  icon: React.ReactNode;
}


const HomePageHero: React.FC = () => {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col justify-center text-white pt-20"
      style={{ backgroundImage: `url(${HeroBgImage})` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 text-center w-full">
        <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight max-w-5xl mx-auto">
          Find Your Dream Job Today!
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Connecting Talent with Opportunity: Your Gateway to Career Success
        </p>

        <div className="bg-white p-4 md:p-2 rounded-3xl md:rounded-2xl shadow-2xl max-w-5xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row items-stretch md:items-center">
            <div className="flex-[1.5] flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
              <input
                type="text"
                placeholder="Job Title or Company"
                className="w-full text-black placeholder-gray-400 focus:outline-none bg-transparent"
              />
            </div>

            <div className="flex-1 flex items-center justify-between px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
              <select className="w-full text-black appearance-none focus:outline-none bg-transparent cursor-pointer">
                <option>Select Location</option>
              </select>
              <FiChevronDown className="text-gray-400" />
            </div>

            <div className="flex-1 flex items-center justify-between px-4 py-3 md:mr-2">
              <select className="w-full text-black appearance-none focus:outline-none bg-transparent cursor-pointer">
                <option>Select Category</option>
              </select>
              <FiChevronDown className="text-gray-400" />
            </div>

            <button className="bg-[#00BBA7] hover:bg-[#00a392] text-white flex items-center justify-center gap-2 px-10 py-4 rounded-2xl md:rounded-2xl font-bold transition-all mt-4 md:mt-0 shadow-lg">
              <FiSearch className="text-xl" /> Search Job
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-16 h-16 rounded-full bg-[#00BBA7]/20 flex items-center justify-center border border-[#00BBA7]/30">
              <PiBriefcase className="w-8 h-8 text-[#00BBA7]" />
            </div>
            <div className="text-left">
              <span className="block text-2xl font-bold">25,850</span>
              <span className="text-sm text-gray-400">Jobs</span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-16 h-16 rounded-full bg-[#00BBA7]/20 flex items-center justify-center border border-[#00BBA7]/30">
              <IoIosPeople className="w-8 h-8 text-[#00BBA7]" />
            </div>
            <div className="text-left">
              <span className="block text-2xl font-bold">10,250</span>
              <span className="text-sm text-gray-400">Candidates</span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-16 h-16 rounded-full bg-[#00BBA7]/20 flex items-center justify-center border border-[#00BBA7]/30">
              <HiOutlineBuildingOffice2 className="w-8 h-8 text-[#00BBA7]" />
            </div>
            <div className="text-left">
              <span className="block text-2xl font-bold">18,400</span>
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

export const CategoryCard = () =>{

  const categories: Category[] = [
  { id: 1, title: "Agriculture", count: 1254, icon: <Sprout size={32} strokeWidth={1.5} /> },
  { id: 2, title: "Metal Production", count: 816, icon: <ScrollText size={32} strokeWidth={1.5} /> },
  { id: 3, title: "Commerce", count: 2082, icon: <ShoppingBag size={32} strokeWidth={1.5} /> },
  { id: 4, title: "Construction", count: 1520, icon: <HardHat size={32} strokeWidth={1.5} /> },
  { id: 5, title: "Hotels & Tourism", count: 1022, icon: <Palmtree size={32} strokeWidth={1.5} /> },
  { id: 6, title: "Education", count: 1496, icon: <GraduationCap size={32} strokeWidth={1.5} /> },
  { id: 7, title: "Financial Services", count: 1529, icon: <Coins size={32} strokeWidth={1.5} /> },
  { id: 8, title: "Transport", count: 1244, icon: <Bus size={32} strokeWidth={1.5} /> },
];
return (
    <section className="bg-[#EBF7F6] py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
            Browse by Category
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-lg">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scel...
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group bg-white rounded-2xl py-20 md:p-10 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              {/* Icon Container */}
              <div className="text-[#3BA59C] mb-6 transition-transform duration-300 group-hover:scale-110">
                {cat.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#0F172A] mb-4 text-center">
                {cat.title}
              </h3>

              {/* Job Count Badge */}
              <div className="bg-[#E6F4F2] px-5 py-2 rounded-xl">
                <span className="text-[#3BA59C] text-sm font-semibold">
                  {cat.count} jobs
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

}

export const CompanyInfo = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 space-y-24">
      
      {/* Upper Section: About Us */}
      <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Image Box */}
        <div className="w-full lg:w-1/2">
          <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
              alt="Office meeting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Box */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-tight">
            Good Life Begins With <br /> A Good Company
          </h2>
          <p className="text-slate-500 leading-relaxed text-lg">
            Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas 
            amet faucibus tempor blandit. Elit velit mauris aliquam est diam. Leo sagittis 
            consectetur diam morbi erat aenean. Vulputate praesent congue faucibus in 
            euismod feugiat euismod volutpat.
          </p>
          <div className="flex items-center gap-8 pt-4">
            <button className="bg-[#3BA59C] hover:bg-[#2d817a] text-white font-bold py-3.5 px-8 rounded-xl transition-all active:scale-95">
              Search Job
            </button>
            <button className="text-[#3BA59C] font-bold border-b-2 border-transparent hover:border-[#3BA59C] transition-all">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* Middle Section: Statistics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        {[
          { label: "12k+", title: "Clients worldwide", color: "text-[#3BA59C]" },
          { label: "20k+", title: "Active resume", color: "text-[#3BA59C]" },
          { label: "18k+", title: "Companies", color: "text-[#3BA59C]" },
        ].map((stat, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className={`${stat.color} text-4xl font-bold`}>{stat.label}</h3>
            <h4 className="text-xl font-bold text-[#0F172A]">{stat.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. 
              Blandit a massa elementum id scelerisque...
            </p>
          </div>
        ))}
      </section>

      {/* Lower Section: Wide CTA Banner */}
      <section className="relative overflow-hidden bg-[#020617] rounded-2xl min-h-100 flex items-center p-8 md:p-20">
        {/* Background Overlay Image (Blurred/Darkened) */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200" 
            alt="People working"
            className="w-full h-full object-cover blur-sm"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-lg space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Create A Better <br /> Future For Yourself
          </h2>
          <p className="text-slate-300">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. 
            Blandit a massa elementum id scelerisque rhoncus.
          </p>
          <button className="bg-[#3BA59C] hover:bg-[#2d817a] text-white font-bold py-3.5 px-8 rounded-xl transition-all active:scale-95">
            Search Job
          </button>
        </div>
      </section>

    </div>
  );
};