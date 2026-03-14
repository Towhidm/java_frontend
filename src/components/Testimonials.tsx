import { Avatar, Rate, Grid } from 'antd';
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const { useBreakpoint } = Grid;


const testimonialsData = [
  {
    id: 1,
    rating: 5,
    title: "Amazing services",
    feedback: "Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed tristique in dolor. Mus etiam et vestibulum venenatis",
    author: "Marco Kihn",
    designation: "Happy Client",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    rating: 5,
    title: "Everything simple",
    feedback: "Mus etiam et vestibulum venenatis viverra ut. Elit morbi bibendum ullamcorper augue faucibus",
    author: "Kristin Hester",
    designation: "Happy Client",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    rating: 5,
    title: "Awesome, thank you!",
    feedback: "Rhoncus sed tristique in dolor. Mus etiam et vestibulum venenatis viverra ut. Elit morbi bibendum ullamcorper augue faucibus. Nulla et tempor montes",
    author: "Zion Cisneros",
    designation: "Happy Client",
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
      className="bg-[#EBF7F6]" // Mint Green Background
      style={{ padding: sectionPadding }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-5 leading-tight">
            Testimonials from Our Customers
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id...
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Only animate once, when 20% visible
        >
          {testimonialsData.map((test) => (
            <motion.div 
              key={test.id} 
              className="group relative bg-white rounded-[2.5rem] p-10 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300"
              variants={cardVariants}
            >
              <div>
                {/* Ant Design Rate Component */}
                <Rate disabled defaultValue={test.rating} className="text-[#FBBF24] text-xl mb-6" />

                {/* Testimonial Title */}
                <h3 className="text-2xl font-bold text-[#0F172A] mb-5 leading-snug">
                  {test.title}
                </h3>

                {/* Feedback Text */}
                <p className="text-slate-500 leading-relaxed italic text-base">
                  &ldquo;{test.feedback}&rdquo;
                </p>
              </div>

              {/* Author & Quote Container */}
              <div className="flex items-end justify-between mt-10">
                <div className="flex items-center gap-4">
                  {/* Ant Design Avatar */}
                  <Avatar size={avatarSize} src={test.avatar} alt={test.author} className="shadow-inner" />
                  <div>
                    <h4 className="text-lg font-bold text-[#0F172A]">{test.author}</h4>
                    <p className="text-slate-400 text-sm font-medium">{test.designation}</p>
                  </div>
                </div>

                {/* Static SVG Quote Icon (matching teal) */}
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