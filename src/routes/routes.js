import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";


import Home from "../Pages/Home";
import Layout from "../component/Layout/Layout";

// Auth Pages
import Login from "../component/Model/Login";
import Register from "../component/Model/Register";

// Dashboard Pages 
import DashboardAdmin from "../Pages/DashboardAdmin";
import UserManagementAdmin from "../Pages/UserManagementAdmin";
import TransaksiPage from "../Pages/TransaksiPage";
import OutletPage from "../Pages/OutletPage";
import CategoriesPage from "../Pages/CategoriesPage";
import LaporanPage from "../Pages/LaporanPage";

// Wrapper Sidebar (untuk dashboard)
import Sidebar from "../component/Sidebar";



function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const handleLogout= () => {
    localStorage.clear();
    navigate('/login');
  }
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;

  return (
    <>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar 
          active="" 
          onLogout={handleLogout}
          role={user.role}
          onNavigate={(path) => navigate(path)}
        />
        
        <div 
          style={{ 
            flexGrow: 1, 
            padding: "20px",
            width: "100%",
            overflowX: "hidden"
          }}
          className="main-content"
        >
          {children}
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .main-content {
            margin-left: 240px !important;
            width: calc(100% - 240px) !important;
          }
        }
        @media (max-width: 991px) {
          .main-content {
            margin-left: 0 !important;
            width: 100% !important;
            padding-top: 70px !important;
          }
        }
        body { overflow-x: hidden; }
      `}</style>
    </>
  );
}

function AutoDashboardRedirect() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;

  return user.role === "admin"
    ? <Navigate to="/dashboard/admin" />
    : <Navigate to="/dashboard/user/transaksi" />;
}

export const routes = createBrowserRouter([

  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Home /> }],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  
  {
    path: "/dashboard",
    element: <AutoDashboardRedirect />,
  },

  {
    path: "/dashboard/admin",
    element: (
      <DashboardLayout>
        <DashboardAdmin />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/admin/users",
    element: (
      <DashboardLayout>
        <UserManagementAdmin />
      </DashboardLayout>
    ),
  },

  
  {
    path: "/dashboard/user/transaksi",
    element: (
      <DashboardLayout>
        <TransaksiPage />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/user/outlet",
    element: (
      <DashboardLayout>
        <OutletPage />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/user/categories",
    element: (
      <DashboardLayout>
        <CategoriesPage />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/user/laporan",
    element: (
      <DashboardLayout>
        <LaporanPage />
      </DashboardLayout>
    ),
  },

  
  {
    path: "/admin/dashboard",
    element: (
      <DashboardLayout>
        <DashboardAdmin />
      </DashboardLayout>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <DashboardLayout>
        <UserManagementAdmin />
      </DashboardLayout>
    ),
  },

  // USER
  {
    path: "/transaksi",
    element: (
      <DashboardLayout>
        <TransaksiPage />
      </DashboardLayout>
    ),
  },
  {
    path: "/outlet",
    element: (
      <DashboardLayout>
        <OutletPage />
      </DashboardLayout>
    ),
  },
  {
    path: "/categories",
    element: (
      <DashboardLayout>
        <CategoriesPage />
      </DashboardLayout>
    ),
  },
  {
    path: "/laporan",
    element: (
      <DashboardLayout>
        <LaporanPage />
      </DashboardLayout>
    ),
  },
]);
