import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AdminPanel = () => {
  // State for courses data
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("courses");
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    category: "",
    type: "",
    duration: "",
    enrolled: "",
    bannerImage: "",
    recommended: false,
    trending: false,
    mostPurchased: false,
    topRanked: false,
    curriculumPdfUrl: "",
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCourses = localStorage.getItem("coursesData");
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      // Initial dummy data
      const initialCourses = [
        {
          id: "1",
          title: "Introduction to React",
          category: "Software Testing & Programming",
          type: "Online Course",
          duration: "8 Weeks",
          enrolled: "1200 Students",
          bannerImage: "https://source.unsplash.com/random/400x300/?react",
          recommended: true,
          trending: false,
          mostPurchased: true,
          topRanked: false,
          curriculumPdfUrl: "#",
        },
        {
          id: "2",
          title: "Advanced Data Science",
          category: "Data Science, AI & Automation",
          type: "Bootcamp",
          duration: "12 Weeks",
          enrolled: "850 Students",
          bannerImage:
            "https://source.unsplash.com/random/400x300/?datascience",
          recommended: false,
          trending: true,
          mostPurchased: false,
          topRanked: true,
          curriculumPdfUrl: "#",
        },
      ];
      setCourses(initialCourses);
      localStorage.setItem("coursesData", JSON.stringify(initialCourses));
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setHasChanges(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing course
      const updatedCourses = courses.map((course) =>
        course.id === formData.id ? formData : course
      );
      setCourses(updatedCourses);
      localStorage.setItem("coursesData", JSON.stringify(updatedCourses));
    } else {
      // Add new course
      const newCourse = {
        ...formData,
        id: Date.now().toString(),
      };
      const updatedCourses = [...courses, newCourse];
      setCourses(updatedCourses);
      localStorage.setItem("coursesData", JSON.stringify(updatedCourses));
    }

    resetForm();
    setHasChanges(false);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      category: "",
      type: "",
      duration: "",
      enrolled: "",
      bannerImage: "",
      recommended: false,
      trending: false,
      mostPurchased: false,
      topRanked: false,
      curriculumPdfUrl: "",
    });
    setIsEditing(false);
    setCurrentCourse(null);
  };

  // Edit course
  const editCourse = (course) => {
    if (isLocked) return;

    setFormData(course);
    setIsEditing(true);
    setCurrentCourse(course);
  };

  // Delete course
  const deleteCourse = (id) => {
    if (isLocked) return;

    const updatedCourses = courses.filter((course) => course.id !== id);
    setCourses(updatedCourses);
    localStorage.setItem("coursesData", JSON.stringify(updatedCourses));
    if (currentCourse && currentCourse.id === id) {
      resetForm();
    }
  };

  // Save all changes
  const saveChanges = () => {
    // In a real app, this would send data to a backend
    alert("Changes saved successfully!");
    setHasChanges(false);
  };

  // Toggle lock
  const toggleLock = () => {
    setIsLocked(!isLocked);
    if (!isLocked) {
      resetForm();
    }
  };

  // Categories for dropdown
  const categories = [
    "All Courses",
    "Data Science, AI & Automation",
    "Software Testing & Programming",
    "Cloud & DevOps",
    "Management & Business",
    "Marketing & Soft Skills",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Course Management Admin Panel
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={toggleLock}
              className={`px-4 py-2 rounded-md font-medium ${
                isLocked
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {isLocked ? "Unlock Editing" : "Lock Editing"}
            </button>
            <button
              onClick={saveChanges}
              disabled={!hasChanges}
              className={`px-4 py-2 rounded-md font-medium ${
                hasChanges
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save All Changes
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("courses")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "courses"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "categories"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "settings"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === "courses" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {isEditing ? "Edit Course" : "Add New Course"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        disabled={isLocked}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        disabled={isLocked}
                      >
                        <option value="">Select a category</option>
                        {categories
                          .filter((cat) => cat !== "All Courses")
                          .map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Type
                      </label>
                      <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        disabled={isLocked}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        disabled={isLocked}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Enrolled
                      </label>
                      <input
                        type="text"
                        name="enrolled"
                        value={formData.enrolled}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        disabled={isLocked}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Banner Image URL
                      </label>
                      <input
                        type="text"
                        name="bannerImage"
                        value={formData.bannerImage}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        disabled={isLocked}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Curriculum PDF URL
                      </label>
                      <input
                        type="text"
                        name="curriculumPdfUrl"
                        value={formData.curriculumPdfUrl}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        disabled={isLocked}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="recommended"
                          checked={formData.recommended}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          disabled={isLocked}
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                          Recommended
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="trending"
                          checked={formData.trending}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          disabled={isLocked}
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                          Trending
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="mostPurchased"
                          checked={formData.mostPurchased}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          disabled={isLocked}
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                          Most Purchased
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="topRanked"
                          checked={formData.topRanked}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          disabled={isLocked}
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                          Top Ranked
                        </label>
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-2">
                      <button
                        type="submit"
                        disabled={isLocked}
                        className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                          isLocked
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        }`}
                      >
                        {isEditing ? "Update Course" : "Add Course"}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        disabled={isLocked}
                        className={`py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 ${
                          isLocked
                            ? "bg-gray-100 cursor-not-allowed"
                            : "bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Courses List */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    All Courses
                  </h2>
                  <p className="text-sm text-gray-500">
                    {courses.length} courses
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {courses.map((course) => (
                        <tr key={course.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-md"
                                  src={course.bannerImage}
                                  alt={course.title}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {course.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {course.type}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {course.recommended && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Recommended
                                </span>
                              )}
                              {course.trending && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Trending
                                </span>
                              )}
                              {course.mostPurchased && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  Popular
                                </span>
                              )}
                              {course.topRanked && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                  Top Ranked
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => editCourse(course)}
                              disabled={isLocked}
                              className={`mr-3 ${
                                isLocked
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-indigo-600 hover:text-indigo-900"
                              }`}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteCourse(course.id)}
                              disabled={isLocked}
                              className={`${
                                isLocked
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-red-600 hover:text-red-900"
                              }`}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === "categories" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Manage Categories
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <h3 className="text-md font-medium text-gray-700 mb-2">
                    Current Categories
                  </h3>
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {categories
                      .filter((cat) => cat !== "All Courses")
                      .map((category, index) => (
                        <li
                          key={index}
                          className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        >
                          <div className="w-0 flex-1 flex items-center">
                            <span className="ml-2 flex-1 w-0 truncate">
                              {category}
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <button
                              disabled={isLocked}
                              className={`font-medium ${
                                isLocked
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-indigo-600 hover:text-indigo-500"
                              }`}
                            >
                              Edit
                            </button>
                            <button
                              disabled={isLocked}
                              className={`ml-3 font-medium ${
                                isLocked
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-red-600 hover:text-red-500"
                              }`}
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-2">
                    Add New Category
                  </h3>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                      placeholder="Category name"
                      disabled={isLocked}
                    />
                    <button
                      disabled={isLocked}
                      className={`inline-flex items-center px-3 rounded-r-md border border-l-0 ${
                        isLocked
                          ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                          : "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                      }`}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-4">Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  Export/Import Data
                </h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      const dataStr = JSON.stringify(courses, null, 2);
                      const dataUri =
                        "data:application/json;charset=utf-8," +
                        encodeURIComponent(dataStr);
                      const exportFileDefaultName = "courses-data.json";

                      const linkElement = document.createElement("a");
                      linkElement.setAttribute("href", dataUri);
                      linkElement.setAttribute(
                        "download",
                        exportFileDefaultName
                      );
                      linkElement.click();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Export to JSON
                  </button>
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Import from JSON
                    <input
                      id="fileInput"
                      type="file"
                      className="hidden"
                      accept=".json"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            try {
                              const jsonData = JSON.parse(event.target.result);
                              setCourses(jsonData);
                              localStorage.setItem(
                                "coursesData",
                                JSON.stringify(jsonData)
                              );
                              alert("Data imported successfully!");
                            } catch (error) {
                              alert("Error parsing JSON file");
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  Reset Data
                </h3>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to reset all data to default?"
                      )
                    ) {
                      const defaultCourses = [
                        {
                          id: "1",
                          title: "Introduction to React",
                          category: "Software Testing & Programming",
                          type: "Online Course",
                          duration: "8 Weeks",
                          enrolled: "1200 Students",
                          bannerImage:
                            "https://source.unsplash.com/random/400x300/?react",
                          recommended: true,
                          trending: false,
                          mostPurchased: true,
                          topRanked: false,
                          curriculumPdfUrl: "#",
                        },
                        {
                          id: "2",
                          title: "Advanced Data Science",
                          category: "Data Science, AI & Automation",
                          type: "Bootcamp",
                          duration: "12 Weeks",
                          enrolled: "850 Students",
                          bannerImage:
                            "https://source.unsplash.com/random/400x300/?datascience",
                          recommended: false,
                          trending: true,
                          mostPurchased: false,
                          topRanked: true,
                          curriculumPdfUrl: "#",
                        },
                      ];
                      setCourses(defaultCourses);
                      localStorage.setItem(
                        "coursesData",
                        JSON.stringify(defaultCourses)
                      );
                      resetForm();
                    }
                  }}
                  className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
