let API_ROOT;

if (import.meta.env.DEV) {
  API_ROOT = 'http://localhost:3000';
} else {
  API_ROOT = 'https://taskpro-api-hwly.onrender.com';
}

export { API_ROOT };

