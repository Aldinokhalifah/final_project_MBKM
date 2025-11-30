import React, { useState } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../apiClient";
import aboutImg from "../../assets/img/about_img_1.png";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const shakeX = useMotionValue(0);

  const handleTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rotateX = (e.clientY - rect.top - rect.height / 2) / 25;
    const rotateY = -(e.clientX - rect.left - rect.width / 2) / 25;
    setTilt({ x: rotateX, y: rotateY });
  };

  const triggerShake = () => {
    animate(shakeX, [0, -12, 12, -8, 8, -4, 4, 0], {
      duration: 0.5,
      ease: "easeInOut",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      // SESUAIKAN PATH INI DENGAN baseURL DI apiClient
      // kalau baseURL = `${REACT_APP_URL_BACKEND}/api` → cukup "/login"
      // kalau baseURL = `${REACT_APP_URL_BACKEND}` → pakai "/api/login"
      const res = await api.post("/login", {
        email: form.email,
        password: form.password,
      });

      console.log("Login response:", res.data);

      // Biar fleksibel dengan struktur respons
      const token =
        res.data.token ||
        res.data.access_token ||
        res.data.jwt ||
        res.data?.data?.token ||
        null;

      const user =
        res.data.user ||
        res.data.data?.user ||
        res.data.data ||
        {};

      if (token) {
        localStorage.setItem("token", token);
      }

      if (user && Object.keys(user).length > 0) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      const role = user.role || res.data.role;

      navigate(
        role === "admin" ? "/dashboard/admin" : "/dashboard/user/transaksi"
      );
    } catch (err) {
      console.error("Login error:", err);

      const msg =
        err.response?.data?.message ||
        err.message ||
        "Login gagal, periksa kembali email/password";

      setError(msg);
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        padding: "16px",
        background: "#ffffff", // background putih
      }}
    >
      <motion.div
        className="rounded-4 overflow-hidden bg-white"
        style={{
          x: shakeX,
          maxWidth: "900px",
          width: "100%",
          transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.12s ease-out",
          border: "1px solid #e5e7eb",
          boxShadow:
            "0 12px 32px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
        }}
        onMouseMove={handleTilt}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <div className="row g-0 flex-column flex-lg-row">
          {/* Left Image */}
          <div className="col-lg-5 d-none d-lg-block">
            <div
              style={{
                height: "100%",
                background: "linear-gradient(180deg, #4965B2 0%, #52C8C4 95%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px",
              }}
            >
              <img
                src={aboutImg}
                alt="Login Illustration"
                style={{
                  width: "100%",
                  maxWidth: "360px",
                  borderRadius: "16px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                }}
              />
            </div>
          </div>

          {/* Right Form */}
          <div className="col-12 col-lg-7">
            <div className="p-4 p-lg-5">
              <span
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#4965B2",
                  fontWeight: 600,
                }}
              >
                Selamat Datang
              </span>

              <h2
                className="mt-2 mb-1"
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "#1e293b",
                }}
              >
                Masuk ke akun Anda
              </h2>

              <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                Silakan masukkan email dan password Anda.
              </p>

              {error && (
                <motion.div
                  className="alert alert-danger py-2"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleLogin}>
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#334155" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                    style={{
                      borderRadius: "10px",
                      padding: "10px 12px",
                      borderColor: "#cbd5e1",
                    }}
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#334155" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                    style={{
                      borderRadius: "10px",
                      padding: "10px 12px",
                      borderColor: "#cbd5e1",
                    }}
                  />
                </div>

                {/* Button */}
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
                  {loading ? "Memproses..." : "Masuk"}
                </button>

                <p
                  className="mt-3 mb-0 text-center"
                  style={{ color: "#475569", fontSize: "0.85rem" }}
                >
                  Belum punya akun?
                  <motion.button
                    type="button"
                    whileHover={{ opacity: 0.7, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/register")}
                    className="border-0 bg-transparent ps-1"
                    style={{
                      color: "#4965B2",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Daftar di sini
                  </motion.button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
