import React from "react";
import Preloader from "../../component/Preloader/Preloader";
import Hero from "../../component/Hero/Hero";
// import FunFact from "../../component/FunFact/FunFact";
// import AllFeature from "../../component/AllFeature/AllFeature";
// import RetailStores from "../../component/RetailStores/RetailStores";
import Testimonials from "../../component/Testimonials/Testimonials";
import Client from "../../component/Client/Client";
import Faq from "../../component/Faq/Faq";
// import Post from "../../component/Post/Post";
import Login from "../../component/Model/Login";
import Register from "../../component/Model/Register";
import Forget from "../../component/Model/Forget";
// import Blog from "../../component/Model/Blog";
import Feature from "./Feature/Feature";
import About from "./About/About";
import Contact from "./Contact/Contact";

export default function Home() {
  return (
    <div>
      <Preloader></Preloader>
      {/* <!-- Start Hero --> */}
      <Hero></Hero>
      {/* <!-- End Hero --> */}

      {/* <!-- Start About --> */}
      <About />
      {/* <!-- End About --> */}

      {/* <!-- Start Main Feature --> */}
      <Feature />
      {/* <!-- End Main Feature --> */}

      {/* <!-- Start Fun Fact --> */}
      {/* <FunFact /> */}
      {/* <!-- End Fun Fact --> */}

      {/* <!-- Start All Feature --> */}
      {/* <AllFeature /> */}
      {/* <!-- End All Feature --> */}

      {/* <!-- Start Retail Stores --> */}
      {/* <RetailStores /> */}
      {/* <!-- End Retail Stores --> */}

      {/* <!-- Start Client Section --> */}
      <Client />
      {/* <!-- End Client Stores --> */}

      {/* <!-- Start Testimonials Section --> */}
      <Testimonials />
      {/* <!-- End Testimonials Stores --> */}

      {/* <!-- Start FAQ --> */}
      <Faq />
      {/* <!-- End FAQ --> */}

      {/* <!-- Start Post Section --> */}
      {/* <Post /> */}
      {/* <!-- End Post Stores --> */}

      {/* <!-- Start Contact Section --> */}
      <Contact />
      {/* <!-- End Contact Section --> */}

      {/* <!-- Start Login Modal --> */}
      <Login />
      {/* <!-- End Login Modal --> */}

      {/* <!-- Start Register Modal --> */}
      <Register />
      {/* <!-- End Register Modal --> */}

      {/* <!-- Start forgot Modal  --> */}
      <Forget />
      {/* <!-- End forgot Modal  --> */}

      {/* <!-- Start Blog Details --> */}
      {/* <Blog /> */}
      {/* <!-- end Blog Details --> */}
    </div>
  );
}
