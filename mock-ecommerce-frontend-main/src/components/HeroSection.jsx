import { useEffect, useState } from "react";
import banner1 from "../assets/banner2.jpg";
import banner2 from "../assets/banner1.jpg";
import banner3 from "../assets/banner3.jpg";

const banners = [banner1, banner2, banner3];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden relative w-full h-[500px]">
      {" "}
      <div
        className="flex transition-transform duration-1000 ease-in-out w-full h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`banner-${index}`}
            className="w-full flex-shrink-0 object-cover h-full"
          />
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
