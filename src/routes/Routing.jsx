// src/routes/Routing.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import AppLayout from "../layout/AppLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Blogs from "../pages/Blogs/Blogs";
import ContactUs from "../pages/Contact/ContactUs";
import Careers from "../pages/Career/Career";
import History from "../pages/About/History";
import Team from "../pages/About/Team";
import Vision from "../pages/About/Vision";
import PaymentPolicy from "../pages/About/PaymentPolicy";
import WhatWeDo from "../pages/About/WhatWeDo";
import CoreComitee from "../pages/About/CoreComitee";
import Freelancing from "../pages/Services/Freelancing";
import PartnershipPrograms from "../pages/Services/PartnershipPrograms";
import AdminLogin from "../admin/adminLogin/AdminLogin";
// import SignUp from "../pages/Signup";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../admin/dashboard/Dashboard";
import AdminProducts from "../admin/products/AdminProducts";
import AdminBlogs from "../admin/blogs/AdminBlogs";
import CourseDetail from "../components/CourseDetail";
import Blog1 from "../pages/Blogs/Blog1";
import Blog2 from "../pages/Blogs/Blog2";
import Blog3 from "../pages/Blogs/Blog3";
import Blog4 from "../pages/Blogs/Blog4";
import Blog5 from "../pages/Blogs/Blog5";
import Blog6 from "../pages/Blogs/Blog6";
import Blog7 from "../pages/Blogs/Blog7";
import Blog8 from "../pages/Blogs/Blog8";
import AddBlog from "../admin/blogs/AddBlog";
import EditBlog from "../admin/blogs/EditBlog";
import Webinars from "../pages/Services/Webinars";
import WebinarDetail from "../pages/Services/WebinarDetail";
import Studentdashboard from "../admin/dashboard/Studentdashboard";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated"); // Check authentication status

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to AdminLogin if not authenticated
  }

  return children;
};

// Admin Route Wrapper
const AdminRoutes = () => (
  <ProtectedRoute>
    <AdminLayout />
  </ProtectedRoute>
);

// Student Route Wrapper
const StudentRoutes = () => (
  <ProtectedRoute>
    <AdminLayout />
  </ProtectedRoute>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },

      {
        path: "about",
        children: [
          { index: true, element: <About /> },
          { path: "history", element: <History /> },
          { path: "team", element: <Team /> },
          { path: "vision", element: <Vision /> },
          { path: "paymentpolicy", element: <PaymentPolicy /> },
          { path: "whatwedo", element: <WhatWeDo /> },
          { path: "corecomitee", element: <CoreComitee /> },
        ],
      },

      {
        path: "services",
        children: [
          { path: "webinars", element: <Webinars /> },
          { path: "partnership-programs", element: <PartnershipPrograms /> },
          { path: "freelancing", element: <Freelancing /> },
        ],
      },
      { path: "/webinars/:id", element: <WebinarDetail /> },
      {
        path: "blogs",
        children: [
          { index: true, element: <Blogs /> },
          { path: "The-Future-of-Data-Science", element: <Blog1 /> },
          { path: "Mastering-Agile", element: <Blog2 /> },
          { path: "Azure-DevOps-vs-AWS", element: <Blog3 /> },
          {
            path: "Automation-Testing-with-Selenium-and-AI",
            element: <Blog4 />,
          },
          { path: "Business-Analysis-in-the-Digital-Age", element: <Blog5 /> },
          { path: "Power-Automate-for-Beginners", element: <Blog6 /> },
          {
            path: "Core-Java-Concepts-Every-Developer-Should-Master",
            element: <Blog7 />,
          },
          { path: "Digital-Marketing-Strategies-for-2024", element: <Blog8 /> },
        ],
      },

      { path: "contact", element: <ContactUs /> },
      { path: "career", element: <Careers /> },
      { path: "login", element: <AdminLogin /> },
      // { path: "signup", element: <SignUp /> },s
      { path: "courses/:courseId", element: <CourseDetail /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminRoutes />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "blogs", element: <AdminBlogs /> },
      {
        path: "addBlog",
        element: <AddBlog />,
      },
      {
        path: "editBlog",
        element: <EditBlog />,
      },
      { path: "*", element: <h2>Admin 404 page!</h2> },
    ],
  },

  {
    path: "/student",
    element: <StudentRoutes />,
    children: [
      { index: true, element: <Studentdashboard /> },
      { path: "*", element: <h2>Admin 404 page!</h2> },
    ],
  },

  {
    path: "*",
    element: <h2>404 page!</h2>,
  },
]);

const Routing = () => {
  return <RouterProvider router={router} />;
};

export default Routing;
