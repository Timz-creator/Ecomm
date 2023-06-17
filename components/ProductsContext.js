import { createContext } from "react";

export const ProductsContext = createContext({});

import React from "react";
import useLocalStorageState from "use-local-storage-state";

const ProductsContextProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState("cart", {
    defaultValue: [],
  });
  return (
    <ProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
