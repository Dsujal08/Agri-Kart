import React, { useEffect, useRef } from "react";

const images = [
  "/src/cards/brands_img/1.0.png",
  "/src/cards/brands_img/4.0.png",
  "/src/cards/brands_img/3.png",
  "/src/cards/brands_img/7.png",
];

const SliderImg = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 300; // Adjust scroll speed
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        ) {
          scrollRef.current.scrollLeft = 0; // Reset scroll when reaching the end
        }
      }
    }, 3000); // Adjust time interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
    
      <div className="flex justify-center">
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto scrollbar-hide px-8 scroll-smooth"
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Brand ${index + 1}`}
              className="w-80 h-70 object-contain "
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderImg;
