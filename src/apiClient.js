// src/apiClient.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-kelompokfwd1-sibm3.karyakreasi.id/api", // sesuaikan kalau port/backend-mu beda
});

// nanti token bisa otomatis dikirim di sini
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
