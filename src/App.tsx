//internal imports
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./components/loginPage";
import { Route, Routes } from "react-router-dom";
import HomePageHero, {
  CategoryCard,
  CompanyInfo,
  LogoCloud,
} from "./components/HomePage";
import RegisterForm from "./components/RegisterPage";
import Navbar from "./components/Navbar";
import JobPost from "./components/JobPost";
import ApplyJob from "./components/ApplyJob";
import Jobs from "./components/Job";
import TestimonialsSection from "./components/Testimonials";
import NewsAndBlog from "./components/NewsAndBlog";
import Footer from "./components/Footer";
import JobDetails from "./components/JobDetails";
import AboutUs from "./components/AbouteUs";
import ContactUs from "./components/ContactUs";
import { ProfileDashboard } from "./components/Profile/ProfileDashboard";
import JobApplicants from "./components/Profile/Applicants";
import JobPage from "./components/JobPage";
import TodosPage from "./pages/TodosPage";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar isHomePage={true} />
              <HomePageHero />
              <LogoCloud />
              <Jobs />
              <CategoryCard />
              <CompanyInfo />
              <TestimonialsSection />
              <NewsAndBlog />
              <Footer />
            </>
          }
        />
        <Route
          path="/jobs"
          element={
            <>
              <Navbar isHomePage={false} />
              <JobPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/jobdetails/:jobId"
          element={
            <>
              <Navbar isHomePage={false} /> <JobDetails /> <Footer />
            </>
          }
        />
        <Route
          path="/about-us"
          element={
            <>
              <Navbar isHomePage={false} /> <AboutUs /> <Footer />
            </>
          }
        />
        <Route
          path="/contactus"
          element={
            <>
              <Navbar isHomePage={false} /> <ContactUs /> <Footer />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<ProfileDashboard />} />
        <Route path="/applicants/:jobId" element={<JobApplicants />} />
        <Route path="/jobpost" element={<JobPost />} />
        <Route path="jobs/apply/:jobId" element={<ApplyJob />} />
        <Route path="/todos" element={<TodosPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
