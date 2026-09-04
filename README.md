# 📚 Book Tracker Dashboard

A modern, mobile-friendly book tracking application built with React, Vite, and Tailwind CSS. Track your reading journey with automatic updates, responsive UI, and no backend dependency.

## ✨ Features

- **📱 Mobile-Friendly Design**: Fully responsive layout that works on all devices
- **📖 Book Management**: Add, edit, and delete books from your collection
- **📊 Reading Progress**: Track pages read with visual progress bars
- **⭐ Ratings & Reviews**: Rate books and add personal notes
- **📈 Statistics Dashboard**: View reading stats, genre breakdown, and top-rated books
- **💾 Auto-Saving**: All data persists locally using localStorage
- **🔄 Real-time Updates**: UI updates automatically as you track your reading
- **🚀 Offline-First**: Works completely offline, syncs when online

## 🎯 Core Functionality

### Dashboard
- View all your books in a responsive grid layout
- Filter by reading status (To Read, Reading, Completed)
- Quick access statistics at a glance
- One-click book management

### Add Book
- Simple form to add new books
- Track essential details: title, author, total pages
- Set reading status and genre
- Add personal notes and ratings
- Form validation ensures data quality

### Book Details
- View full book information
- Edit reading progress
- Update status and ratings
- Add or modify notes
- Track reading journey for each book

### Statistics
- Overall reading statistics
- Pages read progress
- Books by status breakdown
- Genre distribution
- Top-rated books ranking
- Average rating across your library

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite (⚡ Fast development server)
- **Styling**: Tailwind CSS (utility-first CSS)
- **Routing**: React Router v6
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: localStorage API
- **Deployment**: GitHub Pages ready

## 📋 Project Structure

```
book-tracker-dashboard/
├── src/
│   ├── components/
│   │   ├── BookCard.jsx      # Book display card component
│   │   └── Header.jsx         # Navigation header
│   ├── pages/
│   │   ├── Dashboard.jsx      # Main dashboard view
│   │   ├── AddBook.jsx        # Add new book form
│   │   ├── BookDetail.jsx     # Book detail & edit page
│   │   └── Statistics.jsx     # Statistics & analytics
│   ├── utils/
│   │   └── storage.js         # localStorage utilities
│   ├── App.jsx                # Main app component with routing
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Project dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cj8brown/book-tracker-dashboard.git
   cd book-tracker-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📱 Usage Guide

### Adding a Book
1. Click "Add New Book" button
2. Fill in book details (title and author required)
3. Enter total pages
4. Set initial reading status
5. Click "Add Book"

### Tracking Progress
1. Go to book detail page by clicking "View" on any book card
2. Update "Pages Read" to track your progress
3. See the progress bar update automatically
4. Changes are saved instantly

### Rating & Notes
1. Open book detail page
2. Click "Edit Book"
3. Add a star rating (1-5)
4. Write personal notes
5. Save changes

### Viewing Statistics
1. Click "Statistics" in the header
2. View overall reading stats
3. See books by status and genre
4. Check your top-rated books

### Filtering Books
1. On dashboard, use filter tabs
2. View books by: All, To Read, Reading, or Completed
3. Cards show reading progress and key info

## 💾 Data Storage

All data is stored locally in your browser using the `localStorage` API:
- No server required
- Data persists between sessions
- Private to your device
- ~5-10MB storage limit

**Data Structure**:
```javascript
{
  id: string,              // Unique identifier
  title: string,           // Book title
  author: string,          // Author name
  totalPages: number,      // Total pages in book
  pagesRead: number,       // Pages currently read
  status: string,          // "To Read" | "Reading" | "Completed"
  rating: number | null,   // 1-5 star rating
  genre: string,           // Book genre
  notes: string,           // User notes
  createdAt: string        // ISO timestamp
}
```

## 🎨 Customization

### Change Color Scheme
Edit `tailwind.config.js` to customize colors:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Add More Book Fields
1. Update storage structure in `src/utils/storage.js`
2. Add form fields in `src/pages/AddBook.jsx`
3. Display in `src/pages/BookDetail.jsx`

## 🚀 Deployment

### Deploy to GitHub Pages

1. Update `vite.config.js` base path (already set to `/book-tracker-dashboard/`)
2. Run build:
   ```bash
   npm run build
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```

### Deploy to Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Vercel auto-detects Vite setup
4. Deploy with one click!

## 📊 Future Enhancements

- [ ] Cloud sync with Firebase/Supabase
- [ ] Reading goals and challenges
- [ ] Social sharing features
- [ ] Book recommendations
- [ ] Reading statistics charts
- [ ] Export/import functionality
- [ ] Dark mode support
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

If you encounter any issues:
1. Check the [GitHub Issues](https://github.com/cj8brown/book-tracker-dashboard/issues)
2. Create a new issue with detailed description
3. Include screenshots or error logs

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Bundled with [Vite](https://vitejs.dev)
- Routed with [React Router](https://reactrouter.com)

---

**Happy Reading! 📚**
