import { useState, useEffect } from "react";
import {
  FiSave,
  FiTrash2,
  FiEdit2,
  FiPlus,
  FiLock,
  FiUnlock,
} from "react-icons/fi";
import { FiX, FiCheck } from "react-icons/fi";

const AdminPanel = () => {
  // State for all blog posts
  const [blogs, setBlogs] = useState([]);
  // State for form inputs
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    image: "",
    tags: [],
    newTag: "",
    createdAt: new Date().toISOString().slice(0, 10),
  });
  // State for UI
  const [isEditing, setIsEditing] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [activeSection, setActiveSection] = useState("posts");
  const [settings, setSettings] = useState({
    siteTitle: "Refer Me Group Blog",
    siteDescription:
      "Expert insights, career tips, and emerging trends to guide your professional journey.",
    primaryColor: "#7C3AED",
    secondaryColor: "#F5F3FF",
    accentColor: "#4F46E5",
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsRes = await fetch("http://localhost:5000/api/blogs");
        const blogsData = await blogsRes.json();
        setBlogs(blogsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle tag addition
  const handleAddTag = () => {
    if (
      formData.newTag.trim() &&
      !formData.tags.includes(formData.newTag.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: "",
      }));
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      _id: "",
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      author: "",
      image: "",
      tags: [],
      newTag: "",
      createdAt: new Date().toISOString().slice(0, 10),
    });
    setIsEditing(false);
    setIsLocked(false);
  };

  // Create new blog post
  const handleCreate = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const newBlog = await res.json();
      setBlogs([...blogs, newBlog]);
      resetForm();
    } catch (err) {
      console.error("Error creating blog:", err);
    }
  };

  // Update blog post
  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/blogs/${formData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const updatedBlog = await res.json();
      setBlogs(
        blogs.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog))
      );
      resetForm();
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  // Delete blog post
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
      if (formData._id === id) resetForm();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  // Edit blog post
  const handleEdit = (blog) => {
    setFormData({
      _id: blog._id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content || "",
      category: blog.category,
      author: blog.author,
      image: blog.image,
      tags: blog.tags || [],
      newTag: "",
      createdAt:
        blog.createdAt?.slice(0, 10) || new Date().toISOString().slice(0, 10),
    });
    setIsEditing(true);
    setIsLocked(false);
  };

  // Handle settings change
  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save settings
  const saveSettings = async () => {
    try {
      await fetch("http://localhost:5000/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });
      alert("Settings saved successfully!");
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-800">
            Refer Me Blog Admin
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={saveSettings}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              <FiSave className="mr-2" />
              Save All Changes
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 h-fit">
            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveSection("posts")}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeSection === "posts"
                        ? "bg-purple-100 text-purple-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Blog Posts
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection("settings")}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeSection === "settings"
                        ? "bg-purple-100 text-purple-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Site Settings
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection("appearance")}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeSection === "appearance"
                        ? "bg-purple-100 text-purple-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Appearance
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Panel */}
          <div className="flex-1">
            {activeSection === "posts" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Form Section */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
                    </h2>
                    <button
                      onClick={() => setIsLocked(!isLocked)}
                      className="text-gray-500 hover:text-purple-600"
                      title={isLocked ? "Unlock form" : "Lock form"}
                    >
                      {isLocked ? <FiUnlock size={20} /> : <FiLock size={20} />}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        disabled={isLocked}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        disabled={isLocked}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        disabled={isLocked}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Author
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        disabled={isLocked}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Featured Image URL
                      </label>
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        disabled={isLocked}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Publish Date
                      </label>
                      <input
                        type="date"
                        name="createdAt"
                        value={formData.createdAt}
                        onChange={handleChange}
                        disabled={isLocked}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Excerpt
                      </label>
                      <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        disabled={isLocked}
                        rows="2"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        disabled={isLocked}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              disabled={isLocked}
                              className="ml-1 text-gray-500 hover:text-red-500"
                            >
                              <FiX size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex">
                        <input
                          type="text"
                          value={formData.newTag}
                          onChange={(e) =>
                            setFormData({ ...formData, newTag: e.target.value })
                          }
                          disabled={isLocked}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Add new tag"
                        />
                        <button
                          type="button"
                          onClick={handleAddTag}
                          disabled={isLocked || !formData.newTag.trim()}
                          className="px-3 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 disabled:bg-purple-300"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    {isEditing && (
                      <button
                        onClick={resetForm}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={isEditing ? handleUpdate : handleCreate}
                      disabled={isLocked}
                      className={`px-4 py-2 rounded-md text-white ${
                        isLocked
                          ? "bg-purple-300"
                          : "bg-purple-600 hover:bg-purple-700"
                      }`}
                    >
                      {isEditing ? "Update Post" : "Create Post"}
                    </button>
                  </div>
                </div>

                {/* Blog List Section */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    All Blog Posts
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Author
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {blogs.map((blog) => (
                          <tr key={blog._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {blog.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {blog.slug}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                {blog.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {blog.author}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {blog.createdAt?.slice(0, 10)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleEdit(blog)}
                                className="text-purple-600 hover:text-purple-900 mr-3"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                onClick={() => handleDelete(blog._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <FiTrash2 />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "settings" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Site Settings
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Site Title
                    </label>
                    <input
                      type="text"
                      name="siteTitle"
                      value={settings.siteTitle}
                      onChange={handleSettingsChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Site Description
                    </label>
                    <textarea
                      name="siteDescription"
                      value={settings.siteDescription}
                      onChange={handleSettingsChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Header Text
                    </label>
                    <input
                      type="text"
                      name="headerText"
                      value={settings.headerText || ""}
                      onChange={handleSettingsChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Footer Text
                    </label>
                    <input
                      type="text"
                      name="footerText"
                      value={settings.footerText || ""}
                      onChange={handleSettingsChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={saveSettings}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            )}

            {activeSection === "appearance" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Appearance Settings
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Color
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        name="primaryColor"
                        value={settings.primaryColor}
                        onChange={handleSettingsChange}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        {settings.primaryColor}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Secondary Color
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        name="secondaryColor"
                        value={settings.secondaryColor}
                        onChange={handleSettingsChange}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        {settings.secondaryColor}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Accent Color
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        name="accentColor"
                        value={settings.accentColor}
                        onChange={handleSettingsChange}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        {settings.accentColor}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preview
                    </label>
                    <div className="p-4 rounded-lg border border-gray-200">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px]">
                          <div
                            className="h-12 rounded-md mb-2"
                            style={{ backgroundColor: settings.primaryColor }}
                          ></div>
                          <p className="text-sm text-center text-gray-600">
                            Primary
                          </p>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                          <div
                            className="h-12 rounded-md mb-2"
                            style={{ backgroundColor: settings.secondaryColor }}
                          ></div>
                          <p className="text-sm text-center text-gray-600">
                            Secondary
                          </p>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                          <div
                            className="h-12 rounded-md mb-2"
                            style={{ backgroundColor: settings.accentColor }}
                          ></div>
                          <p className="text-sm text-center text-gray-600">
                            Accent
                          </p>
                        </div>
                      </div>

                      <div
                        className="mt-6 p-4 rounded-md"
                        style={{ backgroundColor: settings.secondaryColor }}
                      >
                        <h3
                          className="text-lg font-semibold mb-2"
                          style={{ color: settings.primaryColor }}
                        >
                          Sample Heading
                        </h3>
                        <p className="text-gray-700 mb-3">
                          This is a sample paragraph showing how text might
                          appear with these colors.
                        </p>
                        <button
                          className="px-4 py-2 rounded-md text-white"
                          style={{ backgroundColor: settings.primaryColor }}
                        >
                          Sample Button
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={saveSettings}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Save Appearance
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
