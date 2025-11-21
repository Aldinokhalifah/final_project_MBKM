import React, { useState, useEffect, useRef } from "react";
import { getOutlets, generateReport } from "../api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function LaporanPage() {
  const [outlets, setOutlets] = useState([]);
  const [form, setForm] = useState({
    outlet_id: "",
    period: "daily",
    start_date: "",
    end_date: ""
  });

  const [report, setReport] = useState(null);
  const reportRef = useRef(null);

  // Load daftar outlet
  useEffect(() => {
    const loadOutlets = async () => {
      const res = await getOutlets();
      setOutlets(res.data || []);
    };
    loadOutlets();
  }, []);

  const handleGenerate = async () => {
    if (!form.outlet_id) return alert("Pilih outlet dahulu!");

    const res = await generateReport(form);
    setReport(res.data);
  };

  const downloadPDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(img, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save(`laporan-${Date.now()}.pdf`);
  };

  return (
    <div className="container">

      {/* HEADER GRADIENT */}
      <div
        className="text-center p-4 rounded-4 shadow-sm mb-4"
        style={{
          background: "linear-gradient(90deg, #3B82F6, #60A5FA)",
          color: "white",
        }}
      >
        <h3
          className="fw-bold mb-0"
          style={{ letterSpacing: "1px" }}
        >
          📊 Generate Laporan Keuangan
        </h3>
      </div>

      {/* FORM */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row g-3">

          {/* OUTLET */}
          <div className="col-md-4">
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
          <div className="col-md-4">
            <label className="form-label">Periode</label>
            <select
              className="form-select"
              value={form.period}
              onChange={(e) => setForm({ ...form, period: e.target.value })}
            >
              <option value="daily">Harian</option>
              <option value="weekly">Mingguan</option>
              <option value="monthly">Bulanan</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {/* CUSTOM DATE */}
          {form.period === "custom" && (
            <>
              <div className="col-md-4">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.start_date}
                  onChange={(e) =>
                    setForm({ ...form, start_date: e.target.value })
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.end_date}
                  onChange={(e) =>
                    setForm({ ...form, end_date: e.target.value })
                  }
                />
              </div>
            </>
          )}

          <div className="col-12">
            <button className="btn btn-primary mt-2" onClick={handleGenerate}>
              🔍 Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* HASIL LAPORAN */}
      {report && (
        <>
          <div className="card p-4 shadow-sm" ref={reportRef}>
            <h4 className="fw-bold mb-3 text-secondary">📊 Hasil Laporan</h4>

            <p><b>Outlet:</b> {report.outlet?.name}</p>
            <p><b>Periode:</b> {report.period}</p>
            <p><b>Dari:</b> {report.start_date}</p>
            <p><b>Sampai:</b> {report.end_date}</p>

            <hr />

            <p>
              Total Pemasukkan:{" "}
              <b>Rp{Number(report.total_income).toLocaleString()}</b>
            </p>

            <p>
              Total Pengeluaran:{" "}
              <b>Rp{Number(report.total_expense).toLocaleString()}</b>
            </p>

            <p>
              Laba Bersih:{" "}
              <b>
                Rp
                {(report.total_income - report.total_expense).toLocaleString()}
              </b>
            </p>

            <hr />

            <small className="text-muted">
              Dibuat pada: {new Date(report.generated_at).toLocaleString()}
            </small>
          </div>

          <button className="btn btn-success mt-3" onClick={downloadPDF}>
            📄 Download PDF
          </button>
        </>
      )}
    </div>
  );
}
