import React from "react";
import NavBar from "../components/NavBar";
import Slider from "./Slider";
import Cards from "../cards/Cards";
import Com from "../cards/Com";
import Footer from "../components/Footer";
import Brands from "../cards/Brands";
import Items from "../cards/items";
import Sliderimg from "../cards/sliderimg";
import Schemes from "../Schemes/Schemes";

const Home = () => {
  return (
    <div>
      <NavBar />
      <main className="mx-auto  space-y-10">
        <Slider />
        <Cards />
        <img
          src="/src/cards/brands_img/tm_home_1_page_v2.png"
          alt="Agriculture machinery"
          className="w-full object-cover rounded-lg shadow-lg"
          loading="lazy"
        />
        <Items />

        <Com />
        <img
          src="/src/cards/brands_img/tm_home_2_page_v2.png"
          alt="Farming tools"
          className="w-full object-cover rounded-lg shadow-lg"
          loading="lazy"
        />
        <Sliderimg />
        <Schemes />
        <Brands />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
