import React from "react";

const Navbar = () => {
  return (
    <nav className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-mono">Tech-Store</h1>
        <ul className="flex space-x-8 font-mono">
          <li>
            <a
              href="/new-arrivals"
              className="hover:text-green-400 transition-colors duration-200"
            >
              New arrivals
            </a>
          </li>
          <li>
            <a
              href="/explore"
              className="hover:text-green-400 transition-colors duration-200"
            >
              Explore
            </a>
          </li>
          <li>
            <a
              href="/support"
              className="hover:text-green-400 transition-colors duration-200"
            >
              Support
            </a>
          </li>
          <li>
            <a
              href="/business"
              className="hover:text-green-400 transition-colors duration-200"
            >
              Business
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
