import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const URL_BACKEND = process.env.URL_BACKEND ?? "http://localhost:3333"
const api = axios.create({
  baseURL: URL_BACKEND,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
