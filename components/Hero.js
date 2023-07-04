import React from "react";
import airpod_max from "../public/products/airpod_max.png";
import Typed from "react-typed";

const Hero = () => {
  return (
    <div className="w-full h-[] pb-24">
      <div className="grid grid-cols-2 max-w-[1240px]">
        <div className="flex flex-col w-full  ">
          <p className="text-9xl ml-12 pt-10 ">The Best Place For Your </p>
          <Typed
            className="text-9xl ml-12 pt-10"
            strings={["Gadgets", "Headphones", "Consoles", "Phones"]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
          <div className="flex flex-row justify-center pt-5 space-x-16 ">
            <button className="border-[2px] border-black p-2 px-4 hover:text-green-400 hover:border-green-400">
              Shop Now
            </button>
            <button className="border-[2px] border-black p-2 px-4 hover:text-green-400 hover:border-green-400">
              Learn More
            </button>
          </div>
        </div>
        <div className=" flex justify-end">
          <img
            className="w-2/3 max-h-full object-contain "
            src={airpod_max.src}
            alt="/"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
