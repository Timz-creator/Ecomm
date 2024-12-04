import React from "react";
import Typed from "react-typed";
import airpod_max from "../public/products/airpod_max.png";

const Hero = () => {
  return (
    <div className="w-full pb-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col space-y-6 px-4 md:px-0">
          <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
            The Best Place For Your
          </h2>
          <Typed
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary"
            strings={["Gadgets", "Headphones", "Consoles", "Phones"]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-5">
            <button className="bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800 transition-colors duration-300 shadow-lg">
              Shop Now
            </button>
            <button className="bg-white text-black font-semibold py-3 px-6 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 shadow-lg">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            className="w-2/3 max-h-full object-contain"
            src={airpod_max.src}
            alt="AirPods Max"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
