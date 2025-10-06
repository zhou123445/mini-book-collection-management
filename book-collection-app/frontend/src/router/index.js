import { createRouter, createWebHistory } from 'vue-router';
import BookList from '../views/BookList.vue';
import AddBook from '../views/AddBook.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL || '/'),
  routes: [
    {
      path: '/',
      name: 'bookList',
      component: BookList,
      meta: { title: 'Book Management' }
    },
    {
      path: '/add-book',
      name: 'addBook',
      component: AddBook,
      meta: { title: 'Add Book' }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to) => {
  document.title = to.meta.title || 'Book Management System';
});

export default router;
