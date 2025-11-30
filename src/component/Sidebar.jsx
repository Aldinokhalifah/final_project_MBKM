import React, { useState } from "react";
import {
  ShoppingCart,
  BarChart,
  LogOut,
  Store,
  Users,
  Tags,
  Home,
  User2,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar({ active, onLogout, role, onNavigate }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const adminMenus = [
    {
      key: "dashboardAdmin",
      label: "Daftar User",
      path: "/admin/dashboard",
      icon: <Users size={18} />,
    },
    {
      key: "users",
      label: "Kelola User",
      path: "/admin/users",
      icon: <User2 size={18} />,
    },
    {
      key: "home",
      label: "Home",
      path: "/",
      icon: <Home size={18} />,
    },
  ];

  const userMenus = [
    { key: "home", label: "Home", path: "/", icon: <Home size={18} /> },
    {
      key: "transaksi",
      label: "Transactions",
      path: "/transaksi",
      icon: <ShoppingCart size={18} />,
    },
    { key: "outlet", label: "Outlets", path: "/outlet", icon: <Store size={18} /> },
    {
      key: "categories",
      label: "Categories",
      path: "/categories",
      icon: <Tags size={18} />,
    },
    {
      key: "laporan",
      label: "Reports",
      path: "/laporan",
      icon: <BarChart size={18} />,
    },
  ];

  const menus = role === "admin" ? adminMenus : userMenus;

  const handleNavigate = (path) => {
    // FIX
    if (path === "/") {
      window.location.href = "/";
      return;
    }

    // Route lain tetap lewat React Router (SPA)
    if (onNavigate) {
      onNavigate(path);
    }
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsMobileOpen(false);
  };

  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "1.5rem 1rem" }}>
        <h4
          style={{
            textAlign: "center",
            marginBottom: 0,
            fontWeight: "bold",
            color: "#9ccfff",
            fontSize: "1.1rem",
          }}
        >
          {role === "admin" ? "Dashboard Admin" : "Dashboard User"}
        </h4>
      </div>

      {/* Menu Items - Scrollable */}
      <div
        style={{
          flexGrow: 1,
          padding: "0 1rem",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.2) transparent",
        }}
      >
        {menus.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => handleNavigate(m.path)}
            style={{
              width: "100%",
              padding: "10px 12px",
              marginBottom: "0.5rem",
              borderRadius: "10px",
              background: active === m.key ? "#007BFF" : "#24263D",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              fontWeight: active === m.key ? "600" : "400",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              if (active !== m.key) {
                e.currentTarget.style.background = "#2d3050";
              }
            }}
            onMouseLeave={(e) => {
              if (active !== m.key) {
                e.currentTarget.style.background = "#24263D";
              }
            }}
          >
            {m.icon}
            <span style={{ marginLeft: "0.5rem" }}>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Logout Button - Fixed at Bottom */}
      <div style={{ padding: "0 1rem 1rem" }}>
        <hr
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            margin: "1rem 0",
          }}
        />
        <button
          type="button"
          onClick={handleLogout}
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #D9534F, #C9302C)",
            borderRadius: "10px",
            padding: "10px 0",
            fontWeight: "600",
            color: "white",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <LogOut size={16} />
          <span style={{ marginLeft: "0.5rem" }}>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button - Only visible on mobile */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 1100,
          background: "#1B1E32",
          border: "2px solid rgba(0, 150, 255, 0.35)",
          color: "white",
          borderRadius: "10px",
          padding: "10px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
        className="d-lg-none"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Sidebar - Always visible on desktop */}
      <aside
        className="d-none d-lg-flex"
        style={{
          width: "240px",
          height: "100vh",
          background: "#1B1E32",
          borderRight: "2px solid rgba(0, 150, 255, 0.35)",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          color: "white",
          flexShrink: 0,
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Overlay - Only when menu is open */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
          className="d-lg-none"
        />
      )}

      {/* Mobile Sidebar - Slides from left */}
      {isMobileOpen && (
        <div
          className="d-lg-none"
          style={{
            width: "240px",
            height: "100vh",
            background: "#1B1E32",
            borderRight: "2px solid rgba(0, 150, 255, 0.35)",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1100,
            color: "white",
            animation: "slideIn 0.3s ease-in-out",
          }}
        >
          <SidebarContent />
        </div>
      )}
    </>
  );
}
