import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

const NewsAndBlog = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
            News and Blog
          </h2>
          <p className="text-slate-500 max-w-xl">
            Practical guides for using JobPortal — written for job seekers and employers on this platform.
          </p>
        </div>
        <Link
          to="/blog"
          className="text-[#3BA59C] font-bold text-lg hover:underline flex items-center gap-1 self-start cursor-pointer"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {blogPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="group cursor-pointer block">
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
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-snug group-hover:text-[#3BA59C] transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{post.summary}</p>
              <span className="flex items-center gap-2 text-[#3BA59C] font-bold group-hover:gap-3 transition-all">
                Read more <ArrowRight size={20} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewsAndBlog;
