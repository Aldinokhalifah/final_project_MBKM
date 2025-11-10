import React from "react";

export default function FunFact() {
  return (
    <div className="container-fluid">
      <div className="cs-funfact_1_wrap cs-type1">
        <div className="cs-funfact cs-style1">
          <div className="cs-funfact_icon cs-center">
            <img src="../../../img/icons/funfact_icon_1.svg" alt="Icon" />
          </div>
          <div className="cs-funfact_right">
            <div className="cs-funfact_number cs-primary_font">
              <span data-count-to="320" className="odometer"></span>+
            </div>
            <h2 className="cs-funfact_title">Retail stores</h2>
          </div>
        </div>
        <div className="cs-funfact cs-style1">
          <div className="cs-funfact_icon cs-center">
            <img src="../../../img/icons/funfact_icon_2.svg" alt="Icon" />
          </div>
          <div className="cs-funfact_right">
            <div className="cs-funfact_number cs-primary_font">
              <span data-count-to="92" className="odometer"></span>k
            </div>
            <h2 className="cs-funfact_title">Customer</h2>
          </div>
        </div>
        <div className="cs-funfact cs-style1">
          <div className="cs-funfact_icon cs-center">
            <img src="../../../img/icons/funfact_icon_3.svg" alt="Icon" />
          </div>
          <div className="cs-funfact_right">
            <div className="cs-funfact_number cs-primary_font">
              <span data-count-to="5" className="odometer"></span>k
            </div>
            <h2 className="cs-funfact_title">Positive Rating</h2>
          </div>
        </div>
        <div className="cs-funfact cs-style1">
          <div className="cs-funfact_icon cs-center">
            <img src="../../../img/icons/funfact_icon_4.svg" alt="Icon" />
          </div>
          <div className="cs-funfact_right">
            <div className="cs-funfact_number cs-primary_font">
              <span data-count-to="20" className="odometer"></span>+
            </div>
            <h2 className="cs-funfact_title">Award Winning</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
