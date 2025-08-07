import {
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiMapPin,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width <= 884); // Tablet range
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define all paths in a central configuration
  const paths = {
    home: "/",
    story: "/about/history",
    whatWeDo: "/whatwedo",
    team: "/meet-our-team",
    paymentPolicy: "/payment-policy",
    jobs: "/jobs",
    career: "/career",
    contact: "/contact-us",
    dataScience: "/courses/data-science",
    cybersecurity: "/courses/cybersecurity",
    dataAnalytics: "/courses/data-analytics",
    aiMl: "/courses/ai-ml",
    cloudComputing: "/courses/cloud-computing",
    blockchain: "/courses/blockchain",
    courseInfo: "/resources/course-info",
    tutorials: "/resources/tutorials",
    interviewQuestions: "/resources/interview-questions",
    practiceTests: "/resources/practice-tests",
    masterClasses: "/resources/master-classes",
    blogs: "/resources/blogs",
    liveVirtual: "/offerings/live-virtual",
    classroom: "/offerings/classroom",
    agileServices: "/offerings/agile-services",
    referEarn: "/offerings/refer-earn",
    corporateTraining: "/offerings/corporate-training",
    schoolTraining: "/offerings/school-training",
    industrialTraining: "/offerings/industrial-training",
    itTraining: "/offerings/it-training",
    technology: "/categories/technology",
    business: "/categories/business",
    marketing: "/categories/marketing",
    design: "/categories/design",
    becomeInstructor: "/partners/become-instructor",
    hireFromUs: "/partners/hire-from-us",
    trainingPartner: "/partners/training-partner",
    affiliates: "/partners/affiliates",
    privacyPolicy: "/legal/privacy-policy",
    termsConditions: "/legal/terms-conditions",
    refundPolicy: "/legal/refund-policy",
    cookiesPolicy: "/legal/cookies-policy",
    faqs: "/support/faqs",
    sitemap: "/sitemap",
    prince2: "/certifications/prince2",
    devops: "/certifications/devops",
    pythonDs: "/certifications/python-data-science",
    fullstack: "/certifications/fullstack",
    frontend: "/certifications/frontend",
    python: "/certifications/python",
  };

  // Define link groups with their corresponding paths
  const quickLinks = [
    { text: "Home", path: "/" },
    { text: "Our Story", path: "/about/history" },
    { text: "What we do", path: "/about/whatwedo" },
    { text: "Meet Our Team", path: "/about/team" },
    { text: "Payment Policy", path: "/about/paymentpolicy" },
    { text: "Career", path: "/career" },
    { text: "Contact Us", path: "/contact" },
    { text: "Admin Login", path: "/login" },
  ];

  const courses = [
    { text: "Data Science Course", path: "courses/data-science" },
    { text: "AI for Leaders", path: "courses/ai-for-leaders" },
    {
      text: "Advanced Data Science Course",
      path: "courses/advanced-data-science",
    },
    { text: "Tosca Automation", path: "courses/tosca-automation" },
    { text: "Business Analyst Course", path: "courses/business-analyst" },
    {
      text: "Business Analyst With Tools Course",
      path: "courses/business-analyst-tools",
    },
    { text: "Program Manager Course", path: "courses/program-manager" },
    { text: "Digital Marketing Course", path: "courses/digital-marketing" },
    { text: "AI Automation Course", path: "courses/ai-automation" },
    { text: "Product Management Course", path: "courses/product-management" },
    { text: "Advanced Automation Course", path: "courses/advance-automation" },
    { text: "Power Automate Course", path: "courses/power-automate" },
    { text: "UiPath Course", path: "courses/uipath" },
    {
      text: "Agile Project Manager Course",
      path: "courses/agile-project-manager",
    },
    { text: "Capital Market Course", path: "courses/capital-market" },
    {
      text: "Cloud Engg. Azure DevOps",
      path: "courses/cloud-engineering-azure-devops",
    },
    { text: "Selenium Using AI Course", path: "courses/selenium-ai" },
    { text: "Core Java Course", path: "courses/core-java" },
    {
      text: "API Automation with AI Integration Course",
      path: "courses/api-automation-ai",
    },
    {
      text: "Cypress with TypeScript and AI-Driven Framework",
      path: "courses/cypress-typescript-ai",
    },
    {
      text: "Cloud Engineering with AWS DevOps",
      path: "courses/cloud-engineering-aws-devops",
    },
  ];

  const resources = [
    { text: "Course Info", path: paths.courseInfo },
    { text: "Tutorials", path: paths.tutorials },
    { text: "Interview Questions", path: paths.interviewQuestions },
    { text: "Practice Tests", path: paths.practiceTests },
    { text: "Master Classes", path: paths.masterClasses },
    { text: "Blogs", path: paths.blogs },
  ];

  const offerings = [
    { text: "Live virtual (online)", path: paths.liveVirtual },
    { text: "Classroom", path: paths.classroom },
    { text: "Agile Services", path: paths.agileServices },
    { text: "Refer & Earn", path: paths.referEarn },
    { text: "Corporate Training", path: paths.corporateTraining },
    { text: "School Training", path: paths.schoolTraining },
    { text: "Industrial Training", path: paths.industrialTraining },
    { text: "IT Training", path: paths.itTraining },
  ];

  const topCategories = [
    { text: "Technology", path: paths.technology },
    { text: "Business", path: paths.business },
    { text: "Marketing", path: paths.marketing },
    { text: "Design", path: paths.design },
    { text: "Data Science", path: paths.dataScience },
    { text: "Cybersecurity", path: paths.cybersecurity },
    { text: "AI & Machine Learning", path: paths.aiMl },
    { text: "Cloud", path: paths.cloudComputing },
  ];

  const partners = [
    { text: "Become an instructor", path: paths.becomeInstructor },
    { text: "Hire from Us", path: paths.hireFromUs },
    { text: "Become a Training Partner", path: paths.trainingPartner },
    { text: "Affiliates", path: paths.affiliates },
  ];

  const certifications = [
    { text: "PRINCE2 Certification", path: paths.prince2 },
    { text: "DevOps Foundation Certification", path: paths.devops },
    { text: "Data Science with Python Certification", path: paths.pythonDs },
    { text: "Full-Stack Development Bootcamp", path: paths.fullstack },
    { text: "Front-End Development Bootcamp", path: paths.frontend },
    { text: "Python Certification Training", path: paths.python },
  ];

  const supportLegal = [
    { text: "Privacy Policy", path: paths.privacyPolicy },
    { text: "Terms & Conditions", path: paths.termsConditions },
    { text: "Refund Policy", path: paths.refundPolicy },
    { text: "Cookies Policy", path: paths.cookiesPolicy },
    { text: "FAQs", path: paths.faqs },
    { text: "Sitemap", path: paths.sitemap },
  ];

  // Updated renderList function to use Link component
  const renderList = (items) =>
    items.map((item, idx) => (
      <li key={idx}>
        <Link
          to={item.path}
          className="group flex items-center gap-2 text-gray-200 hover:text-white transition duration-300 transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:rounded"
        >
          <HiOutlineChevronDoubleRight className="text-indigo-400 group-hover:text-white" />
          <span className="text-sm md:text-base">{item.text}</span>
        </Link>
      </li>
    ));

  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-gray-200 border-t-4 border-orange-500">
        {/* ===== First Footer Section ===== */}
        <div
          className={`max-w-full mx-auto px-4 ${
            isTablet ? "px-6" : "px-12"
          } py-8 grid grid-cols-1 ${
            isTablet ? "md:grid-cols-3" : "md:grid-cols-6"
          } gap-6`}
        >
          {/* Logo & Description - Full width on mobile, 1 column on tablet/desktop */}
          <div className={`${isTablet ? "md:col-span-1" : ""}`}>
            <div className="mb-4">
              <Link
                to="/"
                className="focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              >
                <img
                  src={"/assets/logo/rmg-logo.png"}
                  className={`${isTablet ? "w-32" : "w-36"}`}
                  alt="Refer Me Group Logo"
                />
              </Link>
            </div>
            <p
              className={`${
                isTablet ? "text-xs" : "text-sm"
              } leading-relaxed text-gray-300`}
            >
              We are dedicated to facilitating career advancement and fostering
              professional development. With a wealth of resources and
              initiatives, we strive to empower individuals at every stage of
              their journey.
            </p>
            <div className="flex space-x-4 mt-4">
              {[
                {
                  Icon: FiFacebook,
                  link: "https://www.facebook.com/refermegroup.qa",
                },
                { Icon: FiTwitter, link: "https://www.twitter.com" },
                {
                  Icon: FiLinkedin,
                  link: "https://www.linkedin.com/company/refermegroup/",
                },
                {
                  Icon: FiInstagram,
                  link: "https://www.instagram.com/refermegroup/",
                },
              ].map(({ Icon, link }, index) => (
                <Link
                  key={index}
                  to={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    ["Facebook", "Twitter", "LinkedIn", "Instagram"][index]
                  }
                >
                  <Icon className={`${isTablet ? "w-4 h-4" : "w-5 h-5"}`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links - Full width on mobile, 1 column on tablet/desktop */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg md:text-xl">
              Quick Links
            </h3>
            <ul className="space-y-2">{renderList(quickLinks)}</ul>
          </div>

          {/* Top Courses - Full width on mobile, 2 columns on tablet (spanning 2 cols), 3 columns on desktop (spanning 3 cols) */}
          <div className={`${isTablet ? "md:col-span-2" : "md:col-span-3"}`}>
            <h3 className="text-white font-semibold mb-4 text-lg md:text-xl">
              Top Courses
            </h3>
            <div
              className={`grid ${
                isTablet ? "grid-cols-3" : "grid-cols-3"
              } gap-4`}
            >
              {/* First column */}
              <ul className="space-y-2">{renderList(courses.slice(0, 7))}</ul>

              {/* Second column */}
              <ul className="space-y-2">{renderList(courses.slice(7, 14))}</ul>

              {/* Third column - visible on both tablet and desktop */}
              <ul className="space-y-2">{renderList(courses.slice(14, 21))}</ul>
            </div>
          </div>

          {/* Contact Info - Full width on mobile, 1 column on tablet/desktop */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg md:text-xl">
              Contact Us
            </h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-indigo-400 mt-1 flex-shrink-0" />
                <span className={`${isTablet ? "text-xs" : "text-sm"}`}>
                  Refer Me Group
                  <br />
                  B-225, Aditya Park Town,
                  <br />
                  Ghaziabad (UP) 201002
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-indigo-400 flex-shrink-0" />
                <a
                  href="mailto:contact@refermegroup.com"
                  className={`hover:text-white focus:outline-none focus:underline ${
                    isTablet ? "text-xs" : "text-sm"
                  }`}
                >
                  contact@refermegroup.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-indigo-400 flex-shrink-0" />
                <a
                  href="tel:+917678573511"
                  className={`hover:text-white focus:outline-none focus:underline ${
                    isTablet ? "text-xs" : "text-sm"
                  }`}
                >
                  +91 76785 73511
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`border-t border-indigo-700 py-4 text-center ${
            isTablet ? "text-xs" : "text-sm"
          } text-gray-400 flex flex-col ${
            isTablet ? "md:flex-row" : "md:flex-row"
          } justify-between items-center gap-2 px-4`}
        >
          <div>
            <p>
              © {new Date().getFullYear()} All Copyrights Reserved by Refer Me
              Group
            </p>
          </div>
          <div>
            <p>
              Designed & Developed By{" "}
              <a
                href="https://www.jaikviktechnology.com"
                className="text-indigo-400 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:rounded"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jaikvik Technology India Pvt Ltd
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
