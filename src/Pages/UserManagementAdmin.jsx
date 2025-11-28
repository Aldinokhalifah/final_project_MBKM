import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { getUsers, deleteUser } from "../apinew";

export default function UserManagementAdmin() {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const rawUser = localStorage.getItem("user");
  const currentUser = rawUser ? JSON.parse(rawUser) : null;
  const isAdmin = currentUser?.role === "admin";

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const list = await getUsers();
      setUsers(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Gagal load users:", err);
      setError(
        err.response?.data?.message || err.message || "Gagal memuat daftar user"
      );
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteUser(deleteId);
      await loadUsers();
    } catch (err) {
      console.error("Gagal hapus user:", err);
      alert(
        err.response?.data?.message || err.message || "Gagal menghapus user"
      );
    } finally {
      closeDeleteModal();
    }
  };

  // Kalau bukan admin, jangan boleh masuk
  if (!isAdmin) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          Kamu tidak memiliki akses ke halaman manajemen user.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div
        className="text-center p-4 rounded-4 shadow-sm mb-4"
        style={{
          background: "linear-gradient(90deg, #3B82F6, #60A5FA)",
          color: "white",
        }}
      >
        <h2 className="fw-bold mb-1" style={{ letterSpacing: "1px" }}>
          👥 Kelola User
        </h2>
        <p style={{ opacity: "0.9" }}>
          Admin dapat melihat dan menghapus user.
        </p>
        {error && (
          <p className="mt-2 mb-0" style={{ fontSize: "0.9rem" }}>
            {error}
          </p>
        )}
      </div>

      {/* CARD */}
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body">
          {/* TITLE */}
          <h4
            className="fw-semibold text-center mb-4"
            style={{ color: "#3B82F6" }}
          >
            Daftar User Terdaftar
          </h4>

          {/* TABLE */}
          <div className="table-responsive">{/* Bootstrap responsive wrapper - enables horizontal scroll on small screens */}
          <table className="table table-hover align-middle" style={{ minWidth: '700px' }}>
            <thead
              className="text-center"
              style={{
                backgroundColor: "#3B82F6",
                color: "white",
                fontSize: "15px",
              }}
            >
              <tr>
                <th style={{ width: "60px", color: 'white' }}>User ID</th>
                <th style={{ width: "60px", color: 'white' }}>Nama</th>
                <th style={{ width: "60px", color: 'white' }}>Email</th>
                <th style={{ width: "60px", color: 'white' }}>Role</th>
                <th style={{ width: "60px", color: 'white' }}>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Memuat data user...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <div className="text-muted">
                      <strong>Belum ada user terdaftar.</strong>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr
                    key={u.user_id}
                    style={{ transition: "0.2s" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#F0F7FF")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "white")
                    }
                  >
                    <td className="text-center fw-bold text-secondary">
                      {u.user_id}
                    </td>
                    <td className="fw-semibold">{u.name}</td>
                    <td>{u.email}</td>
                    <td className="text-center text-capitalize">
                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                          backgroundColor: "#E0EFFE",
                          color: "#1E3A8A",
                          fontWeight: "600",
                          fontSize: "13px",
                        }}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#EF4444",
                          color: "white",
                          borderRadius: "8px",
                          width: "34px",
                          height: "34px",
                        }}
                        onClick={() => openDeleteModal(u.user_id)}
                      >
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

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">Yakin ingin menghapus user ini?</div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={closeDeleteModal}
                >
                  Batal
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
