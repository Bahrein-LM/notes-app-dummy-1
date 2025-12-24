// this file handles small features likes axios instance or anything that crucial on the application

import axios from "axios";

// because when you deploy your app, the "localhost" will be replaced by the URL of your host URL
// it is called a dynamic URL

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3001/api' : '/api';

const api = axios.create({
    baseURL: BASE_URL,
})

export default api;