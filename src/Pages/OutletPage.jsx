import React, { useEffect, useState } from "react";
import { getOutlets, addOutlet, deleteOutlet, updateOutlet } from "../api";

export default function OutletPage() {
  const [outlets, setOutlets] = useState([]);
  const [form, setForm] = useState({
    outlet_id: null,
    name: "",
    address: "",
    owner_id: "",
  });

  const load = async () => {
    try {
      const res = await getOutlets();
      setOutlets(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Gagal load outlet:", err);
      setOutlets([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!form.owner_id) return alert("Owner ID wajib diisi");
    if (!form.name) return alert("Nama outlet wajib diisi");

    const payload = {
      owner_id: form.owner_id,
      name: form.name,
      address: form.address,
    };

    if (form.outlet_id) {
      await updateOutlet(form.outlet_id, payload);
    } else {
      await addOutlet(payload);
    }

    setForm({ outlet_id: null, name: "", address: "", owner_id: "" });
    load();
  };

  const handleEdit = (o) => {
    setForm({
      outlet_id: o.outlet_id,
      owner_id: o.owner_id,
      name: o.name,
      address: o.address,
    });
  };

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Yakin ingin menghapus outlet ini?")) {
      await deleteOutlet(id);
      load();
    }
  };

  return (
    <div className="container py-4">
      <div
        className="text-center p-4 rounded-4 shadow-sm mb-4"
        style={{ background: "linear-gradient(90deg, #3B82F6, #60A5FA)", color: "white" }}
      >
        <h2 className="fw-bold mb-0" style={{ letterSpacing: "1px" }}>
          🏪 Kelola Outlet
        </h2>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="mb-3 fw-semibold">{form.outlet_id ? "Edit Outlet" : "Tambah Outlet"}</h5>

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

            <div className="col-md-3">
              <button className="btn btn-primary w-100" onClick={handleAddOrUpdate}>
                {form.outlet_id ? "Simpan Perubahan" : "Tambah Outlet"}
              </button>
            </div>

            {form.outlet_id && (
              <div className="col-md-3">
                <button
                  className="btn btn-secondary w-100"
                  onClick={() => setForm({ outlet_id: null, name: "", address: "", owner_id: "" })}
                >
                  Batal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">Daftar Outlet</h5>

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
                    <small className="text-muted">{o.address}</small>
                    <br />
                    <small>Owner ID: {o.owner_id}</small>
                  </div>

                  <div>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(o)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(o.outlet_id)}>
                      Hapus
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item text-center text-muted">Tidak ada outlet</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
