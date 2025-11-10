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
                  On the other hand, we denounce <br></br>
                  with righteous indignation and <br></br>
                  dislike men who are so
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
              <h2 className="cs-widget_title">Available POS</h2>
              <ul className="menu">
                <li>
                  <a href="#">Food Delivery</a>
                </li>
                <li>
                  <a href="#">Furniture Store</a>
                </li>
                <li>
                  <a href="#">Coffee Shop</a>
                </li>
                <li>
                  <a href="#">Clothing Store</a>
                </li>
                <li>
                  <a href="#">eCommerce</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="cs-footer_item widget_nav_menu">
              <h2 className="cs-widget_title">Company</h2>
              <ul className="menu">
                <li>
                  <a href="#">Features</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Use</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="cs-footer_item widget_nav_menu">
              <h2 className="cs-widget_title">Subscribe us</h2>
              <form className="cs-newsletter">
                <div className="cs-newsletter_text">
                  Get Business news, tip and solutions to your problems from our
                  experts.
                </div>
                <div className="cs-height_20 cs-height_lg_20"></div>
                <input
                  type="text"
                  className="cs-form_field"
                  placeholder="Enter your email"
                />
                <div className="cs-height_10 cs-height_lg_10"></div>
                <button className="cs-btn cs-size_md w-100">
                  <span>Subscribe</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="cs-height_40 cs-height_lg_30"></div>
      <div className="cs-copyright text-center">
        <div className="container">Copyright 2022. Created by Thememarch.</div>
      </div>
    </footer>
  );
}
