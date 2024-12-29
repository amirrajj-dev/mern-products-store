import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CreateProduct from "./pages/CreateProduct";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsAction } from "./Redux/products";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add(theme);
    }
  }, []);

  useEffect(() => {
    dispatch(getProductsAction());
  }, []);

  return (
    <>
      <div className={`min-h-screen bg-gray-300 dark:bg-gray-900`}>
        <div className="container mx-auto max-w-7xl p-4">
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/create" element={<CreateProduct />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
