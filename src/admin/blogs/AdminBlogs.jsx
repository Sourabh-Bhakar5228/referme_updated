import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBlog } from '../../redux/blogSlice';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of blogs per page
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/blogs/get.php');
      setBlogs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch blogs. Please try again.');
      setLoading(false);
    }
  };

  const handleState = (blog) => {
    console.log('handle state', blog);
    dispatch(setBlog({
      blog: blog,
    }));
    navigate('/admin/editBlog');
  }

  useEffect(() => {
    getBlogs();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    }
  };

  // Generate page numbers for display (limit to 5 buttons for brevity)
  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Blogs</h1>
        <button
          onClick={() => navigate('/admin/addBlog')}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
        >
          Add Blog
        </button>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-indigo-600 text-white text-left text-sm uppercase font-semibold">
              <th className="py-3 px-4 border-b">ID</th>
              <th className="py-3 px-4 border-b">Title</th>
              <th className="py-3 px-4 border-b">Category</th>
              <th className="py-3 px-4 border-b">Content</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Tags</th>
              <th className="py-3 px-4 border-b">Image</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBlogs.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-4 px-4 text-center text-gray-500">
                  No blogs found.
                </td>
              </tr>
            ) : (
              currentBlogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-4 border-b text-gray-800">{blog.id}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{blog.title}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{blog.category}</td>
                  <td className="py-3 px-4 border-b text-gray-800 max-w-xs truncate">{blog.content}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{blog.date}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{blog.tags}</td>
                  <td className="py-3 px-4 border-b">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/64';
                      }}
                    />
                  </td>
                  <td className="py-3 px-4 border-b">
                    <button className="text-indigo-600 hover:text-indigo-800 mr-2" onClick={() => handleState(blog)}>
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
            aria-label="Previous page"
          >
            Previous
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;