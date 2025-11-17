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
                  Buku Kas Otomatis
                </h3>
                <div className="cs-iconbox_subtitle">
                  Catat pemasukan & pengeluaran hanya dalam hitungan detik, lengkap dengan lampiran nota.
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
                  Kelola Kategori & Metode Pembayaran
                </h3>
                <div className="cs-iconbox_subtitle">
                  Kelompokkan transaksi berdasarkan kategori, cash, transfer, atau e-wallet.
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
                  Laporan Real-Time
                </h3>
                <div className="cs-iconbox_subtitle">
                  Lihat arus kas harian, mingguan, dan bulanan dengan grafik yang mudah dibaca.
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
                  Invoice Cepat
                </h3>
                <div className="cs-iconbox_subtitle">
                  Buat dan kirim invoice profesional langsung dari aplikasi.
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
