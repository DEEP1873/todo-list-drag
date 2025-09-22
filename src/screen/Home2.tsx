import React from "react";
import Hero from "../components/Hero";
import Metrices from "../components/Metrices";
import HowItsWork from "../components/HowItsWork";
import Mint from "../components/Mint";
import About from "../components/About";
import Mint2 from "../components/Mint2";
import Referral from "../components/Referral";
import Metrics from "../components/Metrics";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

const Home2 = () => {
  return (
    <div className=" flex flex-col gap-20 lg:gap-20 overflow-x-hidden">
      <Hero />
      <Metrices />
      <HowItsWork />
      <Mint />
      <About />
      <Mint2 />
      <Referral/>
      <Metrics/>
      <Faq/>
      <Footer/>
    </div>
  );
};

export default Home2;
