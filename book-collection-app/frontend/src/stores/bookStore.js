import { defineStore } from 'pinia';

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [
      {
        id: 1,
        title: 'One Hundred Years of Solitude',
        author: 'Gabriel García Márquez',
        isbn: '9787544291170',
        publicationYear: 1967,
        genre: 'Literature'
      },
      {
        id: 2,
        title: 'The Three-Body Problem',
        author: 'Liu Cixin',
        isbn: '9787229030933',
        publicationYear: 2008,
        genre: 'Science Fiction'
      }
    ]
  }),
  actions: {
    addBook(newBook) {
      newBook.id = this.books.length > 0 
        ? Math.max(...this.books.map(book => book.id)) + 1 
        : 1;
      this.books.push(newBook);
    },
    deleteBook(id) {
      this.books = this.books.filter(book => book.id !== id);
    }
  },
  getters: {
    getAllBooks: (state) => state.books,
    getUniqueGenres: (state) => [...new Set(state.books.map(book => book.genre))]
  }
});
    