import React, { useState } from "react";
import { motion } from "framer-motion";
import { registerUser } from "../../apinew";
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
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rotateX = (e.clientY - rect.top - rect.height / 2) / 20;
    const rotateY = -(e.clientX - rect.left - rect.width / 2) / 20;
    setTilt({ x: rotateX, y: rotateY });
  };

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
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setSuccess("Pendaftaran berhasil! Mengalihkan ke halaman login...");
      // kasih jeda dikit buat user baca pesan sukses
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      console.error(err);

      // Ambil pesan error dari Laravel (validation / custom message)
      let msg =
        err.response?.data?.message || err.message || "Gagal registrasi";

      // Kalau Laravel kirim errors: { email: [...], password: [...] }
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const firstKey = Object.keys(errors)[0];
        if (firstKey && errors[firstKey][0]) {
          msg = errors[firstKey][0];
        }
      }

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#FFFFFF" }}
    >
      <motion.div
        className="cs-modal_container p-4"
        style={{
          width: "450px",
          background: "#fff",
          borderRadius: "14px",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.12s",
          boxShadow: `
            ${tilt.y * 4}px ${tilt.x * 4}px 25px rgba(0,0,0,0.2),
            0 0 25px rgba(0,150,255,0.3),
            0 0 40px rgba(0,150,255,0.1)
          `,
          border: "1px solid rgba(0,150,255,0.25)",
        }}
        onMouseMove={handleTilt}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <form onSubmit={handleRegister}>
          <h2 className="mb-3">Buat Akun Baru</h2>

          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          <input
            type="text"
            className="cs-form_field cs-border_color"
            placeholder="Nama Lengkap"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <div className="cs-height_20"></div>

          <input
            type="email"
            className="cs-form_field cs-border_color"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <div className="cs-height_20"></div>

          <input
            type="password"
            className="cs-form_field cs-border_color"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <div className="cs-height_20"></div>

          <input
            type="password"
            className="cs-form_field cs-border_color"
            placeholder="Konfirmasi Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            required
          />

          <div className="cs-height_20"></div>

          <button className="cs-btn w-100">
            {loading ? (
              <span>Loading...</span>
            ) : (
              <span>Daftar</span>
            )}
          </button>

          <p className="mt-3 text-center">
            Sudah punya akun?
            <span
              className="cs-text_btn"
              style={{
                cursor: "pointer",
                color: "#007bff",
                fontWeight: "bold",
                marginLeft: "5px",
              }}
              onClick={() => navigate("/login")}
            >
              Masuk
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
