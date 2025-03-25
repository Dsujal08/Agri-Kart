import React from "react";
import { NavLink } from "react-router-dom";

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
    link: "/insecticides",
  },
  // {
  //   title: "Seeds",
  //   category: "Agriculture",
  //   description:
  //     "A seed is a fertilized, mature ovule that encapsulates an embryonic plant, nutrient reserves, and a protective outer layer, ensuring survival and propagation.",
  //   imgSrc: "https://i.pinimg.com/474x/de/53/6c/de536cf2a0530292bc38b6bdc97e1786.jpg",
  //   link: "/seeds",
  // },
  // {
  //   title: "Fertilizers",
  //   category: "Agriculture",
  //   description:
  //     "Fertilizers are substances added to soil or plants to provide essential nutrients, such as nitrogen, phosphorus, and potassium, that promote plant growth and improve crop yields.",
  //   imgSrc: "https://i.pinimg.com/474x/7d/d0/41/7dd0412f3272d107fe3eb08e6eb9614d.jpg",
  //   link: "/fertilizers",
  // },
  {
    title: "Plants",
    category: "Nature",
    description:
      "Plants beautify spaces, purify the air, and contribute to a healthier environment. Explore a wide variety of indoor and outdoor plants.",
    imgSrc: "https://hips.hearstapps.com/hmg-prod/images/a-set-of-colorful-potted-plants-on-a-patterned-area-royalty-free-image-1716493110.jpg?crop=1.00xw:0.751xh;0,0.0671xh&resize=1200:*",
    link: "/plants",
  },
];

const ArticleCard = ({ title, category, description, imgSrc, link }) => (
  <div className="flex flex-col bg-white/90 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-300 backdrop-blur-lg">
    <div className="relative w-full h-60 overflow-hidden">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-80"
      />
      <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
        {category}
      </span>
    </div>
    <div className="p-6 flex flex-col justify-between flex-grow">
      <h4 className="text-2xl font-bold text-gray-900 leading-tight">{title}</h4>
      <p className="text-gray-600 text-sm mt-3 leading-relaxed">{description}</p>
      <NavLink to={link} className="mt-4">
        <button className="group flex items-center gap-2 px-5 py-3 text-sm font-semibold uppercase text-white bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-md hover:from-green-600 hover:to-green-800 hover:shadow-lg transition-all duration-300">
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5 transition-transform transform group-hover:translate-x-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </NavLink>
    </div>
  </div>
);

const ArticleList = () => {
  return (
    <section className="min-h-screen py-16 px-6 flex flex-col items-center ">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-green-800 tracking-wide drop-shadow-md">Categories</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </section>
  );
};

export default ArticleList;