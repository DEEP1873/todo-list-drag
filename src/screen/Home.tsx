import React from "react";
import banner from "../assets/Hero IMG.png";


import arrow from "../assets/Arrow.png";
import arrow2 from "../assets/Arrow2.png";

import { NavLink } from "react-router";

import JoinNowButton from "../components/JoinNowButton";

import Hero2 from "../components/Hero2";
import Features from "../components/Features";
import UseCase from "../components/UseCase";
import Team from "../components/Team";
import Footer2 from "../components/Footer2";

const Home: React.FC = () => {
  // font-[outfit]

  return (
    <div className="flex flex-col gap-20 p-2.5 lg:mx-5 ">
      <Hero2/>
      <Features/>
      <UseCase/>
      <Team/>
      <Footer2/>

    </div>
  );
};

export default Home;
