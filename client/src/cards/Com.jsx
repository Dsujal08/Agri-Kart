import React from "react";
import { NavLink } from "react-router-dom";

// Ensure images are in the correct directory
const articles = [
  {
    title: "Seeds",
    category: "Agriculture",
    description:
      "A seed is a fertilized, mature ovule that encapsulates an embryonic plant, nutrient reserves, and a protective outer layer, ensuring survival and propagation.",
  imgSrc: "https://i.pinimg.com/474x/de/53/6c/de536cf2a0530292bc38b6bdc97e1786.jpg", 
    link: "/seeds",
  },
  {
    title: "Fertilizers",
    category: "Agriculture",
    description:
      "Fertilizers are substances added to soil or plants to provide essential nutrients, such as nitrogen, phosphorus, and potassium, that promote plant growth and improve crop yields.",
    imgSrc: "https://i.pinimg.com/474x/7d/d0/41/7dd0412f3272d107fe3eb08e6eb9614d.jpg",
    link: "/fertilizers",
  },
  {
    title: "Insecticides",
    category: "Agriculture",
    description:
      "Insecticides are chemical or natural substances used to control, repel, or eliminate insects that can damage crops, plants, and structures.",
    imgSrc: "https://i.pinimg.com/474x/2b/de/07/2bde0710331223ff678edddc705af4a4.jpg",
    link: "/articles/sustainable-farming",
  },
  // {
  //   title: "Renewable Energy Innovations",
  //   category: "Energy",
  //   description:
  //     "New breakthroughs in renewable energy technology are making it more affordable and accessible for homes and businesses worldwide.",
  //   imgSrc: "/images/4.png",
  //   link: "/articles/renewable-energy",
  // },
];

const ArticleCard = ({ title, category, description, imgSrc, link }) => (
  <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.05] hover:shadow-2xl duration-300 border border-gray-200">
    {/* Image Section */}
    <div className="w-2/5 h-[250px] flex items-center justify-center overflow-hidden relative">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-full object-cover object-center"
      />
      <span className="absolute bottom-2 left-2 bg-green-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
        {category}
      </span>
    </div>

    {/* Content Section */}
    <div className="p-6 flex flex-col justify-between w-3/5">
      <h4 className="text-2xl font-bold text-gray-900 mt-2 leading-tight">
        {title}
      </h4>
      <p className="text-gray-600 text-sm mt-3 leading-relaxed">{description}</p>

      {/* Learn More Button with Animated Arrow */}
      <NavLink to={link} className="mt-4">
        <button className="flex items-center gap-2 px-5 py-2 text-sm font-semibold uppercase text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300">
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4 transition-transform transform group-hover:translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </NavLink>
    </div>
  </div>
);

const ArticleList = () => {
  return (
    <section className="min-h-screen py-16 px-6 flex flex-col items-center bg-gradient-to-br">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-800 tracking-wide drop-shadow-md">
          What We’re Doing
        </h1>
        <p className="text-lg md:text-2xl font-semibold text-green-900 mt-3 max-w-lg mx-auto leading-snug">
          Services We’re Offering
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </section>
  );
};

export default ArticleList;
