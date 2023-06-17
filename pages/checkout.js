import { Layout } from "@/components/Layout";
import { ProductsContext } from "@/components/ProductsContext";
import React, { useContext, useEffect, useState } from "react";
import Product from "@/models/Product";

const checkout = () => {
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
      const newSelectedProducts = selectedProducts.filter(
        (value, index) => index !== pos
      );
      setSelectedProducts(newSelectedProducts);
    }
  }

  const deliveryPrice = 5;
  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const product = productsInfos.find((p) => p._id === id);
      const price = parseInt(product ? product.price : null);

      subtotal += price;
    }
  }
  const total = subtotal + deliveryPrice;

  return (
    <Layout>
      {!productsInfos.length && <div>No products in your basket</div>}
      {productsInfos.length &&
        productsInfos.map((productInfo) => {
          const amount = selectedProducts.filter(
            (id) => id === productInfo._id
          ).length;
          if (amount === 0) return;

          return (
            <div className="flex mb-5 " key={productInfo._id}>
              <div className="bg-gray-100 p-3 rounded-xl flex mb-5 shrink-0">
                <img className="w-24" src={productInfo.picture} alt="" />
              </div>
              <div className="pl-4">
                <h3 className="font-bold text-lg">{productInfo.name}</h3>
                <p className="text-sm leading-4 text-gray-500">
                  {productInfo.description}
                </p>
                <div className="">
                  <div className="grow">£{productInfo.price}</div>
                  <div>
                    <button
                      onClick={() => lessOfThisProduct(productInfo._id)}
                      className="border border-gray-300-emerald-500 px-2 rounded-lg text-emerald-500"
                    >
                      -
                    </button>
                    <span className="p-2">
                      {
                        selectedProducts.filter((id) => id === productInfo._id)
                          .length
                      }
                    </span>

                    <button
                      onClick={() => moreOfThisProduct(productInfo._id)}
                      className="bg-emerald-500 px-2 rounded-lg text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <form action="/api/checkout" method="POST">
        <div className="mt-4">
          <input
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Street address, number"
          />
          <input
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="City"
          />
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Name"
          />
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="email"
            placeholder="Email address"
          />
        </div>
        <div className="mt-4">
          <div className="flex my-3">
            <h3 className="grow font-bold">SubTotal: </h3>
            <h3 className="font-bold">£{subtotal}</h3>
          </div>
          <div className="flex my-3">
            <h3 className="grow font-bold">Delivery </h3>
            <h3 className="font-bold">£{deliveryPrice}</h3>
          </div>
          <div className="flex my-3 border-t-2 pt-3 border-dashed border-emerald-500 ">
            <h3 className="grow font-bold">Total: </h3>
            <h3 className="font-bold">£{total}</h3>
          </div>
        </div>

        <input
          type="hidden"
          name="products"
          value={selectedProducts.join(",")}
        />

        <button className="bg-emerald-500 text-white w-full py-2 font-bold mt-4 shadow-xl shadow-emerald-400">
          Pay £{total}
        </button>
      </form>
    </Layout>
  );
};

export default checkout;
