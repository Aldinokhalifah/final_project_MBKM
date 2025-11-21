import React from "react";

export default function Footer() {
  return (
    <footer className="cs-footer">
      <div className="cs-height_75 cs-height_lg_70"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="cs-footer_item">
              <div className="cs-footer_widget_text">
                <img src="../../../img/logo_footer.svg" alt="Logo" />
                <p>
                  Aplikasi pencatatan keuangan sederhana untuk UMKM.
                  Membantu usaha Anda mencatat pemasukan, pengeluaran, dan membuat laporan secara mudah dan cepat.
                </p>
              </div>
              <div className="cs-height_30 cs-height_lg_30"></div>
              <div className="cs-social_btns cs-style1">
                <a href="#">
                  <img src="../../../img/facebook.svg" alt="Facebook" />
                </a>
                <a href="#">
                  <img src="../../../img/twitter.svg" alt="Twitter" />
                </a>
                <a href="#">
                  <img src="../../../img/instagram.svg" alt="Instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="cs-footer_item widget_nav_menu">
              <h2 className="cs-widget_title">Cocok Untuk</h2>
              <ul className="menu">
                <li>
                  <a href="#">Toko Makanan & Minuman</a>
                </li>
                <li>
                  <a href="#">Retail & Minimarket</a>
                </li>
                <li>
                  <a href="#">Coffee Shop</a>
                </li>
                <li>
                  <a href="#">Butik / Clothing Store</a>
                </li>
                <li>
                  <a href="#">Toko Online</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="cs-footer_item widget_nav_menu">
              <h2 className="cs-widget_title">Perusahaan</h2>
              <ul className="menu">
                <li>
                  <a href="#">Fitur</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Kebijakan Privasi</a>
                </li>
                <li>
                  <a href="#">Syarat & Ketentuan</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="cs-footer_item widget_nav_menu">
              <h2 className="cs-widget_title">Berlangganan Info KasKu</h2>
              <form className="cs-newsletter">
                <div className="cs-newsletter_text">
                  Dapatkan tips bisnis, update fitur, dan insight pengelolaan keuangan langsung ke email Anda.
                </div>
                <div className="cs-height_20 cs-height_lg_20"></div>
                <input
                  type="text"
                  className="cs-form_field"
                  placeholder="Masukkan Email Anda"
                />
                <div className="cs-height_10 cs-height_lg_10"></div>
                <button className="cs-btn cs-size_md w-100">
                  <span>Berlangganan</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="cs-height_40 cs-height_lg_30"></div>
      <div className="cs-copyright text-center">
        <div className="container">© 2025 KasKu. All rights reserved.</div>
      </div>
    </footer>
  );
}
