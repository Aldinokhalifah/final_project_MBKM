import React, { useState } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";
import aboutImg from "../../assets/img/about_img_1.png";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  // ============================
  //      FINAL LOGIN HANDLER
  // ============================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_URL_BACKEND}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
        
      if (!response.ok) {
          throw new Error(response?.data?.message || 'Login failed');
      }

      Promise.all([
        localStorage.setItem("token", data.token),
        localStorage.setItem("user", JSON.stringify(data.user))
      ]);

      if (data.user.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user/transaksi");
      }

    } catch (err) {
      setError(err?.response?.data?.message || "Login gagal, periksa kembali email/password");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#FFFFFF" }}>
      <motion.div
        className="cs-modal_container cs-white_bg p-4"
        animate={{ x: shakeX }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          width: "850px",
          borderRadius: "14px",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.12s",
          boxShadow: `${tilt.y * 4}px ${tilt.x * 4}px 25px rgba(0,0,0,0.2),
                      0 0 25px rgba(0,150,255,0.3),
                      0 0 40px rgba(0,150,255,0.1)`,
          border: "1px solid rgba(0,150,255,0.25)",
        }}
        onMouseMove={handleTilt}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <div className="cs-login d-flex">

          {/* Left Image */}
          <div style={{ flex: 1 }}>
            <img
              src={aboutImg}
              alt="Login"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </div>

          {/* Right Form */}
          <div style={{ flex: 1, paddingLeft: "30px" }}>
            <form onSubmit={handleLogin} method="POST">
              <h2 className="mb-3">Masuk Ke Akun Anda</h2>

              {error && (
                <motion.div className="alert alert-danger py-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {error}
                </motion.div>
              )}

              <div className="cs-height_20"></div>

              <input
                type="email"
                className="cs-form_field cs-border_color"
                placeholder="Alamat Email"
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

              <button className="cs-btn cs-size_md w-100">
                {loading ? (
                  <span>Loading...</span>
                ) : 
                  <span>Login</span>
                }
              </button>

              <p className="mt-3 text-center">
                Tidak punya akun?
                <motion.span
                  className="cs-text_btn"
                  style={{
                    cursor: "pointer",
                    color: "#007bff",
                    marginLeft: "5px",
                    fontWeight: "bold"
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
