import { useState, useEffect } from "react";
import {
  getWebinars,
  createWebinar,
  updateWebinar,
  deleteWebinar,
} from "../../api/api";
import { FaSave, FaTrash, FaEdit, FaTimes } from "react-icons/fa";

const WebinarAdmin = () => {
  const [webinars, setWebinars] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    speaker: "",
    link: "",
    timezone: "IST",
    duration: 60,
    category: "",
  });

  useEffect(() => {
    fetchWebinars();
  }, []);

  const fetchWebinars = async () => {
    try {
      const res = await getWebinars();
      setWebinars(res.data || []);
    } catch (err) {
      console.error("Error fetching webinars:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      speaker: "",
      link: "",
      timezone: "IST",
      duration: 60,
      category: "",
    });
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateWebinar(editingId, formData);
      } else {
        await createWebinar(formData);
      }
      resetForm();
      fetchWebinars();
    } catch (err) {
      console.error("Error saving webinar:", err);
    }
  };

  const handleEdit = (webinar) => {
    setFormData(webinar);
    setEditingId(webinar._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteWebinar(id);
      fetchWebinars();
    } catch (err) {
      console.error("Error deleting webinar:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Webinar Admin Panel</h2>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Webinar" : "Add Webinar"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "title",
            "speaker",
            "date",
            "time",
            "link",
            "timezone",
            "duration",
            "category",
          ].map((field) => (
            <input
              key={field}
              type={
                field === "date"
                  ? "date"
                  : field === "time"
                  ? "time"
                  : field === "link"
                  ? "url"
                  : field === "duration"
                  ? "number"
                  : "text"
              }
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          ))}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border rounded md:col-span-2"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded text-white ${
              editingId
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <FaSave /> {editingId ? "Update Webinar" : "Save Webinar"}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="flex items-center gap-2 px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              <FaTimes /> Cancel
            </button>
          )}
        </div>
      </div>

      {/* Webinar List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">All Webinars</h3>
        {webinars.length === 0 ? (
          <p className="text-gray-500">No webinars found.</p>
        ) : (
          <ul className="space-y-4">
            {webinars.map((webinar) => (
              <li
                key={webinar._id}
                className="flex flex-col md:flex-row md:items-center justify-between border p-4 rounded"
              >
                <div>
                  <h4 className="font-bold text-lg">{webinar.title}</h4>
                  <p className="text-sm text-gray-600">
                    {webinar.speaker} •{" "}
                    {new Date(webinar.date).toLocaleDateString()} •{" "}
                    {webinar.time} ({webinar.timezone})
                  </p>
                  <p className="text-gray-700">{webinar.description}</p>
                  <p className="text-gray-500 text-sm">
                    Duration: {webinar.duration} mins | Category:{" "}
                    {webinar.category || "General"}
                  </p>
                  {webinar.link && (
                    <a
                      href={webinar.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      Join Webinar
                    </a>
                  )}
                </div>
                <div className="flex gap-3 mt-3 md:mt-0">
                  <button
                    onClick={() => handleEdit(webinar)}
                    className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(webinar._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WebinarAdmin;
