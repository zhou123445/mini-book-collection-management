<template>
  <div id="app">
    <header class="app-header"><h1>Book Management System</h1></header>
    <main><router-view /></main>
    <footer><p>&copy; {{ new Date().getFullYear() }} Book Management System</p></footer>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style>
/* Global styles remain unchanged */
* { margin: 0; padding: 0; box-sizing: border-box; }
/* Remaining styles omitted */
</style>