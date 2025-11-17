import React from "react";

export default function Feature() {
  return (
    <section id="feature" className="cs-bg" data-src="../../../img/feature_bg.svg">
      <div className="cs-height_95 cs-height_lg_70"></div>
      <div className="container">
        <div className="cs-seciton_heading cs-style1 text-center">
          <div className="cs-height_10 cs-height_lg_10"></div>
          <h3 className="cs-section_title">Fitur Utama</h3>
           <div
            className="cs-section_subtitle wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay="0.3s"
          >
            Fitur yang membuat pencatatan keuangan jadi effortless
          </div>
        </div>
        <div className="cs-height_50 cs-height_lg_40"></div>
        <div className="row">
          <div className="col-md-6 col-xl-3">
            <div className="cs-height_25 cs-height_lg_0"></div>
            <div className="cs-iconbox cs-style1">
              <div className="cs-iconbox_icon cs-center">
                <img src="../../../img/icons/icon_box_1.svg" alt="Icon" />
              </div>
              <div className="cs-iconbox_in">
                <div className="cs-iconbox_number cs-primary_font">01</div>
                <h3 className="cs-iconbox_title">
                  Pencatatan Keuangan
                </h3>
                <div className="cs-iconbox_subtitle">
                  Catat transaksi harian hanya dalam beberapa detik. Tambahkan keterangan, kategori, jumlah, hingga upload nota sebagai bukti transaksi.
                </div>
              </div>
            </div>
            <div className="cs-height_25 cs-height_lg_25"></div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="cs-iconbox cs-style1">
              <div className="cs-iconbox_icon cs-center">
                <img src="../../../img/icons/icon_box_2.svg" alt="Icon" />
              </div>
              <div className="cs-iconbox_in">
                <div className="cs-iconbox_number cs-primary_font">02</div>
                <h3 className="cs-iconbox_title">
                  Kategori Transaksi
                </h3>
                <div className="cs-iconbox_subtitle">
                  Atur kategori sesuai jenis bisnis Anda — seperti bahan baku, sewa, gaji, operasional, atau penjualan.
                </div>
              </div>
            </div>
            <div className="cs-height_25 cs-height_lg_25"></div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="cs-height_25 cs-height_lg_0"></div>
            <div className="cs-iconbox cs-style1">
              <div className="cs-iconbox_icon cs-center">
                <img src="../../../img/icons/icon_box_3.svg" alt="Icon" />
              </div>
              <div className="cs-iconbox_in">
                <div className="cs-iconbox_number cs-primary_font">03</div>
                <h3 className="cs-iconbox_title">
                  Laporan Arus Kas
                </h3>
                <div className="cs-iconbox_subtitle">
                  Lihat ringkasan pemasukan, pengeluaran, dan saldo secara harian, mingguan, hingga bulanan.
                </div>
              </div>
            </div>
            <div className="cs-height_25 cs-height_lg_25"></div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="cs-iconbox cs-style1">
              <div className="cs-iconbox_icon cs-center">
                <img src="../../../img/icons/icon_box_4.svg" alt="Icon" />
              </div>
              <div className="cs-iconbox_in">
                <div className="cs-iconbox_number cs-primary_font">04</div>
                <h3 className="cs-iconbox_title">
                  Sistem Aman & Responsif
                </h3>
                <div className="cs-iconbox_subtitle">
                  Dilengkapi autentikasi JWT, UI yang mudah digunakan, performa respons cepat, serta tampilan yang responsif di HP.
                </div>
              </div>
            </div>
            <div className="cs-height_25 cs-height_lg_25"></div>
          </div>
        </div>
        <div className="cs-height_75 cs-height_lg_45"></div>
      </div>
    </section>
  );
}
