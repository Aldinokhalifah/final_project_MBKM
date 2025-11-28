// src/Pages/DashboardAdmin.jsx (atau path-mu sekarang)
import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../apinew";

export default function DashboardAdmin() {
  const [users, setUsers] = useState([]);
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

  // Kalau bukan admin, jangan kasih akses
  if (!isAdmin) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          Kamu tidak memiliki akses ke Dashboard Admin.
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
        <h2
          className="fw-bold mb-1"
          style={{ letterSpacing: "1px", fontSize: "28px" }}
        >
          📊 Dashboard Admin
        </h2>
        <p className="mb-0" style={{ opacity: "0.9" }}>
          Lihat semua user terdaftar.
        </p>
        {error && (
          <p className="mt-2 mb-0" style={{ fontSize: "0.9rem" }}>
            {error}
          </p>
        )}
      </div>

      {/* CARD */}
      <div
        className="card border-0 shadow-lg rounded-4"
        style={{ overflow: "hidden" }}
      >
        <div className="card-body">
          {/* TITLE */}
          <h4
            className="fw-semibold text-center mb-4"
            style={{ color: "#3B82F6" }}
          >
            👥 Daftar User Terdaftar
          </h4>

          {/* TABLE */}
          <div className="table-responsive" style={{ overflowX: "auto" }}>
            <table
              className="table table-hover align-middle"
              style={{ minWidth: "700px" }}
            >
              <thead
                style={{
                  backgroundColor: "#3B82F6",
                  color: "white",
                  fontSize: "15px",
                }}
                className="text-center"
              >
                <tr>
                  <th style={{ width: "60px", color: "white" }}>ID</th>
                  <th style={{ width: "60px", color: "white" }}>Nama</th>
                  <th style={{ width: "60px", color: "white" }}>Email</th>
                  <th style={{ width: "60px", color: "white" }}>Role</th>
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
                        <br />
                        User baru akan muncul setelah registrasi.
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((u, i) => (
                    <tr
                      key={u.user_id || i}
                      style={{
                        transition: "0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#F3F7FF")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "white")
                      }
                    >
                      <td className="text-center fw-bold text-secondary">
                        {i + 1}
                      </td>
                      <td className="fw-semibold">{u.name}</td>
                      <td>{u.email}</td>
                      <td className="text-center">
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
