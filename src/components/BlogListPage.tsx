import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

const BlogListPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">JobPortal Blog</h1>
      <p className="text-slate-500 max-w-2xl mb-12">
        Guides based on this project’s real features: profiles, resumes, applications, interviews, and reviews.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {blogPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-[#3BA59C] font-semibold">{post.category}</span>
                <span className="text-slate-400">{post.date}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] group-hover:text-[#3BA59C] transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">{post.summary}</p>
              <span className="inline-flex items-center gap-2 text-[#3BA59C] font-bold">
                Read full article <ArrowRight size={18} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogListPage;
