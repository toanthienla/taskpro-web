let API_ROOT;

if (import.meta.env.DEV) {
  API_ROOT = 'http://localhost:3000';
} else {
  API_ROOT = 'https://taskpro-api-hwly.onrender.com';
}

export const DEFAULT_PAGE = 1;
export const DEFAULT_ITEMS_PER_PAGE = 12;

export { API_ROOT };

