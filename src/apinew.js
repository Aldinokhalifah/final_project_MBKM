// src/api.js
import api from "./apiClient";

/* =========================
   AUTH
   ========================= */

export async function registerUser({ name, email, password, role }) {
  // biasanya Laravel butuh password_confirmation juga
  const res = await api.post("/register", {
    name,
    email,
    password,
    password_confirmation: password,
    // role biasanya DITENTUKAN backend (lebih aman)
    // kalau backend kamu memang butuh role dari frontend, baru kirim:
    // role,
  });

  // kalau backend kirim user / token, bisa di-handle di sini
  return res.data;
}

export async function loginUser({ email, password }) {
  const res = await api.post("/login", { email, password });

  // sesuaikan dengan response AuthController-mu
  const token =
    res.data.access_token || // JWT style
    res.data.token ||
    res.data.jwt ||
    null;

  if (token) {
    localStorage.setItem("token", token);
  }

  if (res.data.user) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }

  return res.data; // { user, access_token, ... } tergantung backend
}

export async function logoutUser() {
  try {
    await api.post("/logout");
  } catch (e) {
    // boleh diabaikan kalau token sudah invalid
    console.error(e);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

/* =========================
   CATEGORY (ROLE: user)
   ========================= */

// helper kecil buat "merapikan" bentuk data
function unwrapList(data) {
  if (Array.isArray(data)) return data; // [ {...}, {...} ]
  if (data && Array.isArray(data.data)) return data.data; // { data: [ {...} ] }
  if (data && data.data && Array.isArray(data.data.data)) {
    return data.data.data; // { data: { data: [ {...} ] } } (kalau pakai pagination)
  }
  return [];
}

/* =========================
   CATEGORY (ROLE: user)
   ========================= */

export async function getCategories() {
  const res = await api.get("/category");
  return unwrapList(res.data); // ⬅️ SELALU array
}

export async function addCategory(payload) {
  const res = await api.post("/category", payload);
  return res.data;
}

export async function updateCategory(id, payload) {
  const res = await api.put(`/category/${id}`, payload);
  return res.data;
}

export async function deleteCategory(id) {
  const res = await api.delete(`/category/${id}`);
  return res.data;
}

/* =========================
   OUTLET (ROLE: user)
   ========================= */

export async function getOutlets() {
  const res = await api.get("/outlet");
  return unwrapList(res.data); // ⬅️ SELALU array
}

export async function addOutlet(payload) {
  const res = await api.post("/outlet", payload);
  return res.data;
}

export async function updateOutlet(id, payload) {
  const res = await api.put(`/outlet/${id}`, payload);
  return res.data;
}

export async function deleteOutlet(id) {
  const res = await api.delete(`/outlet/${id}`);
  return res.data;
}

/* =========================
   TRANSACTION (ROLE: user)
   ========================= */

export async function getTransactions() {
  const res = await api.get("/transaction");
  return unwrapList(res.data); // ⬅️ SELALU array transaksi
}

export async function addTransaction(payload) {
  const res = await api.post("/transaction", payload);
  return res.data;
}

export async function updateTransaction(id, payload) {
  const res = await api.post(`/transaction/${id}?_method=PUT`, payload);
  return res.data;
}

export async function deleteTransaction(id) {
  const res = await api.delete(`/transaction/${id}`);
  return res.data;
}

/* =========================
   REPORT (ROLE: user)
   ========================= */

export async function getReports() {
  const res = await api.get("/report");
  return res.data;
}

export async function getReportById(id) {
  const res = await api.get(`/report/${id}`);
  return res.data;
}

export async function createReport(payload) {
  const res = await api.post("/report", payload);
  return res.data;
}

export async function deleteReport(id) {
  const res = await api.delete(`/report/${id}`);
  return res.data;
}

// Export PDF semua laporan
export async function exportAllReportPdf() {
  const res = await api.get("/report/export-all-pdf", {
    responseType: "blob", // supaya bisa di-download file PDF
  });
  return res.data;
}

// Export PDF laporan tertentu
export async function exportReportPdf(id) {
  const res = await api.get(`/report/${id}/export-pdf`, {
    responseType: "blob",
  });
  return res.data;
}

export async function getUsers() {
  try {
    const res = await api.get("/users");
    // backend: { message, data: [...] }
    return res.data?.data || [];
  } catch (err) {
    // kalau kosong, backend balikin 404 + data: []
    if (err.response && err.response.status === 404) {
      return [];
    }
    throw err;
  }
}

export async function deleteUser(id) {
  const res = await api.delete(`/users/${id}`);
  return res.data;
}
