<template>
  <div class="book-list-container">
    <div class="header-actions">
      <h1>My Book Collection</h1>
      <router-link to="/add-book" class="add-button">Add New Book</router-link>
    </div>

    <div class="filters">
      <select v-model="selectedGenre" @change="filterBooks">
        <option value="">All Genres</option>
        <option v-for="genre in uniqueGenres" :key="genre" :value="genre">
          {{ genre }}
        </option>
      </select>
      <input 
        type="text" 
        v-model="searchTerm" 
        placeholder="Search books..."
        @input="filterBooks"
      >
    </div>

    <table class="book-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>ISBN</th>
          <th>Publication Year</th>
          <th>Genre</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in filteredBooks" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.isbn }}</td>
          <td>{{ book.publicationYear }}</td>
          <td>{{ book.genre }}</td>
          <td class="actions">
            <button @click="handleDelete(book.id)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="filteredBooks.length === 0" class="empty-state">
      No books available. Add some books!
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useBookStore } from '@/stores/bookStore';

const bookStore = useBookStore();
const selectedGenre = ref('');
const searchTerm = ref('');
const filteredBooks = ref([]);

const uniqueGenres = computed(() => bookStore.getUniqueGenres);

const filterBooks = () => {
  let results = bookStore.getAllBooks;
  if (selectedGenre.value) results = results.filter(book => book.genre === selectedGenre.value);
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    results = results.filter(book => 
      book.title.toLowerCase().includes(term) || 
      book.author.toLowerCase().includes(term) ||
      book.isbn.includes(term)
    );
  }
  filteredBooks.value = results;
};

const handleDelete = (id) => {
  if (confirm('Are you sure you want to delete this book?')) {
    bookStore.deleteBook(id);
    filterBooks();
  }
};

onMounted(() => filterBooks());
</script>

<style scoped>
.book-list-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.add-button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #359e75;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filters select, .filters input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
  min-width: 200px;
  color: #333;
}

.book-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background-color: white;
}

.book-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 2px solid #ccc;
  background-color: #f5f5f5;
  color: #222;
  font-weight: 600;
}

.book-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
  color: #333;
}

.book-table tr:hover {
  background-color: #f9f9f9;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.delete-btn {
  padding: 0.25rem 0.5rem;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #cc0000;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #555;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
</style>