
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    category: "News",
    date: "30 March 2024",
    title: "Revitalizing Workplace Morale: Innovative Tactics For Boosting Employee Engagement In 2024",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    category: "Blog",
    date: "30 March 2024",
    title: "How To Avoid The Top Six Most Common Job Interview Mistakes",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
  },
];

const NewsAndBlog = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div className="space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A]">
            News and Blog
          </h2>
          <p className="text-slate-500 max-w-xl">
            Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed tristique in dolor
          </p>
        </div>
        <Link to="#" className="text-[#3BA59C] font-bold text-lg hover:underline flex items-center gap-1 self-start cursor-pointer">
          View all
        </Link>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {blogPosts.map((post) => (
          <div key={post.id} className="group cursor-pointer">
        
            <div className="relative overflow-hidden rounded-2xl mb-6 aspect-16/10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            
              <div className="absolute top-6 left-6">
                <span className="bg-[#3BA59C] text-white text-sm font-semibold px-5 py-2 rounded-xl">
                  {post.category}
                </span>
              </div>
            </div>

           
            <div className="space-y-4">
              <p className="text-slate-400 font-medium">{post.date}</p>
              <h3 className="text-2xl font-bold text-[#0F172A] leading-tight group-hover:text-[#3BA59C] transition-colors">
                {post.title}
              </h3>
              <button className="flex items-center gap-2 text-[#3BA59C] font-bold group-hover:gap-3 transition-all">
                Read more <ArrowRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsAndBlog;