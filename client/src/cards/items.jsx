import React from "react";

const images = [
  { src: "/src/cards/brands_img/1.png", alt: "Brand 1" },
  { src: "/src/cards/brands_img/5.png", alt: "Brand 3" },
  { src: "/src/cards/brands_img/2.png", alt: "Brand 2" },
  { src: "/src/cards/brands_img/7.png", alt: "Brand 4" }
];

const Items = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-8">
      {images.map((image, index) => (
        <div 
          key={index} 
          className=" items-center justify-center hidden sm:flex" // sm:flex instead of sm:block for better alignment
        >
          <img
            className="h-40 md:h-60 lg:h-72 w-auto object-contain"
            src={image.src}
            alt={image.alt}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default Items;
