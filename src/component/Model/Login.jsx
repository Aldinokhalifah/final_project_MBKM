import React, { useState } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import api from "../../apiClient";
import { useNavigate } from "react-router-dom";
import aboutImg from "../../assets/img/about_img_1.png";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const shakeX = useMotionValue(0);

  const handleTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rotateX = (e.clientY - rect.top - rect.height / 2) / 20;
    const rotateY = -(e.clientX - rect.left - rect.width / 2) / 20;
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
      const res = await api.post("/login", {
        email: form.email,
        password: form.password,
      });

      console.log("Login response:", res.data);

      const token =
        res.data.access_token || res.data.token || res.data.jwt || null;

      const user = res.data.user || res.data.data || {};

      if (token) {
        localStorage.setItem("token", token);
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      const role = user.role || res.data.role;

      if (role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user/transaksi");
      }
    } catch (err) {
      console.error(err);

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
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        padding: "16px",
      }}
    >
      <motion.div
        className="cs-modal_container cs-white_bg p-4 p-md-5"
        animate={{ x: shakeX }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "900px", // ⬅️ biar responsif
          borderRadius: "16px",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.12s",
          boxShadow: `${tilt.y * 4}px ${tilt.x * 4}px 25px rgba(0,0,0,0.2),
                      0 0 25px rgba(0,150,255,0.3),
                      0 0 40px rgba(0,150,255,0.1)`,
          border: "1px solid rgba(0,150,255,0.25)",
          background: "#fff",
        }}
        onMouseMove={handleTilt}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <div className="cs-login d-flex flex-column flex-md-row">
          {/* Left Image */}
          <div className="mb-3 mb-md-0 d-none d-md-block" style={{ flex: 1 }}>
            <img
              src={aboutImg}
              alt="Login"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Right Form */}
          <div style={{ flex: 1 }} className="ps-md-4">
            <form onSubmit={handleLogin}>
              <h2 className="mb-2 mb-md-3 text-center text-md-start">
                Masuk Ke Akun Anda
              </h2>

              {error && (
                <motion.div
                  className="alert alert-danger py-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}

              <input
                type="email"
                className="cs-form_field cs-border_color mb-3"
                placeholder="Alamat Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />

              <input
                type="password"
                className="cs-form_field cs-border_color mb-3"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />

              <button className="cs-btn cs-size_md w-100">
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <span>Masuk</span>
                )}
              </button>

              <p className="mt-3 text-center">
                Tidak punya akun?
                <motion.span
                  className="cs-text_btn"
                  style={{
                    cursor: "pointer",
                    color: "#007bff",
                    marginLeft: "5px",
                    fontWeight: "bold",
                  }}
                  whileHover={{ opacity: 0.6 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/register")}
                >
                  Daftar di sini
                </motion.span>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
