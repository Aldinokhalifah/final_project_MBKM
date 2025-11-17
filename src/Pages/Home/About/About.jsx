import React from "react";

export default function About() {
  return (
    <section id="about" className="cs-gradient_bg_1">
      <div className="cs-height_100 cs-height_lg_70"></div>
      <div className="container">
        <div className="row align-items-center flex-column-reverse-lg">
          <div
            className="col-xl-6 wow fadeInLeft"
            data-wow-duration="1s"
            data-wow-delay="0.3s"
          >
            <div className="cs-left_full_width cs-space110">
              <div className="cs-left_sided_img">
                <img src="../../../img/about_img_1.png" alt="About" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="cs-height_0 cs-height_lg_40"></div>
            <div className="cs-seciton_heading cs-style1">
              <div className="cs-section_subtitle">About Kasku</div>
              <div className="cs-height_10 cs-height_lg_10"></div>
              <h3 className="cs-section_title">
                Aplikasi pencatatan keuangan yang dibuat khusus untuk UMKM{" "}
              </h3>
            </div>
            <div className="cs-height_20 cs-height_lg_20"></div>
            <p>
              Tidak semua usaha membutuhkan sistem ERP rumit. Itulah kenapa KasKu hadir untuk memberi solusi pencatatan keuangan yang mudah, efisien, dan fokus pada hal-hal penting saja.
              Dengan KasKu, Anda bisa memastikan setiap transaksi tercatat rapi sehingga keputusan bisnis menjadi lebih tepat.
            </p>
            {/* <div className="cs-height_15 cs-height_lg_15"></div> */}
          </div>
        </div>
      </div>
      <div className="cs-height_100 cs-height_lg_70"></div>
      <div className="cs-height_135 cs-height_lg_0"></div>
    </section>
  );
}
