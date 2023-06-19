import Product from "@/components/Product";
import { initMongoose } from "@/lib/mongoose";
import { useEffect, useState } from "react";
import { findAllProducts } from "./api/products";
import Footer from "@/components/Footer";
import { Layout } from "@/components/Layout";

export default function Home({ products }) {
  const [productsInfo, setProductsInfo] = useState([]);
  const [phrase, setPhrase] = useState("");

  if (phrase) {
    products = products.filter((p) => p.name.toLowerCase().includes(phrase));
  }

  return (
    <Layout>
      <input
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        type="text"
        placeholder="Search for products..."
        className="bg-gray-100 w-full py-2 px-4 rounded-xl"
      />
      <div className="flex flex-wrap justify-start -mx-2">
        {products.map((productInfo) => (
          <div key={productInfo._id} className="w-full md:w-1/2 lg:w-1/3 p-2">
            <Product {...productInfo} />
          </div>
        ))}
      </div>
      <Footer />
    </Layout>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
