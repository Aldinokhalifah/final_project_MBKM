import React from "react";
import {
  ShoppingCart,
  BarChart,
  LogOut,
  Store,
  Users,
  Tags,
  Home,
  User2
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ active, onLogout, role }) {
  const navigate = useNavigate();

  const adminMenus = [
    { key: "dashboardAdmin", label: "Daftar User", path: "/admin/dashboard", icon: <Users size={18} /> },
    { key: "users", label: "Kelola User", path: "/admin/users", icon: <User2 size={18} /> },
    { key: "home", label: "Halaman Home", path: "/", icon: <Home size={18} /> },
  ];

  const userMenus = [
    { key: "home", label: "Halaman Home", path: "/", icon: <Home size={18} /> },
    { key: "transaksi", label: "Transactions", path: "/transaksi", icon: <ShoppingCart size={18} /> },
    { key: "outlet", label: "Outlets", path: "/outlet", icon: <Store size={18} /> },
    { key: "categories", label: "Categories", path: "/categories", icon: <Tags size={18} /> },
    { key: "laporan", label: "Reports", path: "/laporan", icon: <BarChart size={18} /> },
  ];

  const menus = role === "admin" ? adminMenus : userMenus;

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="d-flex flex-column text-light vh-100 p-3"
      style={{
        width: "240px",
        background: "#1B1E32",
        borderRight: "2px solid rgba(0, 150, 255, 0.35)",
      }}
    >

      <h4 className="text-center mb-4 fw-bold" style={{ color: "#9ccfff" }}>
        {role === "admin" ? "Dashboard Admin" : "Dashboard User"}
      </h4>

      {menus.map((m) => (
        <motion.button
          key={m.key}
          onClick={() => navigate(m.path)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="btn text-start mb-2 d-flex align-items-center w-100"
          style={{
            padding: "10px 12px",
            borderRadius: "10px",
            background: active === m.key ? "#007BFF" : "#24263D",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            fontWeight: active === m.key ? "600" : "400",
          }}
        >
          {m.icon}
          <span className="ms-2">{m.label}</span>
        </motion.button>
      ))}

      <div className="mt-auto">
        <hr />

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="btn w-100 d-flex align-items-center justify-content-center"
          onClick={onLogout}
          style={{
            background: "linear-gradient(90deg, #D9534F, #C9302C)",
            borderRadius: "10px",
            padding: "10px 0",
            fontWeight: "600",
          }}
        >
          <LogOut size={16} />
          <span className="ms-2">Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
