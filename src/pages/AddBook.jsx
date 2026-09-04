import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../utils/storage';

export default function AddBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    totalPages: '',
    pagesRead: '',
    status: 'To Read',
    rating: '',
    genre: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.totalPages) newErrors.totalPages = 'Total pages is required';
    if (formData.totalPages && isNaN(formData.totalPages)) newErrors.totalPages = 'Must be a number';
    if (formData.pagesRead && isNaN(formData.pagesRead)) newErrors.pagesRead = 'Must be a number';
    if (formData.pagesRead > formData.totalPages) newErrors.pagesRead = 'Cannot exceed total pages';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      const result = await addBook({
        title: formData.title,
        author: formData.author,
        totalPages: parseInt(formData.totalPages),
        pagesRead: formData.pagesRead ? parseInt(formData.pagesRead) : 0,
        status: formData.status,
        rating: formData.rating ? parseInt(formData.rating) : null,
        genre: formData.genre,
        notes: formData.notes,
      });
      setIsSubmitting(false);
      
      if (result) {
        navigate('/');
      } else {
        setErrors({ submit: 'Failed to add book. Please try again.' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Add New Book</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          {errors.submit && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {errors.submit}
            </div>
          )}

          {/* Title */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Book Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Author */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Author *
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.author ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
          </div>

          {/* Genre */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Genre
            </label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="e.g., Fiction, Mystery, Science Fiction"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Total Pages */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Total Pages *
              </label>
              <input
                type="number"
                name="totalPages"
                value={formData.totalPages}
                onChange={handleChange}
                placeholder="300"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.totalPages ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.totalPages && <p className="text-red-500 text-sm mt-1">{errors.totalPages}</p>}
            </div>

            {/* Pages Read */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Pages Read
              </label>
              <input
                type="number"
                name="pagesRead"
                value={formData.pagesRead}
                onChange={handleChange}
                placeholder="0"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.pagesRead ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.pagesRead && <p className="text-red-500 text-sm mt-1">{errors.pagesRead}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Status */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>To Read</option>
                <option>Reading</option>
                <option>Completed</option>
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Rating (1-5)
              </label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Not rated</option>
                <option value="1">1 ⭐</option>
                <option value="2">2 ⭐⭐</option>
                <option value="3">3 ⭐⭐⭐</option>
                <option value="4">4 ⭐⭐⭐⭐</option>
                <option value="5">5 ⭐⭐⭐⭐⭐</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any thoughts or notes about the book..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Adding...' : 'Add Book'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              disabled={isSubmitting}
              className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
