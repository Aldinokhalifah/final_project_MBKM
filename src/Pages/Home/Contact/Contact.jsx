import React from "react";

export default function Contact() {
  return (
    <section className="cs-gradient_bg_1" id="contact">
      <div className="cs-height_95 cs-height_lg_70"></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-8">
            <div className="cs-seciton_heading cs-style1">
              <div
                className="cs-section_subtitle wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay="0.4s"
              >
                Contract Us
              </div>
              <div className="cs-height_10 cs-height_lg_10"></div>
              <h3 className="cs-section_title">
                If you have any quiries, fill free to contact us
              </h3>
            </div>
            <div className="cs-height_20 cs-height_lg_20"></div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.Lorem Ipsum is simply dummy text of the Lorem Ipsum is
              simply dummy text of the printing and typesetting.
            </p>
            <div className="cs-height_15 cs-height_lg_15"></div>
            <div className="cs-iconbox cs-style3">
              <div className="cs-iconbox_icon">
                <img src="../../../img/icons/contact_icon_1.svg" alt="Icon" />
              </div>
              <div className="cs-iconbox_right">
                <h2 className="cs-iconbox_title">Address</h2>
                <div className="cs-iconbox_subtitle">
                  4117 Leroy LaneHarold, KY 41635,
                </div>
              </div>
            </div>
            <div className="cs-height_30 cs-height_lg_30"></div>
            <div className="cs-iconbox cs-style3">
              <div className="cs-iconbox_icon">
                <img src="../../../img/icons/contact_icon_2.svg" alt="Icon" />
              </div>
              <div className="cs-iconbox_right">
                <h2 className="cs-iconbox_title">Contract Number</h2>
                <div className="cs-iconbox_subtitle">+606-243-4966</div>
              </div>
            </div>
            <div className="cs-height_30 cs-height_lg_30"></div>
            <div className="cs-iconbox cs-style3">
              <div className="cs-iconbox_icon">
                <img src="../../../img/icons/contact_icon_3.svg" alt="Icon" />
              </div>
              <div className="cs-iconbox_right">
                <h2 className="cs-iconbox_title">Email Address</h2>
                <div className="cs-iconbox_subtitle">demo@gmail.com</div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 offset-xl-1">
            <div className="cs-height_40 cs-height_lg_40"></div>
            <form className="cs-contact_form">
              <h2 className="cs-contact_form_title">Please fill up the form</h2>
              <div className="row">
                <div className="col-lg-6">
                  <input
                    type="text"
                    className="cs-form_field"
                    placeholder="Name"
                  />
                  <div className="cs-height_25 cs-height_lg_25"></div>
                </div>
                <div className="col-lg-6">
                  <input
                    type="text"
                    className="cs-form_field"
                    placeholder="Email address"
                  />
                  <div className="cs-height_25 cs-height_lg_25"></div>
                </div>
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="cs-form_field"
                    placeholder="Phone number"
                  />
                  <div className="cs-height_25 cs-height_lg_25"></div>
                </div>
                <div className="col-lg-12">
                  <textarea
                    cols="30"
                    rows="5"
                    className="cs-form_field"
                    placeholder="Write your massage"
                  ></textarea>
                  <div className="cs-height_25 cs-height_lg_25"></div>
                </div>
                <div className="col-lg-12">
                  <button className="cs-btn cs-size_md">
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="cs-height_95 cs-height_lg_70"></div>
    </section>
  );
}
