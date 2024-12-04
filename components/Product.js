import React, { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

const Product = ({ _id, name, price, description, picture }) => {
  const { setSelectedProducts } = useContext(ProductsContext);

  function addProduct() {
    setSelectedProducts((prev) => [...prev, _id]);
  }

  return (
    <div className="w-64 bg-gray-50 shadow-md hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:scale-105">
      <div className="p-4 bg-white">
        <img
          src={picture}
          alt={name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div className="p-4 border-t border-gray-100">
        <h3 className="font-bold text-lg truncate">{name}</h3>
        <p className="text-sm mt-1 text-gray-600 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="text-2xl font-bold">£{price}</div>
          <button
            onClick={addProduct}
            className="bg-emerald-400 text-white py-2 px-4 rounded-full hover:bg-emerald-500 transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
