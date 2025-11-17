import React from "react";

export default function Hero() {
  return (
    <div id="home">
      <div className="cs-height_80 cs-height_lg_80"></div>
      <section
        className="cs-hero cs-style1 cs-bg"
        data-src="../../../img/hero_bg.svg"
      >
        <div className="container">
          <div className="cs-hero_img">
            <div
              className="cs-hero_img_bg cs-bg"
              data-src="../../../img/hero_img_bg.png"
            ></div>
            <img
              src="../../../img/hero_img.png"
              alt="Hero Image"
              className="wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay="0.4s"
            />
          </div>
          <div className="cs-hero_text">
            <h1 className="cs-hero_title">
              KasKu
            </h1>
            <div className="cs-hero_secondary_title">
              Pencatatan Keuangan UMKM Super Sederhana
            </div>
            <div className="cs-hero_subtitle">
              Kelola pemasukan, pengeluaran, dan laporan bisnis Anda tanpa ribet.<br></br>
              Cocok untuk UMKM, yang ingin lebih rapi dan cepat dalam mengatur keuangan.
            </div>
            <a href="#" className="cs-btn">
              <span>Coba Gratis Sekarang</span>
            </a>
          </div>
          <div className="cs-hero_shapes">
            <div className="cs-shape cs-shape_position1">
              <img src="../../../img/shape/shape_1.svg" alt="Shape" />
            </div>
            <div className="cs-shape cs-shape_position2">
              <img src="../../../img/shape/shape_2.svg" alt="Shape" />
            </div>
            <div className="cs-shape cs-shape_position3">
              <img src="../../../img/shape/shape_3.svg" alt="Shape" />
            </div>
            <div className="cs-shape cs-shape_position4">
              <img src="../../../img/shape/shape_4.svg" alt="Shape" />
            </div>
            <div className="cs-shape cs-shape_position5">
              <img src="../../../img/shape/shape_5.svg" alt="Shape" />
            </div>
            <div className="cs-shape cs-shape_position6">
              <img src="../../../img/shape/shape_6.svg" alt="Shape" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
