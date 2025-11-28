import React, { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../apinew";
import { Edit2, Trash2 } from "lucide-react";


export default function CategoriesPage() {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // OWNER ID AUTO
  const ownerId = currentUser?.user_id || currentUser?.id || "";

  const [form, setForm] = useState({
    category_id: null,
    owner_id: ownerId, // AUTO SET
    name: "",
    type: "",
  });

  const resetForm = () =>
    setForm({
      category_id: null,
      owner_id: ownerId, // tetap auto-set
      name: "",
      type: "",
    });

  const load = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      const list = Array.isArray(res) ? res : res?.data ?? [];
      setCategories(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Gagal load kategori:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal memuat data kategori"
      );
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!form.name) return alert("Nama kategori wajib diisi");
    if (!form.type) return alert("Tipe wajib dipilih");

    const payload = {
      owner_id: ownerId, // PAKAI AUTO OWNER ID
      name: form.name,
      type: form.type, // "income" / "expense"
    };

    try {
      setSaving(true);

      if (form.category_id) {
        await updateCategory(form.category_id, payload);
      } else {
        await addCategory(payload);
      }

      resetForm();
      load();
    } catch (err) {
      console.error("Gagal simpan kategori:", err);
      alert(
        err.response?.data?.message || err.message || "Gagal menyimpan kategori"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (c) => {
    setForm({
      category_id: c.category_id,
      owner_id: ownerId, // tetap AUTO
      name: c.name,
      type: c.type,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus kategori ini?")) return;

    try {
      await deleteCategory(id);
      load();
    } catch (err) {
      console.error("Gagal hapus kategori:", err);
      alert(
        err.response?.data?.message || err.message || "Gagal menghapus kategori"
      );
    }
  };

  const getTypeLabel = (type) => {
    if (type === "income") return "pemasukan";
    if (type === "expense") return "pengeluaran";
    return type;
  };

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div
        className="text-center p-4 rounded-4 shadow-sm mb-4"
        style={{
          background: "linear-gradient(90deg, #3B82F6, #60A5FA)",
          color: "white",
        }}
      >
        <h2 className="fw-bold mb-0">📂 Kelola Kategori</h2>
        {error && (
          <p className="mt-2 mb-0" style={{ fontSize: "0.9rem" }}>
            {error}
          </p>
        )}
      </div>

      {/* FORM */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">
            {form.category_id ? "Edit Kategori" : "Tambah Kategori"}
          </h5>

          <div className="row g-3">
            {/* OWNER ID AUTO — DISABLED */}
            <div className="col-md-3">
              <input
                className="form-control"
                value={ownerId}
                disabled
                readOnly
                style={{ background: "#e9ecef" }}
              />
              <small className="text-muted">
                Owner otomatis: User ID {ownerId}
              </small>
            </div>

            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Nama Kategori"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="">Pilih Tipe</option>
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </select>
            </div>

            <div className="-md-2 d-flex gap-2">
              <button
                className="btn btn-primary"
                style={{width: '100%', height: '35px'}}
                onClick={handleAddOrUpdate}
                disabled={saving}
              >
                {saving
                  ? "Menyimpan..."
                  : form.category_id
                  ? "Simpan"
                  : "Tambah"}
              </button>

              {form.category_id && (
                <button className="btn btn-secondary" style={{width: '100%'}} onClick={resetForm}>
                  Batal
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LIST CATEGORY */}
      <div className="card shadow-sm">
        <div className="card-body p-3 p-md-4">
          <h5 className="fw-semibold mb-3 fs-6 fs-md-5">Daftar Kategori</h5>

          {/* Desktop/Tablet View */}
            {loading ? (
              <p className="text-muted text-center d-none d-md-block">Memuat data...</p>
            ) : (
              <ul className="list-group d-none d-md-block">
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <li
                      key={c.category_id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap'}}>
                          <strong>{c.name}</strong>
                          <span>—</span>
                          <span style={{ 
                            color: c.type?.toLowerCase().includes('income') ? '#10b981' : '#ef4444',
                            fontWeight: '600',
                            backgroundColor: c.type?.toLowerCase().includes('income') ? '#d1fae5' : '#fee2e2',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontSize: '0.875rem'
                          }}>
                            {getTypeLabel(c.type)}
                          </span>
                        </div>
                        <small className="text-muted d-block mt-1">
                          Owner: {c.owner_id || "-"}
                        </small>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(c)}
                        >
                          <Edit2 size={16}/>
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(c.category_id)}
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-center text-muted">
                    Belum ada kategori
                  </li>
                )}
              </ul>
            )}

          {/* Mobile View - Card Style */}
          <div className="d-md-none">
            {loading ? (
              <p className="text-muted text-center">Memuat data...</p>
            ) : (
              <div className="">
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <div
                      key={c.category_id}
                      className="card mb-2 shadow-sm"
                      style={{ border: '1px solid #e5e7eb' }}
                    >
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div style={{ flex: 1 }}>
                            <strong className="d-block mb-2" style={{ fontSize: '1rem' }}>
                              {c.name}
                            </strong>
                            <span style={{ 
                              color: c.type?.toLowerCase().includes('income') ? '#10b981' : '#ef4444',
                              fontWeight: '600',
                              backgroundColor: c.type?.toLowerCase().includes('income') ? '#d1fae5' : '#fee2e2',
                              padding: '4px 12px',
                              borderRadius: '6px',
                              fontSize: '0.813rem',
                              display: 'inline-block'
                            }}>
                              {getTypeLabel(c.type)}
                            </span>
                          </div>
                        </div>
                        
                        <small className="text-muted d-block mb-3">
                          Owner: {c.owner_id || "-"}
                        </small>
    
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-warning btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
                            onClick={() => handleEdit(c)}
                          >
                            <Edit2 size={14}/>
                            <span className="small">Edit</span>
                          </button>
                          <button
                            className="btn btn-danger btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
                            onClick={() => handleDelete(c.category_id)}
                          >
                            <Trash2 size={14}/>
                            <span className="small">Hapus</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted py-4">
                    Belum ada kategori
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
