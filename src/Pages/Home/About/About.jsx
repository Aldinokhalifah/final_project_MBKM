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
              <div className="cs-section_subtitle">About The POS</div>
              <div className="cs-height_10 cs-height_lg_10"></div>
              <h3 className="cs-section_title">
                Best solution for point of sale about details{" "}
              </h3>
            </div>
            <div className="cs-height_20 cs-height_lg_20"></div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. <br></br>
              Lorem Ipsum the & been the industry's. It was popularised in the
              1960s <br></br>
              with the release of Letraset sheets containing Lorem Ipsum
              passages.
            </p>
            <div className="cs-height_15 cs-height_lg_15"></div>
            <div className="cs-list_1_wrap">
              <ul className="cs-list cs-style1 cs-mp0">
                <li>
                  <span className="cs-list_icon">
                    <img src="../../../img/icons/tick.svg" alt="Tick" />
                  </span>
                  <div className="cs-list_right">
                    <h3>Other point of sale information</h3>
                    <p>
                      But I must explain to you how all this mistaken in
                      denouncing pleasure and praising pain was born and I will
                      give.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="cs-list_icon">
                    <img src="../../../img/icons/tick.svg" alt="Tick" />
                  </span>
                  <div className="cs-list_right">
                    <h3>Best process system POS</h3>
                    <p>
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis praesentium voluptatum deleniti at.
                    </p>
                  </div>
                </li>
              </ul>
              <div
                className="cs-list_img wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay="0.5s"
              >
                <img src="../../../img/about_img_2.png" alt="About" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cs-height_100 cs-height_lg_70"></div>
      <div className="cs-height_135 cs-height_lg_0"></div>
    </section>
  );
}
