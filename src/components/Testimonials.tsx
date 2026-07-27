import { Avatar, Rate, Grid } from 'antd';
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const { useBreakpoint } = Grid;

const testimonialsData = [
  {
    id: 1,
    rating: 5,
    title: "Profile + apply in one place",
    feedback:
      "I registered as a job seeker, added education and skills, uploaded my PDF resume, and applied with a cover letter. Tracking pending vs shortlisted status is straightforward.",
    author: "Sample Seeker",
    designation: "Demo testimonial (illustrative)",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    rating: 5,
    title: "Easy to post and shortlist",
    feedback:
      "After completing the company profile I could post jobs with required skills, open applicants, view CVs, and shortlist candidates for interviews.",
    author: "Sample Employer",
    designation: "Demo testimonial (illustrative)",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    rating: 5,
    title: "Interviews & reviews",
    feedback:
      "Scheduling an interview with date, time, and meeting link — then leaving a review — matches how JobPortal is designed end to end.",
    author: "Sample User",
    designation: "Demo testimonial (illustrative)",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const TestimonialsSection = () => {
  const screens = useBreakpoint();

  const sectionPadding = screens.md ? '100px 50px' : '60px 20px';
  const avatarSize = screens.sm ? 56 : 48;

  return (
    <section 
      className="bg-[#EBF7F6]"
      style={{ padding: sectionPadding }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-5 leading-tight">
            What Users Say About JobPortal
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Illustrative examples based on real features in this project (profiles, applications, interviews). Not live customer quotes.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonialsData.map((test) => (
            <motion.div 
              key={test.id} 
              className="group relative bg-white rounded-[2.5rem] p-10 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300"
              variants={cardVariants}
            >
              <div>
                <Rate disabled defaultValue={test.rating} className="text-[#FBBF24] text-xl mb-6" />
                <h3 className="text-2xl font-bold text-[#0F172A] mb-5 leading-snug">
                  {test.title}
                </h3>
                <p className="text-slate-500 leading-relaxed italic text-base">
                  &ldquo;{test.feedback}&rdquo;
                </p>
              </div>

              <div className="flex items-end justify-between mt-10">
                <div className="flex items-center gap-4">
                  <Avatar size={avatarSize} src={test.avatar} alt={test.author} className="shadow-inner" />
                  <div>
                    <h4 className="text-lg font-bold text-[#0F172A]">{test.author}</h4>
                    <p className="text-slate-400 text-sm font-medium">{test.designation}</p>
                  </div>
                </div>

                <svg width="34" height="24" viewBox="0 0 34 24" fill="none" className="text-[#3BA59C] mb-2">
                  <path d="M14 17.5C14 19.3333 13.52 20.8 12.56 21.9C11.64 22.9667 10.3 23.5 8.54 23.5C6.38 23.5 4.6 22.7 3.2 21.1C1.84 19.4667 1.16 17.1333 1.16 14.1C1.16 10.1 2.36 6.7 4.76 3.9C7.2 1.1 10.38 0 14.3 0V5.6H12.34C11.02 5.6 9.8 6.06667 8.68 7C7.6 7.86667 7.02 9.06667 6.94 10.6C8.26 10.2 9.6 10.1667 10.96 10.5C12.32 10.8333 13.3333 11.5 14 12.5C14 13.5 13.5 14.3 12.5 14.9V15C13.5 15.6 14 16.4333 14 17.5ZM33 17.5C33 19.3333 32.52 20.8 31.56 21.9C30.64 22.9667 29.3 23.5 27.54 23.5C25.38 23.5 23.6 22.7 22.2 21.1C20.84 19.4667 20.16 17.1333 20.16 14.1C20.16 10.1 21.36 6.7 23.76 3.9C26.2 1.1 29.38 0 33.3 0V5.6H31.34C30.02 5.6 28.8 6.06667 27.68 7C26.6 7.86667 26.02 9.06667 25.94 10.6C27.26 10.2 28.6 10.1667 29.96 10.5C31.32 10.8333 32.3333 11.5 33 12.5C33 13.5 32.5 14.3 31.5 14.9V15C32.5 15.6 33 16.4333 33 17.5Z" fill="currentColor"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
