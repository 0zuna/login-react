window.axios = require('axios');
window.axios.defaults.baseURL = 'http://localhost:3000';
window.axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');
export default window.axios;
