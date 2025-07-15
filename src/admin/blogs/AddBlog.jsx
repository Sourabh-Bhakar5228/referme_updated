import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    date: '',
    tags: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        setError('Please upload a PNG or JPEG image.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size must be less than 2MB.');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.title || !formData.category || !formData.content || !formData.date || !formData.tags || !image) {
      setError('Please fill in all fields and upload an image.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('content', formData.content);
    data.append('date', formData.date);
    data.append('tags', formData.tags);
    data.append('image', image);

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/blogs/add.php', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Blog added successfully!');
      setFormData({ title: '', category: '', content: '', date: '', tags: '' });
      setImage(null);
      setImagePreview(null);
      setTimeout(() => navigate('/admin/blogs'), 2000);
    } catch (err) {
      setError('Failed to add blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Blog</h1>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 peer placeholder-transparent"
              placeholder="Title"
            />
            <label
              htmlFor="title"
              className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-indigo-600"
            >
              Blog Title
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 peer placeholder-transparent"
              placeholder="Category"
            />
            <label
              htmlFor="category"
              className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-indigo-600"
            >
              Category
            </label>
          </div>

          <div className="relative">
            <textarea
              name="content"
              id="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 peer placeholder-transparent"
              rows="5"
              placeholder="Content"
            ></textarea>
            <label
              htmlFor="content"
              className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-indigo-600"
            >
              Blog Content
            </label>
          </div>

          <div className="relative">
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 peer"
            />
            <label
              htmlFor="date"
              className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-indigo-600"
            >
              Publication Date
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              name="tags"
              id="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 peer placeholder-transparent"
              placeholder="Tags"
            />
            <label
              htmlFor="tags"
              className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-medium text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-indigo-600"
            >
              Tags (comma-separated)
            </label>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Blog Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/png,image/jpeg"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg shadow"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Add Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;