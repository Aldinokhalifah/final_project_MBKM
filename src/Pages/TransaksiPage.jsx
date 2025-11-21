import React, { useEffect, useState } from "react";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getOutlets,
  getCategories,
} from "../api";
import { PlusCircle, Save, XCircle, Edit2, Trash2 } from "lucide-react";

export default function TransaksiPage() {
  const [trx, setTrx] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [categories, setCategories] = useState([]);

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : {};

  const [form, setForm] = useState({
    id: null,
    userId: user.user_id,
    type: "pemasukkan",
    amount: "",
    description: "",
    outletId: "",
    categoryId: "",
    date: "",
    attachment: null,
  });

  const load = async () => {
    const [t, o, c] = await Promise.all([getTransactions(), getOutlets(), getCategories()]);
    setTrx(t.data);
    setOutlets(o.data);
    setCategories(c.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAddOrUpdate = async () => {
    const data = new FormData();
    data.append("user_id", form.userId);
    data.append("type", form.type);
    data.append("amount", form.amount);
    data.append("description", form.description);
    data.append("outlet_id", form.outletId);
    data.append("category_id", form.categoryId);
    data.append("date", form.date);
    if (form.attachment) data.append("attachment", form.attachment);

    if (form.id) {
      await updateTransaction(form.id, data);
    } else {
      await addTransaction(data);
    }

    setForm({
      id: null,
      userId: user.user_id,
      type: "pemasukkan",
      amount: "",
      description: "",
      outletId: "",
      categoryId: "",
      date: "",
      attachment: null,
    });
    load();
  };

  const handleEdit = (t) => {
    setForm({
      id: t.transaction_id,
      userId: t.user_id,
      type: t.type,
      amount: t.amount,
      description: t.description,
      outletId: t.outlet?.outlet_id || "",
      categoryId: t.category?.category_id || "",
      date: t.date ? t.date.split("T")[0] : "",
      attachment: null,
    });
  };

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Yakin hapus transaksi ini?")) {
      await deleteTransaction(id);
      load();
    }
  };

  return (
    <div className="container py-3">
      <div
        className="text-center p-4 rounded-4 shadow-sm mb-4"
        style={{ background: "linear-gradient(90deg, #3B82F6, #60A5FA)", color: "white" }}
      >
        <h2 className="fw-bold mb-0" style={{ letterSpacing: "1px" }}>
          📄 Pencatatan Transaksi
        </h2>
      </div>

      {/* FORM */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">{form.id ? "✏️ Edit Transaksi" : "Tambah Transaksi"}</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label fw-semibold">Jenis</label>
              <select className="form-select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="pemasukkan">Pemasukkan</option>
                <option value="pengeluaran">Pengeluaran</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Jumlah</label>
              <input
                className="form-control"
                type="number"
                placeholder="0"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Deskripsi</label>
              <input
                className="form-control"
                placeholder="Keterangan transaksi..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Outlet</label>
              <select className="form-select" value={form.outletId} onChange={(e) => setForm({ ...form, outletId: e.target.value })}>
                <option value="">Pilih Outlet</option>
                {outlets.map((o) => (
                  <option key={o.outlet_id} value={o.outlet_id}>{o.name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Kategori</label>
              <select className="form-select" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                <option value="">Pilih Kategori</option>
                {categories.map((c) => (
                  <option key={c.category_id} value={c.category_id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Tanggal</label>
              <input
                type="date"
                className="form-control"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Lampiran</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setForm({ ...form, attachment: e.target.files[0] })}
              />
            </div>

            <div className="col-md-6 d-flex align-items-end justify-content-end">
              <button className={`btn ${form.id ? "btn-warning" : "btn-success"} px-4 me-2`} onClick={handleAddOrUpdate}>
                {form.id ? <><Save size={18} /> <span className="ms-1">Simpan</span></> : <><PlusCircle size={18} /> <span className="ms-1">Tambah</span></>}
              </button>

              {form.id && (
                <button
                  className="btn btn-secondary px-4"
                  onClick={() =>
                    setForm({
                      id: null,
                      userId: user.user_id,
                      type: "pemasukkan",
                      amount: "",
                      description: "",
                      outletId: "",
                      categoryId: "",
                      date: "",
                      attachment: null,
                    })
                  }
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
        <div className="card-body">
          <h5 className="fw-semibold mb-3">📄 Daftar Transaksi</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Jenis</th>
                  <th>Jumlah</th>
                  <th>Deskripsi</th>
                  <th>Outlet</th>
                  <th>Kategori</th>
                  <th>Tanggal</th>
                  <th style={{ width: "130px" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {trx.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      Belum ada transaksi.
                    </td>
                  </tr>
                ) : (
                  trx.map((t) => (
                    <tr key={t.transaction_id}>
                      <td>
                        <span
                          className={`badge ${
                            t.type === "pemasukkan" ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {t.type}
                        </span>
                      </td>
                      <td>Rp {Number(t.amount).toLocaleString()}</td>
                      <td>{t.description}</td>
                      <td>{t.outlet?.name || "-"}</td>
                      <td>{t.category?.name || "-"}</td>
                      <td>{t.date ? new Date(t.date).toLocaleDateString("id-ID") : "-"}</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(t)}>
                          <Edit2 size={16} />
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t.transaction_id)}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
