let API_ROOT;

if (import.meta.env.DEV) {
  API_ROOT = 'http://localhost:3000';
} else {
  API_ROOT = 'https://api.taskpro.site';
}

export const DEFAULT_PAGE = 1;
export const DEFAULT_ITEMS_PER_PAGE = 12;

export { API_ROOT };

