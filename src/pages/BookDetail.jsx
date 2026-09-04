import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookById, updateBook } from '../utils/storage';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadBook();
  }, [id]);

  const loadBook = async () => {
    setLoading(true);
    const foundBook = await getBookById(id);
    if (foundBook) {
      setBook(foundBook);
      setEditData(foundBook);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'pages_read' || name === 'total_pages' 
        ? (value ? parseInt(value) : '') 
        : value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const updated = await updateBook(id, editData);
    setIsSaving(false);
    if (updated) {
      setBook(updated);
      setIsEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading book...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Book not found</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const readingProgress = book.pages_read ? Math.round((book.pages_read / book.total_pages) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-blue-100 text-lg mb-4">by {book.author}</p>
            {book.genre && (
              <span className="inline-block bg-blue-500 bg-opacity-50 px-3 py-1 rounded-full text-sm">
                {book.genre}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                {/* Reading Progress */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Reading Progress</h2>
                  {!isEditing ? (
                    <div>
                      <p className="text-gray-600 mb-3">
                        {book.pages_read} / {book.total_pages} pages
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${readingProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-gray-600">{readingProgress}% complete</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Pages Read</label>
                        <input
                          type="number"
                          name="pages_read"
                          value={editData.pages_read}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Total Pages</label>
                        <input
                          type="number"
                          name="total_pages"
                          value={editData.total_pages}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Status & Rating */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <h3 className="text-gray-700 font-semibold mb-2">Status</h3>
                    {!isEditing ? (
                      <p className="text-lg font-medium text-blue-600">{book.status}</p>
                    ) : (
                      <select
                        name="status"
                        value={editData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      >
                        <option>To Read</option>
                        <option>Reading</option>
                        <option>Completed</option>
                      </select>
                    )}
                  </div>
                  <div>
                    <h3 className="text-gray-700 font-semibold mb-2">Rating</h3>
                    {!isEditing ? (
                      <div className="flex items-center">
                        {book.rating ? (
                          <>
                            <span className="text-yellow-400 text-lg">★</span>
                            <span className="ml-2 text-lg font-medium">{book.rating}/5</span>
                          </>
                        ) : (
                          <span className="text-gray-500">Not rated</span>
                        )}
                      </div>
                    ) : (
                      <select
                        name="rating"
                        value={editData.rating || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">Not rated</option>
                        <option value="1">1 ⭐</option>
                        <option value="2">2 ⭐⭐</option>
                        <option value="3">3 ⭐⭐⭐</option>
                        <option value="4">4 ⭐⭐⭐⭐</option>
                        <option value="5">5 ⭐⭐⭐⭐⭐</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Notes */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Notes</h2>
                  {!isEditing ? (
                    <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {book.notes || 'No notes added yet.'}
                      </p>
                    </div>
                  ) : (
                    <textarea
                      name="notes"
                      value={editData.notes}
                      onChange={handleChange}
                      rows="8"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4 flex-wrap">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Edit Book
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditData(book);
                    }}
                    disabled={isSaving}
                    className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
