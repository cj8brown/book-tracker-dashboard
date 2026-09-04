import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetail';
import Statistics from './pages/Statistics';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/stats" element={<Statistics />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 text-gray-400 text-center py-4 mt-12">
          <p>&copy; 2024 Book Tracker Dashboard. Built with React + Tailwind CSS</p>
        </footer>
      </div>
    </Router>
  );
}
