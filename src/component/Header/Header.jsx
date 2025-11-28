import React from "react";

export default function Header() {
  return (
    <header className="cs-site_header cs-style1 cs-sticky-header cs-primary_color cs-white_bg">
      <div className="cs-main_header">
        <div className="container">
          <div className="cs-main_header_in">
            <div className="cs-main_header_left">
              <a className="cs-site_branding cs-accent_color" href="/">
                <img src="../../../img/logo.svg" alt="Logo" />
              </a>
            </div>
            <div className="cs-main_header_center">
              <div className="cs-nav">
                <ul className="cs-nav_list">
                  <li>
                    <a href="#home" className="cs-smoth_scroll">
                      Beranda
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="cs-smoth_scroll">
                      Tentang Kami
                    </a>
                  </li>
                  <li>
                    <a href="#feature" className="cs-smoth_scroll">
                      Fitur
                    </a>
                  </li>
                  <li>
                    <a href="#client" className="cs-smoth_scroll">
                      Klien
                    </a>
                  </li>
                  <li>
                    <a href="#testimonials" className="cs-smoth_scroll">
                      Testimoni
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="cs-smoth_scroll">
                      Kontak
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="cs-main_header_right">
              <div className="cs-toolbox">
                <span className="cs-link cs-modal_btn" data-modal="login">
                  Login
                </span>
                <span
                  className="cs-btn cs-color1 cs-modal_btn"
                  data-modal="register"
                >
                  <span>Daftar Sekarang</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
