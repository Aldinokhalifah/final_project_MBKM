// src/Pages/OutletPage.jsx (atau sesuai path kamu)
import React, { useEffect, useState } from "react";
import { getOutlets, addOutlet, deleteOutlet, updateOutlet } from "../apinew";
import { Edit2, Trash2 } from "lucide-react";

export default function OutletPage() {
  // Ambil user login dari localStorage
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const ownerId = currentUser?.user_id || currentUser?.id || "";

  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    outlet_id: null,
    owner_id: ownerId, // auto set
    name: "",
    address: "",
  });

  const resetForm = () =>
    setForm({
      outlet_id: null,
      owner_id: ownerId,
      name: "",
      address: "",
    });

  const load = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getOutlets();
      // kemungkinan:
      // - res = [ {...} ]
      // - res = { data: [ {...} ] }
      const list = Array.isArray(res) ? res : res?.data ?? [];

      setOutlets(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Gagal load outlet:", err);
      setError(
        err.response?.data?.message || err.message || "Gagal memuat data outlet"
      );
      setOutlets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!form.name) return alert("Nama outlet wajib diisi");

    const payload = {
      owner_id: ownerId, // pakai owner auto
      name: form.name,
      address: form.address,
    };

    try {
      setSaving(true);

      if (form.outlet_id) {
        await updateOutlet(form.outlet_id, payload);
      } else {
        await addOutlet(payload);
      }

      resetForm();
      await load();
    } catch (err) {
      console.error("Gagal simpan outlet:", err);
      alert(
        err.response?.data?.message || err.message || "Gagal menyimpan outlet"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (o) => {
    setForm({
      outlet_id: o.outlet_id,
      owner_id: ownerId, // tetap pakai owner login
      name: o.name || "",
      address: o.address || "",
    });
  };

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (!window.confirm("Yakin ingin menghapus outlet ini?")) return;

    try {
      await deleteOutlet(id);
      await load();
    } catch (err) {
      console.error("Gagal hapus outlet:", err);
      alert(
        err.response?.data?.message || err.message || "Gagal menghapus outlet"
      );
    }
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
        <h2 className="fw-bold mb-0" style={{ letterSpacing: "1px" }}>
          🏪 Kelola Outlet
        </h2>
      </div>

      {/* FORM */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="mb-3 fw-semibold">
            {form.outlet_id ? "Edit Outlet" : "Tambah Outlet"}
          </h5>

          <div className="row g-3">
            {/* OWNER ID AUTO & DISABLED */}
            <div className="col-md-3">
              <input
                className="form-control"
                value={ownerId}
                disabled
                readOnly
                style={{ background: "#e9ecef" }}
              />
              <small className="text-muted">
                Owner otomatis: User ID {ownerId || "-"}
              </small>
            </div>

            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Nama Outlet"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="col-md-5">
              <input
                className="form-control"
                placeholder="Alamat Outlet"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>

            <div className="col-md-3 d-flex gap-2">
              <button
                className="btn btn-primary w-100"
                onClick={handleAddOrUpdate}
                disabled={saving}
              >
                {saving
                  ? "Menyimpan..."
                  : form.outlet_id
                  ? "Simpan"
                  : "Tambah Outlet"}
              </button>

              {form.outlet_id && (
                <button
                  className="btn btn-secondary w-100"
                  onClick={resetForm}
                  type="button"
                >
                  Batal
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LIST OUTLET */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">Daftar Outlet</h5>

          {loading ? (
            <p className="text-muted text-center">Memuat data...</p>
          ) : (
            <ul className="list-group">
              {Array.isArray(outlets) && outlets.length > 0 ? (
                outlets.map((o) => (
                  <li
                    key={o.outlet_id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{o.name}</strong>
                      <br />
                      <small className="text-muted">
                        {o.address || "Alamat belum diisi"}
                      </small>
                      <br />
                      <small>Owner ID: {o.owner_id}</small>
                    </div>

                    <div>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(o)}
                      >
                        <Edit2 size={16}/>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(o.outlet_id)}
                      >
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center text-muted">
                  Belum ada outlet
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
