import React, { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    category_id: null,
    owner_id: "",
    name: "",
    type: "",
  });

  const load = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Gagal load kategori:", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!form.owner_id) return alert("Owner ID wajib diisi");
    if (!form.name) return alert("Nama kategori wajib diisi");
    if (!form.type) return alert("Tipe wajib dipilih");

    const payload = {
      owner_id: form.owner_id,
      name: form.name,
      type: form.type,
    };

    if (form.category_id) {
      await updateCategory(form.category_id, payload);
    } else {
      await addCategory(payload);
    }

    setForm({ category_id: null, owner_id: "", name: "", type: "" });
    load();
  };

  const handleEdit = (c) => {
    setForm({
      category_id: c.category_id,
      owner_id: c.owner_id,
      name: c.name,
      type: c.type,
    });
  };

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Yakin ingin menghapus kategori ini?")) {
      await deleteCategory(id);
      load();
    }
  };

  return (
    <div className="container py-4">
      {/* HEADER GRADIENT */}
      <div
        className="text-center p-4 rounded-4 shadow-sm mb-4"
        style={{ background: "linear-gradient(90deg, #3B82F6, #60A5FA)", color: "white" }}
      >
        <h2 className="fw-bold mb-0" style={{ letterSpacing: "1px" }}>
          📂 Kelola Kategori
        </h2>
      </div>

      {/* FORM INPUT */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">
            {form.category_id ? "Edit Kategori" : "Tambah Kategori"}
          </h5>

          <div className="row g-3">
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Owner ID"
                value={form.owner_id}
                onChange={(e) => setForm({ ...form, owner_id: e.target.value })}
              />
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
                <option value="pemasukan">Pemasukan</option>
                <option value="pengeluaran">Pengeluaran</option>
              </select>
            </div>

            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={handleAddOrUpdate}>
                {form.category_id ? "Simpan" : "Tambah"}
              </button>
            </div>

            {form.category_id && (
              <div className="col-md-2">
                <button
                  className="btn btn-secondary w-100"
                  onClick={() => setForm({ category_id: null, owner_id: "", name: "", type: "" })}
                >
                  Batal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LIST CATEGORY */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">Daftar Kategori</h5>

          <ul className="list-group">
            {categories.length > 0 ? (
              categories.map((c) => (
                <li
                  key={c.category_id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{c.name}</strong> — {c.type}
                    <br />
                    <small className="text-muted">Owner: {c.owner_id}</small>
                  </div>

                  <div>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(c)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.category_id)}>
                      Hapus
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item text-center text-muted">Belum ada kategori</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
