import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  FiHome,
  FiSettings,
  FiUsers,
  FiFileText,
  FiImage,
  FiLink,
  FiLock,
  FiSave,
  FiEdit,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";

// Main Admin Panel Component
const AdminPanel = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [saved, setSaved] = useState(false);

  // Save all changes
  const handleSaveAll = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    // Here you would typically send data to backend
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-purple-800 text-white shadow-lg">
          <div className="p-4 border-b border-purple-700">
            <h1 className="text-xl font-bold">Refer Me Admin</h1>
            <p className="text-purple-200 text-sm">Content Management System</p>
          </div>

          <nav className="mt-4">
            <Link
              to="/"
              className={`flex items-center px-4 py-3 ${
                activeTab === "dashboard"
                  ? "bg-purple-700"
                  : "hover:bg-purple-700"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <FiHome className="mr-3" /> Dashboard
            </Link>

            <Link
              to="/content"
              className={`flex items-center px-4 py-3 ${
                activeTab === "content"
                  ? "bg-purple-700"
                  : "hover:bg-purple-700"
              }`}
              onClick={() => setActiveTab("content")}
            >
              <FiFileText className="mr-3" /> Page Content
            </Link>

            <Link
              to="/media"
              className={`flex items-center px-4 py-3 ${
                activeTab === "media" ? "bg-purple-700" : "hover:bg-purple-700"
              }`}
              onClick={() => setActiveTab("media")}
            >
              <FiImage className="mr-3" /> Media
            </Link>

            <Link
              to="/links"
              className={`flex items-center px-4 py-3 ${
                activeTab === "links" ? "bg-purple-700" : "hover:bg-purple-700"
              }`}
              onClick={() => setActiveTab("links")}
            >
              <FiLink className="mr-3" /> Links
            </Link>

            <Link
              to="/users"
              className={`flex items-center px-4 py-3 ${
                activeTab === "users" ? "bg-purple-700" : "hover:bg-purple-700"
              }`}
              onClick={() => setActiveTab("users")}
            >
              <FiUsers className="mr-3" /> Users
            </Link>

            <Link
              to="/settings"
              className={`flex items-center px-4 py-3 ${
                activeTab === "settings"
                  ? "bg-purple-700"
                  : "hover:bg-purple-700"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              <FiSettings className="mr-3" /> Settings
            </Link>
          </nav>

          <div className="absolute bottom-0 w-64 p-4 bg-purple-900">
            <button
              onClick={() => setIsLocked(!isLocked)}
              className={`flex items-center w-full px-3 py-2 rounded ${
                isLocked ? "bg-purple-700" : "bg-gray-700"
              } text-white`}
            >
              <FiLock className="mr-2" />
              {isLocked ? "Unlock Panel" : "Lock Panel"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "content" && "Page Content Management"}
              {activeTab === "media" && "Media Library"}
              {activeTab === "links" && "Links Management"}
              {activeTab === "users" && "User Management"}
              {activeTab === "settings" && "Settings"}
            </h2>

            <div className="flex items-center space-x-4">
              {saved && (
                <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm">
                  Changes saved successfully!
                </span>
              )}
              <button
                onClick={handleSaveAll}
                className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                disabled={isLocked}
              >
                <FiSave className="mr-2" /> Save All
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/content"
                element={<ContentManagement isLocked={isLocked} />}
              />
              <Route
                path="/media"
                element={<MediaManagement isLocked={isLocked} />}
              />
              <Route
                path="/links"
                element={<LinksManagement isLocked={isLocked} />}
              />
              <Route
                path="/users"
                element={<UserManagement isLocked={isLocked} />}
              />
              <Route
                path="/settings"
                element={<Settings isLocked={isLocked} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

// Dashboard Component
const Dashboard = () => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700 mb-6">
        Welcome to Refer Me Admin Panel
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-gray-500 text-sm font-medium">Total Pages</h4>
          <p className="text-3xl font-bold text-purple-600 mt-2">12</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-gray-500 text-sm font-medium">Media Files</h4>
          <p className="text-3xl font-bold text-purple-600 mt-2">47</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-gray-500 text-sm font-medium">Active Users</h4>
          <p className="text-3xl font-bold text-purple-600 mt-2">5</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="text-gray-700 font-medium mb-4">Recent Activity</h4>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <FiEdit className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Home page content updated</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <FiPlus className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">New banner image uploaded</p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Content Management Component
const ContentManagement = ({ isLocked }) => {
  const [sections, setSections] = useState([
    {
      id: 1,
      name: "Home Banner",
      content: "Welcome to Refer Me Group...",
      isEditing: false,
    },
    {
      id: 2,
      name: "About Us",
      content: "We are a leading referral company...",
      isEditing: false,
    },
    {
      id: 3,
      name: "Services",
      content: "Our services include...",
      isEditing: false,
    },
  ]);

  const [newSection, setNewSection] = useState({ name: "", content: "" });

  const handleEdit = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, isEditing: true } : section
      )
    );
  };

  const handleSave = (id, newContent) => {
    setSections(
      sections.map((section) =>
        section.id === id
          ? { ...section, content: newContent, isEditing: false }
          : section
      )
    );
  };

  const handleCancel = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, isEditing: false } : section
      )
    );
  };

  const handleAddSection = () => {
    if (newSection.name && newSection.content) {
      setSections([
        ...sections,
        {
          id: sections.length + 1,
          name: newSection.name,
          content: newSection.content,
          isEditing: false,
        },
      ]);
      setNewSection({ name: "", content: "" });
    }
  };

  const handleDelete = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-700">Page Sections</h3>
        <button
          className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          onClick={() =>
            document.getElementById("add-section-modal").showModal()
          }
          disabled={isLocked}
        >
          <FiPlus className="mr-2" /> Add Section
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-800">{section.name}</h4>
              <div className="flex space-x-2">
                {!section.isEditing && (
                  <button
                    onClick={() => handleEdit(section.id)}
                    className="text-purple-600 hover:text-purple-800 p-1"
                    disabled={isLocked}
                  >
                    <FiEdit />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(section.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  disabled={isLocked}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>

            {section.isEditing ? (
              <div>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded mb-3"
                  value={section.content}
                  onChange={(e) =>
                    setSections(
                      sections.map((s) =>
                        s.id === section.id
                          ? { ...s, content: e.target.value }
                          : s
                      )
                    )
                  }
                  rows="6"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleCancel(section.id)}
                    className="px-4 py-2 border border-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(section.id, section.content)}
                    className="px-4 py-2 bg-purple-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 whitespace-pre-line">
                {section.content}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Add Section Modal */}
      <dialog
        id="add-section-modal"
        className="p-6 rounded-lg shadow-xl w-full max-w-md"
      >
        <h3 className="text-lg font-medium mb-4">Add New Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={newSection.name}
              onChange={(e) =>
                setNewSection({ ...newSection, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              rows="6"
              value={newSection.content}
              onChange={(e) =>
                setNewSection({ ...newSection, content: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => document.getElementById("add-section-modal").close()}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleAddSection();
              document.getElementById("add-section-modal").close();
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            Add Section
          </button>
        </div>
      </dialog>
    </div>
  );
};

// Media Management Component
const MediaManagement = ({ isLocked }) => {
  const [media, setMedia] = useState([
    {
      id: 1,
      name: "banner1.jpg",
      type: "image",
      url: "/assets/banner-new/contact.jpeg",
      alt: "Contact Banner",
    },
    {
      id: 2,
      name: "logo.png",
      type: "image",
      url: "/assets/logo.png",
      alt: "Company Logo",
    },
    {
      id: 3,
      name: "brochure.pdf",
      type: "document",
      url: "/assets/brochure.pdf",
      alt: "Company Brochure",
    },
  ]);

  const [newMedia, setNewMedia] = useState(null);

  const handleUpload = () => {
    if (newMedia) {
      setMedia([
        ...media,
        {
          id: media.length + 1,
          name: newMedia.name,
          type: newMedia.type,
          url: URL.createObjectURL(newMedia.file),
          alt: "",
        },
      ]);
      setNewMedia(null);
    }
  };

  const handleDelete = (id) => {
    setMedia(media.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-700">Media Library</h3>
        <button
          className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          onClick={() =>
            document.getElementById("upload-media-modal").showModal()
          }
          disabled={isLocked}
        >
          <FiPlus className="mr-2" /> Upload Media
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-32 object-cover rounded mb-2"
              />
            ) : (
              <div className="w-full h-32 bg-gray-100 flex items-center justify-center rounded mb-2">
                <FiFileText className="text-4xl text-gray-400" />
              </div>
            )}
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium truncate">{item.name}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:text-red-800 p-1"
                disabled={isLocked}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Media Modal */}
      <dialog
        id="upload-media-modal"
        className="p-6 rounded-lg shadow-xl w-full max-w-md"
      >
        <h3 className="text-lg font-medium mb-4">Upload New Media</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File
            </label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setNewMedia({
                    file,
                    name: file.name,
                    type: file.type.startsWith("image") ? "image" : "document",
                  });
                }
              }}
            />
          </div>
          {newMedia && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alt Text
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Description for accessibility"
                onChange={(e) =>
                  setNewMedia({ ...newMedia, alt: e.target.value })
                }
              />
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => {
              document.getElementById("upload-media-modal").close();
              setNewMedia(null);
            }}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleUpload();
              document.getElementById("upload-media-modal").close();
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded"
            disabled={!newMedia}
          >
            Upload
          </button>
        </div>
      </dialog>
    </div>
  );
};

// Links Management Component
const LinksManagement = ({ isLocked }) => {
  const [links, setLinks] = useState([
    { id: 1, name: "Facebook", url: "https://facebook.com/refermegroup" },
    {
      id: 2,
      name: "LinkedIn",
      url: "https://linkedin.com/company/refermegroup",
    },
    { id: 3, name: "Twitter", url: "https://twitter.com/refermegroup" },
  ]);

  const [newLink, setNewLink] = useState({ name: "", url: "" });

  const handleAddLink = () => {
    if (newLink.name && newLink.url) {
      setLinks([
        ...links,
        {
          id: links.length + 1,
          name: newLink.name,
          url: newLink.url,
        },
      ]);
      setNewLink({ name: "", url: "" });
    }
  };

  const handleDelete = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-700">External Links</h3>
        <button
          className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          onClick={() => document.getElementById("add-link-modal").showModal()}
          disabled={isLocked}
        >
          <FiPlus className="mr-2" /> Add Link
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {links.map((link) => (
              <tr key={link.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {link.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    {link.url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                    disabled={isLocked}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Link Modal */}
      <dialog
        id="add-link-modal"
        className="p-6 rounded-lg shadow-xl w-full max-w-md"
      >
        <h3 className="text-lg font-medium mb-4">Add New Link</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={newLink.name}
              onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="url"
              className="w-full p-2 border border-gray-300 rounded"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              placeholder="https://"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => document.getElementById("add-link-modal").close()}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleAddLink();
              document.getElementById("add-link-modal").close();
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded"
            disabled={!newLink.name || !newLink.url}
          >
            Add Link
          </button>
        </div>
      </dialog>
    </div>
  );
};

// User Management Component
const UserManagement = ({ isLocked }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@refermegroup.com",
      role: "admin",
    },
    {
      id: 2,
      name: "Content Manager",
      email: "content@refermegroup.com",
      role: "editor",
    },
    {
      id: 3,
      name: "Support Staff",
      email: "support@refermegroup.com",
      role: "viewer",
    },
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "editor",
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([
        ...users,
        {
          id: users.length + 1,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      ]);
      setNewUser({ name: "", email: "", role: "editor" });
    }
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-700">User Accounts</h3>
        <button
          className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          onClick={() => document.getElementById("add-user-modal").showModal()}
          disabled={isLocked}
        >
          <FiPlus className="mr-2" /> Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                    disabled={isLocked}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      <dialog
        id="add-user-modal"
        className="p-6 rounded-lg shadow-xl w-full max-w-md"
      >
        <h3 className="text-lg font-medium mb-4">Add New User</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="admin">Administrator</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => document.getElementById("add-user-modal").close()}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleAddUser();
              document.getElementById("add-user-modal").close();
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded"
            disabled={!newUser.name || !newUser.email}
          >
            Add User
          </button>
        </div>
      </dialog>
    </div>
  );
};

// Settings Component
const Settings = ({ isLocked }) => {
  const [settings, setSettings] = useState({
    siteTitle: "Refer Me Group",
    contactEmail: "contact@refermegroup.com",
    contactPhone: "+91 76785 73511",
    address: "B-225, Aditya Park Town, Ghaziabad (UP) 201002",
    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-700 mb-6">
        System Settings
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site Title
          </label>
          <input
            type="text"
            name="siteTitle"
            className="w-full p-2 border border-gray-300 rounded"
            value={settings.siteTitle}
            onChange={handleChange}
            disabled={isLocked}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Email
          </label>
          <input
            type="email"
            name="contactEmail"
            className="w-full p-2 border border-gray-300 rounded"
            value={settings.contactEmail}
            onChange={handleChange}
            disabled={isLocked}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Phone
          </label>
          <input
            type="tel"
            name="contactPhone"
            className="w-full p-2 border border-gray-300 rounded"
            value={settings.contactPhone}
            onChange={handleChange}
            disabled={isLocked}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            name="address"
            rows="3"
            className="w-full p-2 border border-gray-300 rounded"
            value={settings.address}
            onChange={handleChange}
            disabled={isLocked}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="maintenanceMode"
            name="maintenanceMode"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            checked={settings.maintenanceMode}
            onChange={handleChange}
            disabled={isLocked}
          />
          <label
            htmlFor="maintenanceMode"
            className="ml-2 block text-sm text-gray-700"
          >
            Maintenance Mode
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
