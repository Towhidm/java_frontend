import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getBlogBySlug, blogPosts } from "../data/blogPosts";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const post = slug ? getBlogBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-slate-500 text-lg">Article not found.</p>
        <Link to="/blog" className="text-[#3BA59C] font-bold hover:underline">
          Back to blog
        </Link>
      </div>
    );
  }

  const other = blogPosts.filter((p) => p.id !== post.id);

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <Link
        to="/blog"
        className="flex w-fit items-center gap-2 text-[#3BA59C] font-semibold text-sm mb-10 hover:underline"
      >
        <ArrowLeft size={16} /> All articles
      </Link>

      <div className="mb-3">
        <span className="inline-block bg-[#E6F4F2] text-[#3BA59C] text-xs font-semibold px-3 py-1 rounded-md">
          {post.category}
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-snug mb-3">
        {post.title}
      </h1>
      <p className="text-slate-400 text-sm mb-8">{post.date}</p>

      <div className="rounded-2xl overflow-hidden mb-10 aspect-video">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed border-l-4 border-[#3BA59C] pl-4">
        {post.summary}
      </p>

      <div className="space-y-6 text-slate-600 leading-relaxed text-[17px]">
        {post.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {other.length > 0 && (
        <div className="mt-16 pt-10 border-t border-slate-100">
          <h2 className="text-xl font-bold text-[#0F172A] mb-4">More guides</h2>
          <ul className="space-y-3">
            {other.map((p) => (
              <li key={p.id}>
                <Link to={`/blog/${p.slug}`} className="text-[#3BA59C] font-semibold hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

export default BlogDetailPage;
