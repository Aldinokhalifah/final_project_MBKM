// src/Pages/LaporanPage.jsx
import React, { useState, useEffect } from "react";
import {
  getOutlets,
  createReport,
  getReports,
  deleteReport,
  exportReportPdf,
  exportAllReportPdf,
} from "../apinew";
import { Download, Trash2 } from "lucide-react";

export default function LaporanPage() {
  const [outlets, setOutlets] = useState([]);
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({
    outlet_id: "",
    period: "daily",
    start_date: "",
    end_date: "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.getFullYear() === today.getFullYear()) {
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' });
    }
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  
  // ============================
  // CUSTOM CSS FOR PURPLE BADGE
  // ============================
  useEffect(() => {
    // Inject custom CSS for purple badge
    const style = document.createElement('style');
    style.innerHTML = `
      .bg-purple {
        background-color: #9333ea !important;
        color: white !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ============================
  // LOAD OUTLETS
  // ============================
  useEffect(() => {
    loadOutlets();
    loadReports();
  }, []);

  const loadOutlets = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getOutlets();
      const list = Array.isArray(res) ? res : res?.data ?? [];
      setOutlets(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Gagal load outlet:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal memuat daftar outlet"
      );
      setOutlets([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // LOAD HISTORY REPORTS
  // ============================
  const loadReports = async () => {
    try {
      setLoading(true);
      const res = await getReports();
      const list = res?.data || res || [];
      setReports(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Gagal load reports:", err);
      // Tidak set error karena ini optional
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // LABEL PERIODE
  // ============================
  const getPeriodLabel = (p) => {
    if (p === "daily") return "Harian";
    if (p === "weekly") return "Mingguan";
    if (p === "monthly") return "Bulanan";
    return p;
  };

  // ============================
  // BADGE COLOR PERIODE
  // ============================
  const getPeriodBadgeClass = (period) => {
    if (period === "daily") return "bg-primary"; // Biru
    if (period === "weekly") return "bg-warning"; // Orange
    if (period === "monthly") return "bg-purple"; // Ungu
    return "bg-secondary";
  };

  // ============================
  // GENERATE REPORT
  // ============================
  const handleGenerate = async () => {
    if (!form.outlet_id) return alert("Pilih outlet dahulu!");
    if (!form.start_date || !form.end_date) {
      return alert("Isi tanggal mulai dan selesai!");
    }

    const payload = {
      outlet_id: form.outlet_id,
      period: form.period,
      start_date: form.start_date,
      end_date: form.end_date,
    };

    try {
      setGenerating(true);
      setError("");
      setSuccess("");

      await createReport(payload);

      setSuccess("Laporan berhasil dibuat!");
      
      // Reset form
      setForm({
        outlet_id: "",
        period: "daily",
        start_date: "",
        end_date: "",
      });

      // Reload reports list
      loadReports();
    } catch (err) {
      console.error("Gagal generate report:", err);
      setError(
        err.response?.data?.message || err.message || "Gagal membuat laporan"
      );
    } finally {
      setGenerating(false);
    }
  };

  // ============================
  // DOWNLOAD PDF (SINGLE REPORT)
  // ============================
  const handleDownloadPDF = async (reportId) => {
    try {
      setError("");
      const blob = await exportReportPdf(reportId);

      // Create download link
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report-${reportId}-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSuccess("PDF berhasil diunduh!");
    } catch (err) {
      console.error("Gagal download PDF:", err);
      setError("Gagal mengunduh PDF");
    }
  };

  // ============================
  // DOWNLOAD ALL REPORTS PDF
  // ============================
  const handleDownloadAllPDF = async () => {
    try {
      setError("");
      const blob = await exportAllReportPdf();

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `all-reports-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSuccess("PDF semua laporan berhasil diunduh!");
    } catch (err) {
      console.error("Gagal download all PDF:", err);
      setError("Gagal mengunduh PDF semua laporan");
    }
  };

  // ============================
  // DELETE REPORT
  // ============================
  const handleDelete = async (reportId) => {
    if (!window.confirm("Yakin ingin menghapus laporan ini?")) return;

    try {
      setError("");
      await deleteReport(reportId);
      setSuccess("Laporan berhasil dihapus!");
      loadReports();
    } catch (err) {
      console.error("Gagal hapus report:", err);
      setError("Gagal menghapus laporan");
    }
  };

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div
        className="text-center p-4 rounded-4 shadow-sm mb-4"
        style={{
          background: "linear-gradient(90deg, #3B82F6, #60A5FA)",
          color: "white",
        }}
      >
        <h3 className="fw-bold mb-0" style={{ letterSpacing: "1px" }}>
          📊 Laporan Keuangan
        </h3>
      </div>

      {/* ALERT */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show">
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
          ></button>
        </div>
      )}

      {success && (
        <div className="alert alert-success alert-dismissible fade show">
          {success}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccess("")}
          ></button>
        </div>
      )}

      {/* FORM GENERATE */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5 className="mb-3">🔍 Buat Laporan Baru</h5>
        <div className="row g-3">
          {/* OUTLET */}
          <div className="col-md-3">
            <label className="form-label">Outlet</label>
            <select
              className="form-select"
              value={form.outlet_id}
              onChange={(e) => setForm({ ...form, outlet_id: e.target.value })}
            >
              <option value="">-- Pilih Outlet --</option>
              {outlets.map((o) => (
                <option key={o.outlet_id} value={o.outlet_id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>

          {/* PERIODE */}
          <div className="col-md-3">
            <label className="form-label">Periode</label>
            <select
              className="form-select"
              value={form.period}
              onChange={(e) => setForm({ ...form, period: e.target.value })}
            >
              <option value="daily">Harian</option>
              <option value="weekly">Mingguan</option>
              <option value="monthly">Bulanan</option>
            </select>
          </div>

          {/* START DATE */}
          <div className="col-md-3">
            <label className="form-label">Tanggal Mulai</label>
            <input
              type="date"
              className="form-control"
              value={form.start_date}
              onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            />
          </div>

          {/* END DATE */}
          <div className="col-md-3">
            <label className="form-label">Tanggal Selesai</label>
            <input
              type="date"
              className="form-control"
              value={form.end_date}
              onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            />
          </div>

          <div className="col-12">
            <button
              className="btn btn-primary"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? "Menghasilkan..." : "✨ Generate Report"}
            </button>
          </div>
        </div>
      </div>

      {/* HISTORY REPORTS */}
      <div className="card p-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">📋 Riwayat Laporan</h5>
          {reports.length > 0 && (
            <button
              className="btn btn-success btn-sm"
              onClick={handleDownloadAllPDF}
            >
              📄 Download Semua PDF
            </button>
          )}
        </div>
        
        {loading ? (
          <p className="text-muted text-center">Memuat data...</p>
        ) : (
          <div className="">
            {reports.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th className="text-center">Outlet</th>
                      <th className="text-center">Periode</th>
                      <th className="text-center">Tanggal</th>
                      <th className="text-center">Pemasukan</th>
                      <th className="text-center">Pengeluaran</th>
                      <th className="text-center">Laba</th>
                      <th className="text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((r) => {
                      const profit =
                        (r.total_income || 0) - (r.total_expense || 0);
                      return (
                        <tr key={r.report_id}>
                          <td>{r.outlet?.name || "-"}</td>
                          <td>
                            <span className={`badge ${getPeriodBadgeClass(r.period)}`}>
                              {getPeriodLabel(r.period)}
                            </span>
                          </td>
                          <td>
                            <small>
                              {formatDate(r.start_date)} s/d {formatDate(r.end_date)}
                            </small>
                          </td>
                          <td className="text-end text-success">
                            Rp {Number(r.total_income || 0).toLocaleString("id-ID")}
                          </td>
                          <td className="text-end text-danger">
                            Rp {Number(r.total_expense || 0).toLocaleString("id-ID")}
                          </td>
                          <td
                            className={`text-end fw-bold ${
                              profit >= 0 ? "text-success" : "text-danger"
                            }`}
                          >
                            Rp {profit.toLocaleString("id-ID")}
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-primary"
                              style={{marginRight: '4px'}}
                              onClick={() => handleDownloadPDF(r.report_id)}
                              title="Download PDF"
                            >
                              <Download size={16}/>
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(r.report_id)}
                              title="Hapus"
                            >
                              <Trash2 size={16}/>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
            <p className="text-muted text-center py-4">
              Belum ada laporan yang dibuat
            </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}