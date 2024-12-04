import { Layout } from "@/components/Layout";
import { ProductsContext } from "@/components/ProductsContext";
import React, { useContext, useEffect, useState } from "react";
import Product from "@/models/Product";

const Checkout = () => {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const uniqIDS = [...new Set(selectedProducts)];
    fetch("/api/products?ids=" + uniqIDS.join(","))
      .then((response) => response.json())
      .then((json) => setProductsInfos(json));
  }, [selectedProducts]);

  function moreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) =>
        prev.filter((value, index) => index !== pos)
      );
    }
  }

  const deliveryPrice = 5;
  const subtotal = selectedProducts.reduce((total, id) => {
    const product = productsInfos.find((p) => p._id === id);
    return total + (product ? parseInt(product.price) : 0);
  }, 0);
  const total = subtotal + deliveryPrice;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        {!productsInfos.length && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
            No products in your basket
          </div>
        )}
        {productsInfos.length > 0 && (
          <div className="space-y-6 mb-8">
            {productsInfos.map((productInfo) => {
              const amount = selectedProducts.filter(
                (id) => id === productInfo._id
              ).length;
              if (amount === 0) return null;

              return (
                <div
                  className="flex items-center bg-white p-4 rounded-lg shadow"
                  key={productInfo._id}
                >
                  <div className="bg-gray-100 p-3 rounded-lg mr-4">
                    <img
                      className="w-24 h-24 object-cover"
                      src={productInfo.picture}
                      alt={productInfo.name}
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg">{productInfo.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {productInfo.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        £{productInfo.price}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => lessOfThisProduct(productInfo._id)}
                          className="border border-emerald-500 text-emerald-500 px-2 py-1 rounded"
                        >
                          -
                        </button>
                        <span className="font-semibold">{amount}</span>
                        <button
                          onClick={() => moreOfThisProduct(productInfo._id)}
                          className="bg-emerald-500 text-white px-2 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <form action="/api/checkout" method="POST" className="space-y-4">
          <input
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            type="text"
            placeholder="Street address, number"
            required
          />
          <input
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            type="text"
            placeholder="City"
            required
          />
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            type="text"
            placeholder="Name"
            required
          />
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            type="email"
            placeholder="Email address"
            required
          />
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span className="font-semibold">£{subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery:</span>
              <span className="font-semibold">£{deliveryPrice}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-bold">Total:</span>
              <span className="font-bold">£{total}</span>
            </div>
          </div>
          <input
            type="hidden"
            name="products"
            value={selectedProducts.join(",")}
          />
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-3 rounded-lg font-bold hover:bg-emerald-600 transition duration-300"
          >
            Pay £{total}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
