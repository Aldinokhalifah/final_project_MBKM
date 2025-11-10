import React from "react";

export default function Client() {
  return (
    <section className="cs-bg" data-src="../../../img/feature_bg.svg">
      <div className="cs-height_95 cs-height_lg_70"></div>
      <div className="container">
        <div className="cs-seciton_heading cs-style1 text-center">
          <div className="cs-section_subtitle">Our Client</div>
          <div className="cs-height_10 cs-height_lg_10"></div>
          <h3 className="cs-section_title">Who we partner with</h3>
        </div>
        <div className="cs-height_50 cs-height_lg_40"></div>
        <div className="cs-slider cs-style1 cs-gap-24">
          <div
            className="cs-slider_container"
            data-autoplay="0"
            data-loop="1"
            data-speed="600"
            data-fade-slide="0"
            data-slides-per-view="responsive"
            data-xs-slides="2"
            data-sm-slides="3"
            data-md-slides="4"
            data-lg-slides="6"
            data-add-slides="6"
          >
            <div className="cs-slider_wrapper">
              <div className="cs-slide">
                <div className="cs-client cs-accent_bg cs-center">
                  <img src="../../../img/client_1.svg" alt="Client" />
                </div>
              </div>
              <div className="cs-slide">
                <div className="cs-client cs-accent_bg cs-center">
                  <img src="../../../img/client_2.svg" alt="Client" />
                </div>
              </div>
              <div className="cs-slide">
                <div className="cs-client cs-accent_bg cs-center">
                  <img src="../../../img/client_3.svg" alt="Client" />
                </div>
              </div>
              <div className="cs-slide">
                <div className="cs-client cs-accent_bg cs-center">
                  <img src="../../../img/client_4.svg" alt="Client" />
                </div>
              </div>
              <div className="cs-slide">
                <div className="cs-client cs-accent_bg cs-center">
                  <img src="../../../img/client_5.svg" alt="Client" />
                </div>
              </div>
              <div className="cs-slide">
                <div className="cs-client cs-accent_bg cs-center">
                  <img src="../../../img/client_6.svg" alt="Client" />
                </div>
              </div>
              <div className="cs-slide">
                <div className="cs-client cs-accent_bg cs-center">
                  <img src="../../../img/client_3.svg" alt="Client" />
                </div>
              </div>
            </div>
          </div>
          <div className="cs-pagination cs-style1"></div>
        </div>
      </div>
      <div className="cs-height_100 cs-height_lg_70"></div>
    </section>
  );
}
