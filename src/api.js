// ======================================================
// STATIC DATA (OUTLETS, CATEGORIES, TRANSACTIONS)
// ======================================================
let outlets = [
  { outlet_id: 1, name: "Outlet A", address: "Jl. Sudirman No.1" },
  { outlet_id: 2, name: "Outlet B", address: "Jl. Merdeka No.2" },
];

let categories = [
  { category_id: 1, name: "Operasional" },
  { category_id: 2, name: "Pendapatan" },
  { category_id: 3, name: "Lain-lain" },
];

let transactions = [
  {
    transaction_id: 1,
    type: "pemasukkan",
    amount: 500000,
    description: "Penjualan",
    outlet_id: 1,
    category_id: 2,
    date: new Date(),
    attachment: null,
  },
  {
    transaction_id: 2,
    type: "pengeluaran",
    amount: 200000,
    description: "Biaya Listrik",
    outlet_id: 2,
    category_id: 1,
    date: new Date(),
    attachment: null,
  },
];

// ======================================================
// SAFE LOAD USERS (ANTI CORRUPT)
// ======================================================
function loadUsers() {
  try {
    const raw = localStorage.getItem("users");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

let users = loadUsers();

// ======================================================
// AUTO CREATE ADMIN (AMANKAN DATA USER)
// ======================================================
function ensureAdminAccount() {
  users = loadUsers();

  const adminExists = users.find(
    (u) => u.email === "admin@admin.com" && u.role === "admin"
  );

  if (!adminExists) {
    const admin = {
      user_id: Date.now(),
      name: "Administrator",
      email: "admin@admin.com",
      password: "admin123",
      role: "admin",
    };
    users.push(admin);
    saveUsers(users);
  }
}

ensureAdminAccount();

// ======================================================
// REGISTER USER
// ======================================================
export function registerUser({ name, email, password, role }) {
  users = loadUsers();

  const exists = users.find(
    (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
  );
  if (exists) throw new Error("Email sudah terdaftar!");

  const newUser = {
    user_id: Date.now(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: String(password),
    role: role || "user",
  };

  users.push(newUser);
  saveUsers(users);

  return { data: { user: newUser } };
}

// ======================================================
// LOGIN USER
// ======================================================
export function loginUser({ name, email, password }) {
  users = loadUsers();

  if (!name || !email || !password) {
    throw new Error("Nama, email, dan password wajib diisi!");
  }

  const user = users.find(
    (u) =>
      u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
      u.name.trim().toLowerCase() === name.trim().toLowerCase()
  );

  if (!user) {
    throw new Error("Nama atau email tidak sesuai!");
  }

  if (user.password !== String(password)) {
    throw new Error("Password salah!");
  }

  // Validasi admin
  if (email.toLowerCase() === "admin@admin.com" && user.role !== "admin") {
    throw new Error("Akses admin ditolak!");
  }

  // Simpan user
  localStorage.setItem("token", "mock-token");
  localStorage.setItem("user", JSON.stringify(user));

  return user;
}


// ======================================================
// LOGOUT USER
// ======================================================
export function logoutUser() {
  localStorage.removeItem("token");  // hanya hapus status login
  localStorage.removeItem("user");   // opsional: hapus user yang sedang login
}


// ======================================================
// CURRENT USER
// ======================================================
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

// ======================================================
// OUTLETS CRUD
// ======================================================
export function getOutlets() {
  return { data: outlets };
}

export function addOutlet(outlet) {
  const newOutlet = { outlet_id: Date.now(), ...outlet };
  outlets.push(newOutlet);
  return { data: newOutlet };
}

export function updateOutlet(id, data) {
  outlets = outlets.map((o) => (o.outlet_id === id ? { ...o, ...data } : o));
  return { data: outlets.find((o) => o.outlet_id === id) };
}

export function deleteOutlet(id) {
  outlets = outlets.filter((o) => o.outlet_id !== id);
  return { message: "Outlet deleted" };
}

// ======================================================
// CATEGORIES CRUD
// ======================================================
export function getCategories() {
  return { data: categories };
}

export function addCategory(category) {
  const newCategory = { category_id: Date.now(), name: category.name };
  categories.push(newCategory);
  return { data: newCategory };
}

export function updateCategory(id, data) {
  categories = categories.map((c) =>
    c.category_id === id ? { ...c, ...data } : c
  );
  return { data: categories.find((c) => c.category_id === id) };
}

export function deleteCategory(id) {
  categories = categories.filter((c) => c.category_id !== id);
  return { message: "Category deleted" };
}

// ======================================================
// TRANSACTIONS CRUD
// ======================================================
export function getTransactions() {
  const data = transactions.map((t) => ({
    ...t,
    outlet: outlets.find((o) => o.outlet_id === t.outlet_id),
    category: categories.find((c) => c.category_id === t.category_id),
  }));
  return { data };
}

export function addTransaction(formData) {
  const newT = {
    transaction_id: Date.now(),
    type: formData.get("type"),
    amount: Number(formData.get("amount")),
    description: formData.get("description"),
    outlet_id: Number(formData.get("outlet_id")),
    category_id: Number(formData.get("category_id")),
    date: new Date(formData.get("date")),
    attachment: formData.get("attachment") || null,
  };
  transactions.push(newT);
  return { data: newT };
}

export function updateTransaction(id, formData) {
  transactions = transactions.map((t) =>
    t.transaction_id === id
      ? {
          ...t,
          type: formData.get("type"),
          amount: Number(formData.get("amount")),
          description: formData.get("description"),
          outlet_id: Number(formData.get("outlet_id")),
          category_id: Number(formData.get("category_id")),
          date: new Date(formData.get("date")),
          attachment: formData.get("attachment") || t.attachment,
        }
      : t
  );
  return { data: transactions.find((t) => t.transaction_id === id) };
}

export function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.transaction_id !== id);
  return { message: "Transaction deleted" };
}

// ======================================================
// SUMMARY
// ======================================================
export function getSummary() {
  const totalIn = transactions
    .filter((t) => t.type === "pemasukkan")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const totalOut = transactions
    .filter((t) => t.type === "pengeluaran")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  return {
    data: {
      pemasukkan: totalIn,
      pengeluaran: totalOut,
      laba: totalIn - totalOut,
    },
  };
}

// ======================================================
// REPORT
// ======================================================
export function generateReport({ outlet_id, period, start_date, end_date }) {
  const outlet = outlets.find((o) => o.outlet_id == outlet_id);
  const filtered = transactions.filter((t) => t.outlet_id == outlet_id);

  const income = filtered
    .filter((t) => t.type === "pemasukkan")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = filtered
    .filter((t) => t.type === "pengeluaran")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return {
    data: {
      report_id: Date.now(),
      outlet,
      outlet_id,
      period,
      start_date: start_date || null,
      end_date: end_date || null,
      total_income: income,
      total_expense: expense,
      generated_at: new Date(),
    },
  };
}
