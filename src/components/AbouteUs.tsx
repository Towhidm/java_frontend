import {
  UserPlus,
  FileUp,
  Search,
  Briefcase,
  CheckCircle2,
  Play,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

const AboutUs = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 text-emerald-500" />,
      title: "Create Account",
      desc: "Register with name, email, password, and choose Job Seeker or Employer.",
    },
    {
      icon: <Search className="w-8 h-8 text-emerald-500" />,
      title: "Complete Profile",
      desc: "Seekers add education, skills, and resume. Employers add company details.",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-emerald-500" />,
      title: "Post or Apply",
      desc: "Employers post jobs with required skills. Seekers apply with PDF and cover letter.",
    },
    {
      icon: <FileUp className="w-8 h-8 text-emerald-500" />,
      title: "Interview & Review",
      desc: "Shortlist applicants, schedule interviews, and leave seeker or employer reviews.",
    },
  ];

  const faqs = [
    {
      id: "01",
      question: "Can I upload a CV?",
      answer:
        "Yes. Job seekers upload a PDF resume on the Profile page. It is stored on the server and can be reused when applying, or you can upload a new PDF per application.",
    },
    {
      id: "02",
      question: "Do I need a company profile to post jobs?",
      answer:
        "Yes. Employers must complete company name, location, and details before posting a job.",
    },
    {
      id: "03",
      question: "How does shortlisting and interviews work?",
      answer:
        "Employers view applicants, shortlist them, then schedule an interview with date, time, and a meeting link. Seekers see this under My Applications.",
    },
    {
      id: "04",
      question: "Are category filters available yet?",
      answer:
        "Browse-by-category cards are marked Upcoming. For now, search all jobs from the Jobs page or the home search bar.",
    },
  ];

  const highlightCards = [
    "Register once, then finish your role-specific profile on the dashboard.",
    "Live counts on the homepage reflect jobs, seekers, and companies in your database.",
    "Applications, interviews, and reviews follow JobPortal’s normalized data model.",
  ];

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <div className="bg-black py-20 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white">About JobPortal</h1>
        <p className="text-slate-400 mt-4 max-w-xl mx-auto px-4">
          A full-stack job board for seekers and employers — profiles, applications, interviews, and reviews.
        </p>
      </div>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Connect talent with hiring teams in one workflow
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            JobPortal lets employers create company profiles and post openings with required skills.
            Job seekers upload resumes, apply with a cover letter, track pending or shortlisted status,
            join scheduled interviews, and share reviews — all backed by your MySQL database.
          </p>
        </div>
        <div className="relative w-full h-112.5 rounded-3xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
            alt="Team collaborating"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">How it works</h2>
          <p className="text-gray-500 mb-16">
            Four steps matching how this project is built
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 flex justify-center transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-emerald-600">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="relative rounded-[40px] overflow-hidden">
          <div className="relative h-100 md:h-137.5 flex flex-col items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
              alt="Workspace"
            />
            <div className="relative z-10 text-center text-white px-4 pb-20 md:pb-0">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Play fill="white" size={24} className="ml-1" />
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Hire Smarter.
                <br />
                Apply with Confidence.
              </h2>
              <p className="text-slate-300 mt-4 text-sm">(Illustration — no video yet)</p>
            </div>

            <div className="hidden md:flex absolute bottom-4 left-0 w-full px-8 justify-center gap-4 lg:gap-6 z-20">
              {highlightCards.map((text, idx) => (
                <div
                  key={idx}
                  className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl w-full max-w-[320px] flex items-start gap-4"
                >
                  <div className="bg-emerald-500/20 text-emerald-400 w-10 h-10 rounded-lg flex items-center justify-center font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium leading-relaxed">{text}</p>
                    <Link to="/register" className="text-emerald-400 text-xs font-bold mt-2 hover:underline inline-block">
                      Get started
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden bg-black p-8 space-y-8">
            {highlightCards.map((text, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-emerald-500/20 text-emerald-500 w-10 h-10 rounded-lg flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{text}</p>
                  <Link to="/register" className="text-emerald-500 text-xs font-bold mt-1 inline-block">
                    Get started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-500 mb-16">
          Answers based on how JobPortal works today
        </p>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="border border-slate-200 rounded-2xl p-6 hover:bg-emerald-50/50 transition group"
            >
              <summary className="flex items-center gap-6 cursor-pointer list-none">
                <span className="text-emerald-500 font-bold text-lg">{faq.id}</span>
                <h3 className="font-semibold text-lg flex-1 group-hover:text-emerald-700">
                  {faq.question}
                </h3>
                <div className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-400 group-hover:border-emerald-500 group-hover:text-emerald-500">
                  <Plus size={18} />
                </div>
              </summary>
              <p className="mt-4 pl-14 text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative h-112.5 w-full">
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400"
            className="absolute top-0 left-0 w-1/2 h-64 object-cover rounded-3xl shadow-lg z-20"
            alt="Professional interview"
          />
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=400"
            className="absolute top-10 right-0 w-1/2 h-56 object-cover rounded-3xl shadow-md z-10"
            alt="Meeting"
          />
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-48 object-cover rounded-3xl shadow-xl z-30 border-8 border-white"
            alt="Office culture"
          />
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What JobPortal Delivers</h2>
          <p className="text-gray-500 mb-10 text-lg">
            Real hiring flows for this project — not placeholder marketing claims.
          </p>
          <div className="grid grid-cols-2 gap-y-6">
            <div className="flex items-center gap-3 font-semibold">
              <CheckCircle2 className="text-emerald-500" /> Live job listings
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <CheckCircle2 className="text-emerald-500" /> Company profiles
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <CheckCircle2 className="text-emerald-500" /> Resume applications
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <CheckCircle2 className="text-emerald-500" /> Interviews & reviews
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Guides & Blog</h2>
          <Link to="/blog" className="text-emerald-600 font-bold hover:underline">
            View all articles
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
              <div className="rounded-4xl overflow-hidden mb-6 h-72 shadow-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-4 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-emerald-600 transition-colors">
                {post.title}
              </h3>
              <span className="flex items-center text-emerald-600 font-bold gap-2">
                Read More <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
