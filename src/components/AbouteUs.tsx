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

const AboutUs = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 text-emerald-500" />,
      title: "Create Account",
      desc: "Sign up and set up your professional profile in minutes.",
    },
    {
      icon: <Search className="w-8 h-8 text-emerald-500" />,
      title: "Find Jobs",
      desc: "Discover opportunities that match your expertise and goals.",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-emerald-500" />,
      title: "Apply Job",
      desc: "Submit your application to top companies with one click.",
    },
    {
      icon: <FileUp className="w-8 h-8 text-emerald-500" />,
      title: "Upload Resume",
      desc: "Showcase your skills by uploading your latest CV or Portfolio.",
    },
  ];

  const faqs = [
    {
      id: "01",
      question: "Can I upload a CV?",
      answer:
        "Yes, you can upload multiple versions of your CV in PDF or Docx format.",
    },
    {
      id: "02",
      question: "How long will the recruitment process take?",
      answer:
        "Timelines vary by company, but typically range from 1 to 4 weeks.",
    },
    {
      id: "04",
      question: "Do you recruit for Graduates, Apprentices and Students?",
      answer:
        "Absolutely! We have dedicated filters for entry-level and internship roles.",
    },
    {
      id: "03",
      question: "What does the recruitment and selection process involve?",
      answer:
        "Usually involves screening, technical assessments, and interviews.",
    },
  ];

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <div className="bg-black py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          About Us
        </h1>
      </div>
      {/* --- Section 1: Intro --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Et nunc ut tempus duis nisi sed massa
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Our platform bridges the gap between ambitious talent and
            industry-leading companies. We provide the tools you need to
            navigate your career path with confidence and ease.
          </p>
        </div>
        <div className="relative w-full h-112.5 rounded-3xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
            alt="Office Team"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* --- Section 2: How It Works --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">How it works</h2>
          <p className="text-gray-500 mb-16">
            Follow these simple steps to get started
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

                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 3: Video CTA --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="relative rounded-[40px] overflow-hidden">
          {/* Upper Video/Image Container */}
          <div className="relative h-100 md:h-137.5 flex flex-col items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
              alt="Workspace"
            />

            {/* Play Button and Heading */}
            <div className="relative z-10 text-center text-white px-4 pb-20 md:pb-0">
              <button className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto hover:scale-110 transition-transform shadow-lg">
                <Play fill="white" size={24} className="ml-1" />
              </button>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Good Life Begins With
                <br />A Good Company
              </h2>
            </div>

            {/* DESKTOP VIEW: Floating Numbered Cards (Hidden on Mobile) */}
            <div className="hidden md:flex absolute bottom-4 left-0 w-full px-8 justify-center gap-4 lg:gap-6 z-20">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl w-full max-w-[320px] flex items-start gap-4"
                >
                  <div className="bg-emerald-500/20 text-emerald-400 w-10 h-10 rounded-lg flex items-center justify-center font-bold shrink-0">
                    {num}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium leading-relaxed">
                      {num === 1 &&
                        "Elit gravida lorem amet porta risus vitae at"}
                      {num === 2 && "Volutpat dui lacus mattis urna platea..."}
                      {num === 3 &&
                        "Elementum faucibus netus gravida lacus lorem"}
                    </p>
                    <button className="text-emerald-400 text-xs font-bold mt-2 hover:underline">
                      Learn more
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE VIEW: Solid Black Bottom Section (Hidden on Desktop) */}
          <div className="md:hidden bg-black p-8 space-y-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-start gap-4">
                <div className="bg-emerald-500/20 text-emerald-500 w-10 h-10 rounded-lg flex items-center justify-center font-bold shrink-0">
                  {num}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {num === 1 &&
                      "Elit gravida lorem amet porta risus vitae at"}
                    {num === 2 && "Volutpat dui lacus mattis urna platea..."}
                    {num === 3 &&
                      "Elementum faucibus netus gravida lacus lorem"}
                  </p>
                  <button className="text-emerald-500 text-xs font-bold mt-1">
                    Learn more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 4: FAQs --- */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-500 mb-16">
          Quick answers to common questions
        </p>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-slate-200 rounded-2xl p-6 hover:bg-emerald-50/50 transition cursor-pointer group"
            >
              <div className="flex items-center gap-6">
                <span className="text-emerald-500 font-bold text-lg">
                  {faq.id}
                </span>
                <h3 className="font-semibold text-lg flex-1 group-hover:text-emerald-700">
                  {faq.question}
                </h3>
                <div className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-400 group-hover:border-emerald-500 group-hover:text-emerald-500">
                  <Plus size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 5: Features (The Collage Layout) --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Overlapping Image Grid */}
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
          <h2 className="text-4xl font-bold mb-6">
            We're Only Working With The Best
          </h2>
          <p className="text-gray-500 mb-10 text-lg">
            We partner with Fortune 500 companies and innovative startups to
            ensure your career move is a step forward in the right direction.
          </p>
          <div className="grid grid-cols-2 gap-y-6">
            <div className="flex items-center gap-3 font-semibold">
              <CheckCircle2 className="text-emerald-500" /> Quality Job
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <CheckCircle2 className="text-emerald-500" /> Top Companies
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <CheckCircle2 className="text-emerald-500" /> Top Talents
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <CheckCircle2 className="text-emerald-500" /> Verified Profiles
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 6: Blog (Dynamic Images) --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">News and Blog</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Blog Post 1 */}
          <div className="group cursor-pointer">
            <div className="rounded-4xl overflow-hidden mb-6 h-72 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
                alt="Workplace Morale"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-4 py-1 rounded-full">
                News
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-600 transition-colors">
              Revitalizing Workplace Morale: Innovative Tactics for 2024
            </h3>
            <button className="flex items-center text-emerald-600 font-bold gap-2">
              Read More <ArrowRight size={18} />
            </button>
          </div>

          {/* Blog Post 2 */}
          <div className="group cursor-pointer">
            <div className="rounded-4xl overflow-hidden mb-6 h-72 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
                alt="Interview Tips"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-4 py-1 rounded-full">
                Blog
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-600 transition-colors">
              How To Avoid The Top Six Most Common Job Interview Mistakes
            </h3>
            <button className="flex items-center text-emerald-600 font-bold gap-2">
              Read More <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
