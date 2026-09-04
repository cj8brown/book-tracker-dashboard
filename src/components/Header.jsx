import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <h1 className="text-xl font-bold">Book Tracker</h1>
          </Link>
          <nav className="hidden sm:flex gap-6">
            <Link to="/" className="hover:text-blue-400 transition-colors">Dashboard</Link>
            <Link to="/add" className="hover:text-blue-400 transition-colors">Add Book</Link>
            <Link to="/stats" className="hover:text-blue-400 transition-colors">Statistics</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
