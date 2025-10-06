<template>
  <div class="add-book-container">
    <h1>Add New Book</h1>
    <router-link to="/" class="back-link">← Back to Book List</router-link>

    <form @submit.prevent="handleSubmit" class="book-form">
      <div class="form-group">
        <label for="title">Title *</label>
        <input type="text" id="title" v-model="book.title" required placeholder="Enter title">
      </div>
      <div class="form-group">
        <label for="author">Author *</label>
        <input type="text" id="author" v-model="book.author" required placeholder="Enter author">
      </div>
      <div class="form-group">
        <label for="isbn">ISBN *</label>
        <input type="text" id="isbn" v-model="book.isbn" required placeholder="Enter ISBN">
      </div>
      <div class="form-group">
        <label for="publicationYear">Publication Year</label>
        <input type="number" id="publicationYear" v-model="book.publicationYear" min="1000" max="2100" placeholder="Enter publication year">
      </div>
      <div class="form-group">
        <label for="genre">Genre</label>
        <select id="genre" v-model="book.genre">
          <option value="">Select genre</option>
          <option value="Literature">Literature</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="History">History</option>
          <option value="Philosophy">Philosophy</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="submit" class="submit-btn">Add Book</button>
        <button type="reset" class="reset-btn" @click="resetForm">Reset</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBookStore } from '../stores/bookStore';

const router = useRouter();
const bookStore = useBookStore();

const book = ref({
  title: '',
  author: '',
  isbn: '',
  publicationYear: '',
  genre: ''
});

const handleSubmit = () => {
  if (!book.value.title || !book.value.author || !book.value.isbn) {
    alert('Please fill in all required fields marked with *');
    return;
  }
  bookStore.addBook({ ...book.value });
  resetForm();
  router.push('/');
};

const resetForm = () => {
  book.value = {
    title: '',
    author: '',
    isbn: '',
    publicationYear: '',
    genre: ''
  };
};
</script>

<style scoped>
.add-book-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #007bff;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.book-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

input, select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus, select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.submit-btn {
  flex: 1;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-btn:hover {
  background: #0056b3;
}

.reset-btn {
  flex: 1;
  padding: 0.75rem;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.reset-btn:hover {
  background: #5a6268;
}
</style>
    