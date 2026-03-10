import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#020617] text-white pt-20 pb-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Brand/About */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Briefcase className="text-[#3BA59C]" size={28} />
              <span className="text-2xl font-bold tracking-tight">Job</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-lg">
              Quis enim pellentesque viverra tellus eget malesuada facilisis. 
              Congue nibh vivamus aliquet nunc mauris d...
            </p>
          </div>

          {/* Column 2: Company Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Company</h3>
            <ul className="space-y-4 text-slate-400 ">
              <li className="hover:text-[#3BA59C] cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-[#3BA59C] cursor-pointer transition-colors">Our Team</li>
              <li className="hover:text-[#3BA59C] cursor-pointer transition-colors">Partners</li>
              <li className="hover:text-[#3BA59C] cursor-pointer transition-colors">For Candidates</li>
              <li className="hover:text-[#3BA59C] cursor-pointer transition-colors">For Employers</li>
            </ul>
          </div>

          {/* Column 3: Job Categories */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Job Categories</h3>
            <ul className="space-y-4 text-slate-400 ">
              <li className="hover:text-[#3BA59C] cursor-pointer transition-colors">Telecommunications</li>
              <li className="hover:text-[#3BA59C] cursor-pointer transition-colors">Hotels & Tourism</li>
              <li className="hover:text-[#3BA59C] cursor-pointer transition-colors">Construction</li>
              <li className="hover:text-[#3BA59C] cursor-pointer transition-colors">Education</li>
              <li className="hover:text-[#3BA59C] cursor-pointer transition-colors">Financial Services</li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Newsletter</h3>
            <p className="text-slate-400">
              Eu nunc pretium vitae platea. Non netus elementum vulputate
            </p>
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-transparent border border-slate-700 rounded-xl py-4 px-6 focus:outline-none focus:border-[#3BA59C] transition-colors"
              />
              <button className="w-full bg-[#3BA59C] hover:bg-[#2d817a] text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98]">
                Subscribe now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <p>© Copyright Job Portal 2024. Designed by Figma.guru</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors border-b border-slate-500 pb-0.5">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors border-b border-slate-500 pb-0.5">Terms & Conditions</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;