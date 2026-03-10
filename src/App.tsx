//internal imports
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./components/loginPage";
import { Route, Routes } from "react-router-dom";
import HomePageHero, { CategoryCard, CompanyInfo, LogoCloud } from "./components/HomePage";
import RegisterForm from "./components/RegisterPage";
import Verify_Otp from "./components/Verify_Otp";
import Navbar from "./components/Navbar";
import JobPost from "./components/JobPost";
import ApplyJob from "./components/ApplyJob";
import Jobs from "./components/Job";
import TestimonialsSection from "./components/Testimonials";
import NewsAndBlog from "./components/NewsAndBlog";
import Footer from "./components/Footer";
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
              <LogoCloud/>
              <Jobs/>
              <CategoryCard/>
              <CompanyInfo/>
              <TestimonialsSection/>
              <NewsAndBlog/>
              <Footer/>
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify_otp" element={<Verify_Otp />} />
        <Route path="/JobPost" element={<JobPost />} />
        <Route path="Jobs/apply/:jobId" element={<ApplyJob />} />
        <Route
          path="/Jobs"
          element={
            <>
              <Navbar isHomePage={false} /> <Jobs />
            </>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
