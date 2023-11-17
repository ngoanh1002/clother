import { createContext, useEffect, useState } from "react";
import { loadData } from "../assets/js/api";
import Loader from "../components/Loader";

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await loadData();
        if (productsData) {
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const findProductById = (id) => {
    return products.find((product) => product.id == id);
  };

  return (
    <AppContext.Provider value={{ products, findProductById }}>
      {loading ? (
        <div className="background">
          <Loader />
        </div>
      ) : (
        <>{children}</>
      )}
    </AppContext.Provider>
  );
};
