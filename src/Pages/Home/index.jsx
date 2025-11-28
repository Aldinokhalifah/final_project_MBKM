import Hero from "../../component/Hero/Hero";
import Testimonials from "../../component/Testimonials/Testimonials";
import Client from "../../component/Client/Client";
import Faq from "../../component/Faq/Faq";
import Forget from "../../component/Model/Forget";
import Feature from "./Feature/Feature";
import About from "./About/About";
import Contact from "./Contact/Contact";

export default function Home() {
  return (
    <div>
      {/* <!-- Start Hero --> */}
      <Hero></Hero>
      {/* <!-- End Hero --> */}

      {/* <!-- Start About --> */}
      <About />
      {/* <!-- End About --> */}

      {/* <!-- Start Main Feature --> */}
      <Feature />
      {/* <!-- End Main Feature --> */}

      {/* <!-- Start Client Section --> */}
      <Client />
      {/* <!-- End Client Stores --> */}

      {/* <!-- Start Testimonials Section --> */}
      <Testimonials />
      {/* <!-- End Testimonials Stores --> */}

      {/* <!-- Start FAQ --> */}
      <Faq />
      {/* <!-- End FAQ --> */}

      {/* <!-- Start Contact Section --> */}
      <Contact />
      {/* <!-- End Contact Section --> */}

      {/* <!-- Start forgot Modal  --> */}
      <Forget />
      {/* <!-- End forgot Modal  --> */}
    </div>
  );
}
