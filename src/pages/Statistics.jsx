import { useState, useEffect } from 'react';
import { getBooks } from '../utils/storage';

export default function Statistics() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    const allBooks = await getBooks();
    setBooks(allBooks);
    setLoading(false);
  };

  const stats = {
    total: books.length,
    reading: books.filter(b => b.status === 'Reading').length,
    completed: books.filter(b => b.status === 'Completed').length,
    toRead: books.filter(b => b.status === 'To Read').length,
    totalPages: books.reduce((sum, b) => sum + (b.total_pages || 0), 0),
    pagesRead: books.reduce((sum, b) => sum + (b.pages_read || 0), 0),
    avgRating: books.filter(b => b.rating).length > 0 
      ? (books.reduce((sum, b) => sum + (b.rating || 0), 0) / books.filter(b => b.rating).length).toFixed(1)
      : 'N/A',
    ratedBooks: books.filter(b => b.rating).length,
  };

  const genreStats = books.reduce((acc, book) => {
    const genre = book.genre || 'Unknown';
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  const topRated = books
    .filter(b => b.rating)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Reading Statistics</h1>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Books</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Pages Read</p>
            <p className="text-4xl font-bold text-green-600 mt-2">{stats.pagesRead.toLocaleString()}</p>
            <p className="text-gray-500 text-sm mt-1">of {stats.totalPages.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Average Rating</p>
            <p className="text-4xl font-bold text-yellow-600 mt-2">{stats.avgRating}</p>
            <p className="text-gray-500 text-sm mt-1">{stats.ratedBooks} books rated</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Reading Progress</p>
            <p className="text-4xl font-bold text-purple-600 mt-2">
              {stats.totalPages ? Math.round((stats.pagesRead / stats.totalPages) * 100) : 0}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Books by Status</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">To Read</span>
                  <span className="font-semibold text-gray-900">{stats.toRead}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-purple-500 h-3 rounded-full"
                    style={{ width: `${stats.total ? (stats.toRead / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Currently Reading</span>
                  <span className="font-semibold text-gray-900">{stats.reading}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-yellow-500 h-3 rounded-full"
                    style={{ width: `${stats.total ? (stats.reading / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Completed</span>
                  <span className="font-semibold text-gray-900">{stats.completed}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${stats.total ? (stats.completed / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Books by Genre</h2>
            {Object.keys(genreStats).length === 0 ? (
              <p className="text-gray-500">No genre data available</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(genreStats)
                  .sort((a, b) => b[1] - a[1])
                  .map(([genre, count]) => (
                    <div key={genre} className="flex justify-between items-center">
                      <span className="text-gray-700">{genre}</span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Rated Books */}
        {topRated.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Top Rated Books</h2>
            <div className="space-y-4">
              {topRated.map((book, index) => (
                <div key={book.id} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-b-0">
                  <div>
                    <p className="font-semibold text-gray-900">{index + 1}. {book.title}</p>
                    <p className="text-gray-600 text-sm">{book.author}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-xl">★</span>
                    <span className="ml-2 font-semibold text-lg">{book.rating}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
