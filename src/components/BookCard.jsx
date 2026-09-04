import { Link } from 'react-router-dom';

export default function BookCard({ book, onDelete }) {
  const readingProgress = book.pages_read ? Math.round((book.pages_read / book.total_pages) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full">
      {/* Book Cover */}
      <div className="bg-gradient-to-br from-blue-400 to-purple-500 h-40 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <p className="text-sm font-semibold line-clamp-3">{book.title}</p>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-gray-600 text-sm mb-1">{book.author}</p>
        
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">
            Progress: {book.pages_read || 0} / {book.total_pages} pages
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{readingProgress}% complete</p>
        </div>

        <p className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded mb-3 inline-block">
          {book.status || 'To Read'}
        </p>

        {book.rating && (
          <div className="flex items-center mb-3">
            <span className="text-yellow-400">★</span>
            <span className="text-sm ml-1">{book.rating}/5</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-gray-200 p-4 flex gap-2">
        <Link 
          to={`/book/${book.id}`}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium text-center transition-colors"
        >
          View
        </Link>
        <button 
          onClick={() => onDelete(book.id)}
          className="bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded text-sm font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
