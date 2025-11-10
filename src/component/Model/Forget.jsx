import React from "react";

export default function Forget() {
  return (
    <div className="cs-modal" data-modal="forgot">
      <div className="cs-close_overlay"></div>
      <div className="cs-modal_in">
        <div className="cs-modal_container cs-white_bg">
          <button className="cs-close_modal cs-center cs-primary_bg">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM0.292893 10.2929C-0.0976311 10.6834 -0.0976311 11.3166 0.292893 11.7071C0.683417 12.0976 1.31658 12.0976 1.70711 11.7071L0.292893 10.2929ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L10.2929 11.7071ZM10.2929 0.292893L0.292893 10.2929L1.70711 11.7071L11.7071 1.70711L10.2929 0.292893ZM0.292893 1.70711L10.2929 11.7071L11.7071 10.2929L1.70711 0.292893L0.292893 1.70711Z"
                fill="white"
              />
            </svg>
          </button>
          <div className="cs-height_95 cs-height_lg_70"></div>
          <div className="cs-login">
            <div className="cs-login_left">
              <img src="../../../img/about_img_1.png" alt="Login Thumb" />
            </div>
            <div className="cs-login_right">
              <form className="cs-login_form">
                <h2>Forgot your Password</h2>
                <div className="cs-height_30 cs-height_lg_30"></div>
                <input
                  type="text"
                  className="cs-form_field cs-border_color"
                  placeholder="Email address"
                />
                <div className="cs-height_20 cs-height_lg_20"></div>
                <button className="cs-btn cs-size_md w-100">
                  <span>Send Me Email</span>
                </button>
                <div className="cs-height_20 cs-height_lg_20"></div>
                <p className="cs-m0">
                  Don't have an account?
                  <span
                    className="cs-text_btn cs-modal_btn"
                    data-modal="register"
                  >
                    <span>Register</span>
                  </span>
                </p>
              </form>
            </div>
          </div>
          <div className="cs-height_100 cs-height_lg_70"></div>
        </div>
      </div>
    </div>
  );
}
