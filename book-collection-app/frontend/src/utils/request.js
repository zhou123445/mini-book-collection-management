// Unified request utility function that automatically adapts to API addresses in development/production environments
export const request = async (url, options = {}) => {
  const baseApiUrl = import.meta.env.VITE_APP_API_URL;
  const fullUrl = url.startsWith('/') ? `${baseApiUrl}${url}` : `${baseApiUrl}/${url}`;

  if (import.meta.env.VITE_APP_DEBUG_MODE === 'true') {
    console.log('[Request] URL:', fullUrl);
    console.log('[Request] Options:', options);
  }

  const defaultOptions = {
    headers: { 'Content-Type': 'application/json' },
    ...options
  };

  try {
    const response = await fetch(fullUrl, defaultOptions);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const data = await response.json();
    
    if (import.meta.env.VITE_APP_DEBUG_MODE === 'true') {
      console.log('[Response] Data:', data);
    }
    return data;
  } catch (error) {
    console.error('[Request Error]', error.message);
    throw error;
  }
};

// Book-related interface encapsulation
export const api = {
  getBooks: () => request('/books'),
  addBook: (bookData) => request('/books', { method: 'POST', body: JSON.stringify(bookData) }),
  deleteBook: (id) => request(`/books/${id}`, { method: 'DELETE' })
};