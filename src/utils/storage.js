// LocalStorage utility for book data persistence

const STORAGE_KEY = 'bookTrackerData';

export const getBooks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from storage:', error);
    return [];
  }
};

export const saveBooks = (books) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    console.error('Error writing to storage:', error);
  }
};

export const addBook = (book) => {
  const books = getBooks();
  const newBook = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...book,
  };
  books.push(newBook);
  saveBooks(books);
  return newBook;
};

export const updateBook = (id, updates) => {
  let books = getBooks();
  books = books.map(book => 
    book.id === id ? { ...book, ...updates } : book
  );
  saveBooks(books);
  return books.find(b => b.id === id);
};

export const deleteBook = (id) => {
  let books = getBooks();
  books = books.filter(book => book.id !== id);
  saveBooks(books);
};

export const getBookById = (id) => {
  const books = getBooks();
  return books.find(book => book.id === id);
};
