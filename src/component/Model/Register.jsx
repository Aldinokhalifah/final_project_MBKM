import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_URL_BACKEND}/api/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Registration failed");
      }

      setSuccess("Registrasi berhasil! Silakan masuk.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Gagal registrasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "#FFFFFF", padding: "16px" }}
    >
      <div
        className="bg-white rounded-4"
        style={{
          maxWidth: "460px",
          width: "100%",
          border: "1px solid #e5e7eb",
          boxShadow: "0 12px 32px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
          padding: "32px",
        }}
      >
        {/* Header */}
        <div className="mb-3 text-center text-lg-start">
          <span
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#4965B2",
              fontWeight: 600,
            }}
          >
            Daftar Akun Baru
          </span>
          <h2
            className="mt-2 mb-1"
            style={{
              fontSize: "1.7rem",
              fontWeight: 700,
              color: "#1e293b",
            }}
          >
            Buat akun Anda
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
            Isi data di bawah untuk mulai menggunakan aplikasi.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="alert alert-danger py-2 px-3" style={{ fontSize: "0.85rem" }}>
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success py-2 px-3" style={{ fontSize: "0.85rem" }}>
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister}>
          {/* Nama */}
          <div className="mb-3">
            <label className="form-label mb-1" style={{ fontSize: "0.85rem", color: "#334155" }}>
              Nama Lengkap
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nama lengkap"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={{
                borderRadius: "10px",
                padding: "10px 12px",
                fontSize: "0.9rem",
                borderColor: "#cbd5e1",
              }}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label mb-1" style={{ fontSize: "0.85rem", color: "#334155" }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="email@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={{
                borderRadius: "10px",
                padding: "10px 12px",
                fontSize: "0.9rem",
                borderColor: "#cbd5e1",
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label mb-1" style={{ fontSize: "0.85rem", color: "#334155" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={{
                borderRadius: "10px",
                padding: "10px 12px",
                fontSize: "0.9rem",
                borderColor: "#cbd5e1",
              }}
            />
          </div>

          {/* Konfirmasi Password */}
          <div className="mb-3">
            <label className="form-label mb-1" style={{ fontSize: "0.85rem", color: "#334155" }}>
              Konfirmasi Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Ulangi password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
              style={{
                borderRadius: "10px",
                padding: "10px 12px",
                fontSize: "0.9rem",
                borderColor: "#cbd5e1",
              }}
            />
          </div>

          {/* Tombol daftar */}
          <button
            type="submit"
            className="btn w-100"
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #4965B2, #52C8C4)",
              border: "none",
              color: "white",
              fontWeight: 600,
              padding: "10px 16px",
              borderRadius: "999px",
              fontSize: "0.95rem",
              boxShadow: "0 10px 25px rgba(73,101,178,0.35)",
            }}
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>

          <p className="mt-3 mb-0 text-center" style={{ fontSize: "0.85rem", color: "#475569" }}>
            Sudah punya akun?
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="border-0 bg-transparent ps-1"
              style={{
                color: "#4965B2",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              Masuk di sini
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
