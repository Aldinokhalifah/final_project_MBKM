import React, { useEffect, useState } from "react";
import Preloader from "../component/Preloader/Preloader";

export default function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_URL_BACKEND}/api/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
          
        if(!response.ok) {
          throw new Error('Failed to fetch users');
        }
        setUsers(data.data);
      } catch (error) {
        setError(error?.data?.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  

  return (
    <>
      {loading && (
        <Preloader />
      )}

      <div className="container mt-4">

        {/* HEADER */}
        <div
          className="text-center p-4 rounded-4 shadow-sm mb-4"
          style={{
            background: "linear-gradient(90deg, #3B82F6, #60A5FA)",
            color: "white",
          }}
        >
          <h2 className="fw-bold mb-1" style={{ letterSpacing: "1px", fontSize: "28px" }}>
            📊 Dashboard Admin
          </h2>
          <p className="mb-0" style={{ opacity: "0.9" }}>
            Lihat dan kelola semua user terdaftar.
          </p>
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
            <table className="table table-hover align-middle">
              <thead
                style={{
                  backgroundColor: "#3B82F6",
                  color: "white",
                  fontSize: "15px",
                }}
                className="text-center"
              >
                <tr>
                  <th style={{ width: "70px", color: 'white' }}>User ID</th>
                  <th style={{ width: "70px", color: 'white' }}>Nama</th>
                  <th style={{ width: "70px", color: 'white' }}>Email</th>
                  <th style={{ width: "70px", color: 'white' }}>Role</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      {error ? error : (
                        <div className="text-muted">
                          <strong>Belum ada user terdaftar.</strong>
                          <br />
                          Mulai tambahkan user melalui halaman registrasi.
                        </div>
                      )}
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.user_id}
                      style={{
                        transition: "0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#F3F7FF")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                    >
                      <td className="text-center fw-bold text-secondary">{user.user_id}</td>
                      <td className="fw-semibold">{user.name}</td>
                      <td className="text-center">{user.email}</td>
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
                          {user.role}
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
    </>
  );
}
