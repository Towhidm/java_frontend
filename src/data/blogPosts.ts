export type BlogPost = {
  id: number;
  slug: string;
  category: string;
  date: string;
  title: string;
  summary: string;
  image: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "how-to-apply-on-jobportal",
    category: "Guide",
    date: "27 July 2026",
    title: "How to Apply for Jobs on JobPortal as a Job Seeker",
    summary:
      "A practical walkthrough of registering, completing your profile, uploading a resume, and applying with a cover letter.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    content: [
      "JobPortal is built for real hiring workflows. As a job seeker, start by creating an account with your name, email, password, and the Job Seeker role.",
      "After login you are taken to your Profile. Complete education and skills — these are saved in the job_seeker and job_seeker_skill tables. Upload a PDF resume; it is stored on the server under uploads/cv/ and linked from your profile.",
      "Browse openings on the Jobs page. Open a job detail, click Apply, then use your saved resume or upload a new PDF for that application. You can also add a cover letter.",
      "Track status under My Applications (pending or shortlisted). If an employer schedules an interview, you will see the date, time, and meeting link. After that, you can leave a seeker review about the experience.",
    ],
  },
  {
    id: 2,
    slug: "employer-guide-post-jobs-shortlist",
    category: "Guide",
    date: "27 July 2026",
    title: "Employer Guide: Company Profile, Job Posts, Interviews & Reviews",
    summary:
      "How employers set company details, post jobs with required skills, shortlist applicants, and schedule interviews.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    content: [
      "Register with the Employer role, then open Profile. Fill company name, location, and details. This writes to company_name_location and employer tables — required before you can post a job.",
      "Use Post a Job to add title, category, type, salary, location, qualification, and required skills. Skills are stored in job_skill_required, linked to your employer account.",
      "From Posted Jobs, open Applicants to view CV PDFs, cover letters, and shortlist candidates. Shortlisted applications can get an interview with date, time, and a Zoom (or other) link.",
      "Employers can leave an employer review for an application. Together with seeker reviews, this mirrors the normalized review tables in your database design.",
    ],
  },
];

export const getBlogBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
