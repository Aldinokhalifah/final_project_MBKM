import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Preloader from "../component/Preloader/Preloader";

export default function UserManagementAdmin() {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  // Load user dari localStorage
  useEffect(() => {
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
  }, [token]);

  const reloadUsers = async () => {
    try {
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
    } 
  }

  const deleteUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL_BACKEND}/api/users/${deleteId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      } 
    })

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Delete failed:", errorText);
      return;
    }

    const data = response.json();
    console.log(data.message);

    if(response.ok) {reloadUsers();}
  }

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
          <h2 className="fw-bold mb-1" style={{ letterSpacing: "1px" }}>
            👥 Kelola User
          </h2>
          <p style={{ opacity: "0.9" }}>
            Admin dapat melihat dan menghapus user.
          </p>
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
            <table className="table table-hover align-middle">
              <thead
                className="text-center"
                style={{
                  backgroundColor: "#3B82F6",
                  color: "white",
                  fontSize: "15px",
                }}
              >
                <tr>
                  <th style={{ width: "70px", color: 'white' }}>User ID</th>
                  <th style={{ width: "70px", color: 'white' }}>Nama</th>
                  <th style={{ width: "70px", color: 'white' }}>Email</th>
                  <th style={{ width: "70px", color: 'white' }}>Role</th>
                  <th style={{ width: "70px", color: 'white' }}>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
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
                      style={{ transition: "0.2s" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#F0F7FF")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "white")
                      }
                    >
                      <td className="text-center fw-bold text-secondary">
                        {user.user_id}
                      </td>
                      <td className="fw-semibold">{user.name}</td>
                      <td className="text-center">{user.email}</td>
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
                          {user.role}
                        </span>
                      </td>

                      <td className="d-flex align-items-center justify-content-center">
                        <button
                          className="btn btn-sm "
                          style={{
                            backgroundColor: "#EF4444",
                            color: "white",
                            borderRadius: "8px",
                            width: "34px",
                            height: "34px",
                          }}
                          onClick={() => {
                            setDeleteId(user.user_id);
                            setShowDeleteModal(true);
                          }}
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

        {/* DELETE MODAL */}
        {showDeleteModal && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">Yakin ingin menghapus user ini?</div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setShowDeleteModal(false);
                      deleteUser();
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
