import { supabase } from '../supabaseClient';

// Cloud storage utility using Supabase

export const getBooks = async () => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching books:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Error reading from Supabase:', error);
    return [];
  }
};

export const addBook = async (book) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .insert([
        {
          title: book.title,
          author: book.author,
          total_pages: book.totalPages,
          pages_read: book.pagesRead || 0,
          status: book.status,
          rating: book.rating || null,
          genre: book.genre,
          notes: book.notes,
        },
      ])
      .select();

    if (error) {
      console.error('Error adding book:', error);
      return null;
    }
    return data?.[0] || null;
  } catch (error) {
    console.error('Error writing to Supabase:', error);
    return null;
  }
};

export const updateBook = async (id, updates) => {
  try {
    const updateData = {};
    
    // Map frontend field names to database column names
    if (updates.totalPages !== undefined) updateData.total_pages = updates.totalPages;
    if (updates.pagesRead !== undefined) updateData.pages_read = updates.pagesRead;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.rating !== undefined) updateData.rating = updates.rating;
    if (updates.genre !== undefined) updateData.genre = updates.genre;
    if (updates.notes !== undefined) updateData.notes = updates.notes;
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.author !== undefined) updateData.author = updates.author;

    const { data, error } = await supabase
      .from('books')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating book:', error);
      return null;
    }
    return data?.[0] || null;
  } catch (error) {
    console.error('Error updating in Supabase:', error);
    return null;
  }
};

export const deleteBook = async (id) => {
  try {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting book:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error deleting from Supabase:', error);
    return false;
  }
};

export const getBookById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching book:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error reading book from Supabase:', error);
    return null;
  }
};
