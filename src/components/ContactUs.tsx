import { Phone, Mail, Clock, MapPin } from "lucide-react";
import dribble from "../assets/dribble.png";
import tinder from "../assets/tinder.png";
import zoom from "../assets/zoom.png";
import asana from "../assets/asaana.png";

const ContactUs = () => {
  const contactDetails = [
    {
      icon: <Phone className="text-emerald-500 w-6 h-6" />,
      title: "Call for inquiry",
      value: "+880 1XXX-XXXXXX (demo)",
    },
    {
      icon: <Mail className="text-emerald-500 w-6 h-6" />,
      title: "Send us email",
      value: "support@jobportal.local (demo)",
    },
    {
      icon: <Clock className="text-emerald-500 w-6 h-6" />,
      title: "Opening hours",
      value: "Mon - Fri: 10AM - 6PM",
    },
    {
      icon: <MapPin className="text-emerald-500 w-6 h-6" />,
      title: "Office",
      value: "Dhaka, Bangladesh (demo address)",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* --- Page Header --- */}
      <div className="bg-black py-20 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Contact Us
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* --- Left Column: Content & Details --- */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-center">
              Questions about JobPortal?
            </h2>
            <p className="text-gray-500 mb-12 text-lg text-center">
              Reach out about accounts, applications, or posting jobs. Contact details below are sample/demo placeholders for this project.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-6">
              {contactDetails.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center sm:items-start sm:text-left gap-3"
                >
                  <div className="mb-1">{item.icon}</div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- Right Column: Contact Form --- */}
          <div className="bg-slate-50 p-8 md:p-12 rounded-4xl shadow-sm">
            <h3 className="text-2xl font-bold text-center mb-2">
              Contact Info
            </h3>
            <p className="text-center text-gray-500 mb-8 text-sm">
              Form is UI-only for now — it does not send messages yet.
            </p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">First Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full p-4 rounded-xl border border-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Last Name</label>
                  <input
                    type="text"
                    placeholder="Your last name"
                    className="w-full p-4 rounded-xl border border-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="Your E-mail address"
                  className="w-full p-4 rounded-xl border border-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Message</label>
                <textarea
                  rows={4}
                  placeholder="Your message..."
                  className="w-full p-4 rounded-xl border border-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-emerald-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* --- Map Section --- */}
        <div className="mt-24 rounded-[40px] overflow-hidden h-112.5 shadow-lg grayscale hover:grayscale-0 transition-all duration-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4470.011860515344!2d91.9690241649405!3d22.461497412027406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad2fca34ae5549%3A0x35c88a37b3e90e97!2sChittagong%20University%20of%20Engineering%20and%20Technology%20(CUET)!5e0!3m2!1sen!2sus!4v1773251450105!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>

        {/* --- Partners/Logos Section --- */}
        <div className="mt-20 flex flex-wrap justify-center md:justify-between items-center gap-10 md:gap-12">
          {/* 1. Create an array of your local image paths. 
      2. If your images are in the 'public' folder, use /logo-name.png
  */}
          {[
            { name: "Zoom", src: zoom },
            { name: "Tinder", src: tinder },
            { name: "Dribbble", src: dribble },
            { name: "Asana", src: asana },
          ].map((partner, index) => (
            <div
              key={index}
              className="w-32 md:w-40 h-12 flex items-center justify-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
            >
              <img
                src={partner.src}
                alt={`${partner.name} logo`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
