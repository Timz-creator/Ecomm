import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
const Navbar = () => {
  return (
    <div className="flex items-center mt-4 pb-5 space-x-96 justify-around">
      <h1 className="mr-12 font-bold font-mono text-2xl">Tech-Store</h1>
      <ul className="flex space-x-8 font-mono">
        <li className="hover:text-green-400">New arrivals</li>
        <li className="hover:text-green-400">Explore</li>
        <li className="hover:text-green-400">Support</li>
        <li className="hover:text-green-400">Business</li>
      </ul>
    </div>
  );
};

export default Navbar;
