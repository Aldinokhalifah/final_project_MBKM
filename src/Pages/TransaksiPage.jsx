// src/Pages/TransaksiPage.jsx
import React, { useEffect, useState } from "react";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getOutlets,
  getCategories,
} from "../apinew";
import { PlusCircle, Save, XCircle, Edit2, Trash2 } from "lucide-react";

export default function TransaksiPage() {
  // ============================
  // USER LOGIN (AUTO USER_ID)
  // ============================
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : {};
  const userId = user?.user_id || user?.id || "";

  // ============================
  // STATE
  // ============================
  const [trx, setTrx] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    id: null,
    userId: userId,
    type: "income", // ENUM: 'income' / 'expense'
    amount: "",
    description: "",
    outletId: "",
    categoryId: "",
    date: "",
  });

  const resetForm = () =>
    setForm({
      id: null,
      userId: userId,
      type: "income",
      amount: "",
      description: "",
      outletId: "",
      categoryId: "",
      date: "",
    });

  // ============================
  // LOAD DATA (DIPISAH)
  // ============================
  const load = async () => {
    setLoading(true);
    setError("");

    // 1) Outlets & Categories dulu
    try {
      const [o, c] = await Promise.all([getOutlets(), getCategories()]);

      console.log("OUTLETS RAW >>>", o);
      console.log("CATEGORIES RAW >>>", c);

      setOutlets(Array.isArray(o) ? o : []);
      setCategories(Array.isArray(c) ? c : []);
    } catch (err) {
      console.error("Gagal load outlet/kategori:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal memuat outlet/kategori"
      );
      setOutlets([]);
      setCategories([]);
    }

    // 2) Transactions → kalau error, JANGAN ganggu outlet/kategori
    try {
      const t = await getTransactions();
      console.log("TRANSACTIONS RAW >>>", t);
      setTrx(Array.isArray(t) ? t : []);
    } catch (err) {
      console.error("Gagal load transaksi:", err);
      // tambahin info tapi jangan clear outlets/categories
      setError((prev) =>
        prev ? prev + " | Gagal memuat transaksi" : "Gagal memuat transaksi"
      );
      setTrx([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============================
  // HANDLE SIMPAN / UPDATE
  // ============================
  const handleAddOrUpdate = async () => {
    if (!form.outletId) return alert("Outlet wajib dipilih");
    if (!form.categoryId) return alert("Kategori wajib dipilih");
    if (!form.date) return alert("Tanggal wajib diisi");
    if (!form.amount) return alert("Jumlah wajib diisi");

    const data = new FormData();
    data.append("user_id", userId);
    data.append("type", form.type); // 'income' / 'expense'
    data.append("amount", form.amount);
    data.append("description", form.description);
    data.append("outlet_id", form.outletId);
    data.append("category_id", form.categoryId);
    data.append("date", form.date);

    try {
      setSaving(true);
      setError("");

      if (form.id) {
        await updateTransaction(form.id, data);
      } else {
        await addTransaction(data);
      }

      resetForm();
      await load();
    } catch (err) {
      console.error("Gagal simpan transaksi:", err);
      alert(
        err.response?.data?.message ||
          err.message ||
          "Gagal menyimpan transaksi"
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================
  // HANDLE EDIT
  // ============================
  const handleEdit = (t) => {
    setForm({
      id: t.transaction_id,
      userId: t.user_id,
      type: t.type, // 'income' / 'expense'
      amount: t.amount,
      description: t.description || "",
      outletId: t.outlet_id || t.outlet?.outlet_id || "",
      categoryId: t.category_id || t.category?.category_id || "",
      date: t.date ? String(t.date).split("T")[0] : "",
    });
  };

  // ============================
  // HANDLE DELETE
  // ============================
  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (!window.confirm("Yakin hapus transaksi ini?")) return;

    try {
      await deleteTransaction(id);
      await load();
    } catch (err) {
      console.error("Gagal hapus transaksi:", err);
      alert(
        err.response?.data?.message ||
          err.message ||
          "Gagal menghapus transaksi"
      );
    }
  };

  // ============================
  // HELPER LABEL TYPE
  // ============================
  const getTypeLabel = (type) => {
    if (type === "income") return "pemasukan";
    if (type === "expense") return "pengeluaran";
    return type;
  };

  const getTypeBadgeClass = (type) => {
    if (type === "income") return "bg-success";
    if (type === "expense") return "bg-danger";
    return "bg-secondary";
  };

  // ============================
  // RENDER
  // ============================
  return (
    <div className="container py-3">
      {/* HEADER */}
      <div
        className="text-center p-4 rounded-4 shadow-sm mb-4"
        style={{
          background: "linear-gradient(90deg, #3B82F6, #60A5FA)",
          color: "white",
        }}
      >
        <h2 className="fw-bold mb-0" style={{ letterSpacing: "1px" }}>
          📄 Pencatatan Transaksi
        </h2>
      </div>

      {/* FORM */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">
            {form.id ? "✏️ Edit Transaksi" : "Tambah Transaksi"}
          </h5>
          <div className="row g-3">
            {/* User ID auto + disabled */}
            <div className="col-md-3">
              <label className="form-label fw-semibold">User</label>
              <input
                className="form-control"
                value={userId}
                disabled
                readOnly
                style={{ background: "#e9ecef" }}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Jenis</label>
              <select
                className="form-select"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Jumlah</label>
              <input
                className="form-control"
                type="number"
                min="0"
                placeholder="0"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Tanggal</label>
              <input
                type="date"
                className="form-control"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Deskripsi</label>
              <input
                className="form-control"
                placeholder="Keterangan transaksi..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Outlet</label>
              <select
                className="form-select"
                value={form.outletId}
                onChange={(e) => setForm({ ...form, outletId: e.target.value })}
              >
                <option value="">Pilih Outlet</option>
                {outlets.map((o) => (
                  <option key={o.outlet_id} value={o.outlet_id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Kategori</label>
              <select
                className="form-select"
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
              >
                <option value="">Pilih Kategori</option>
                {categories.map((c) => (
                  <option key={c.category_id} value={c.category_id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
            </div>

            <div className="col-md-6 d-flex align-items-end justify-content-end">
              <button
                className={`btn ${
                  form.id ? "btn-warning" : "btn-success"
                } px-4 me-2`}
                onClick={handleAddOrUpdate}
                disabled={saving}
              >
                {form.id ? (
                  <>
                    <Save size={18} />{" "}
                    <span className="ms-1">
                      {saving ? "Menyimpan..." : "Simpan"}
                    </span>
                  </>
                ) : (
                  <>
                    <PlusCircle size={18} />{" "}
                    <span className="ms-1">
                      {saving ? "Menyimpan..." : "Tambah"}
                    </span>
                  </>
                )}
              </button>

              {form.id && (
                <button
                  className="btn btn-secondary px-4"
                  onClick={resetForm}
                  type="button"
                >
                  <XCircle size={18} /> <span className="ms-1">Batal</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm">
        <div className="card-body p-3 p-md-4">
          <h5 className="fw-semibold mb-3 fs-6 fs-md-5">📄 Daftar Transaksi</h5>
          
          {loading ? (
            <div className="text-center py-4 text-muted">
              Memuat data...
            </div>
          ) : trx.length === 0 ? (
            <div className="text-center py-4 text-muted">
              Belum ada transaksi.
            </div>
          ) : (
            <>
              {/* Desktop/Tablet View - Table */}
              <div className="table-responsive d-none d-md-block">
                <table className="table table-hover align-middle">
                  <thead className="table-primary">
                    <tr>
                      <th className="text-center">Jenis</th>
                      <th className="text-center">Jumlah</th>
                      <th className="text-center">Deskripsi</th>
                      <th className="text-center">Outlet</th>
                      <th className="text-center">Kategori</th>
                      <th className="text-center">Tanggal</th>
                      <th className="text-center" style={{ width: "130px" }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trx.map((t) => (
                      <tr key={t.transaction_id}>
                        <td>
                          <span className={`badge ${getTypeBadgeClass(t.type)}`}>
                            {getTypeLabel(t.type)}
                          </span>
                        </td>
                        <td>
                          Rp {Number(t.amount || 0).toLocaleString("id-ID")}
                        </td>
                        <td>{t.description || "-"}</td>
                        <td>{t.outlet?.name || "-"}</td>
                        <td>{t.category?.name || "-"}</td>
                        <td>
                          {t.date
                            ? new Date(t.date).toLocaleDateString("id-ID")
                            : "-"}
                        </td>
                        <td style={{textAlign: 'center'}}>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEdit(t)}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(t.transaction_id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View - Card Style */}
              <div className="d-md-none">
                {trx.map((t) => (
                  <div
                    key={t.transaction_id}
                    className="card mb-3 shadow-sm"
                    style={{ border: '1px solid #e5e7eb' }}
                  >
                    <div className="card-body p-3">
                      {/* Header: Jenis & Jumlah */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <span className={`badge ${getTypeBadgeClass(t.type)}`}>
                          {getTypeLabel(t.type)}
                        </span>
                        <strong className="text-end" style={{ fontSize: '1.1rem', color: t.type?.toLowerCase().includes('masuk') ? '#10b981' : '#ef4444' }}>
                          Rp {Number(t.amount || 0).toLocaleString("id-ID")}
                        </strong>
                      </div>

                      {/* Deskripsi */}
                      {t.description && (
                        <div className="mb-2">
                          <small className="text-muted d-block">Deskripsi</small>
                          <div>{t.description}</div>
                        </div>
                      )}

                      {/* Info Grid */}
                      <div className="row g-2 mb-3">
                        <div className="col-6">
                          <small className="text-muted d-block">Outlet</small>
                          <div className="small">{t.outlet?.name || "-"}</div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">Kategori</small>
                          <div className="small">{t.category?.name || "-"}</div>
                        </div>
                        <div className="col-12">
                          <small className="text-muted d-block">Tanggal</small>
                          <div className="small">
                            {t.date
                              ? new Date(t.date).toLocaleDateString("id-ID", {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : "-"}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="d-flex gap-2 pt-2 border-top">
                        <button
                          className="btn btn-warning btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
                          onClick={() => handleEdit(t)}
                        >
                          <Edit2 size={14}/>
                          <span>Edit</span>
                        </button>
                        <button
                          className="btn btn-danger btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
                          onClick={() => handleDelete(t.transaction_id)}
                        >
                          <Trash2 size={14}/>
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
