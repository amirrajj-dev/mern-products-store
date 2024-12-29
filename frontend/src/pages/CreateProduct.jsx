import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createProductAction } from "../Redux/products";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleFormDataChange = (changes) => {
    setFormData(prev => ({
      ...prev,
      ...changes
    }));
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    dispatch(createProductAction(formData));
    setFormData({
      name: '',
      price: '',
      image: ''
    });
  };

  return (
    <div className="mt-20 text-center">
      <h2 className="bg-gradient-to-r  mb-10 from-gray-800 to-gray-700  dark:bg-gradient-to-r text-center capitalize bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-500 text-2xl sm:text-4xl font-bold">
        Create New Product
      </h2>
      <form 
        onSubmit={handleCreateProduct} 
        className="bg-white dark:bg-slate-800 flex items-center justify-center flex-col gap-6 shadow-xl px-6 py-8 w-[95%] sm:w-[620px] mx-auto rounded-md transition-all duration-300"
      >
        <input 
          value={formData.name} 
          onChange={(e) => handleFormDataChange({ name: e.target.value })} 
          type="text" 
          placeholder="Product Name" 
          className="placeholder:capitalize text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-600 w-5/6 h-12 bg-transparent border border-gray-300 dark:border-white outline-none rounded-md shadow px-4"
        />
        <input 
          value={formData.price} 
          onChange={(e) => handleFormDataChange({ price: e.target.value })} 
          type="text" 
          placeholder="Price" 
          className="placeholder:capitalize text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-600 w-5/6 h-12 bg-transparent border border-gray-300 dark:border-white outline-none rounded-md shadow px-4"
        />
        <input 
          value={formData.image} 
          onChange={(e) => handleFormDataChange({ image: e.target.value })} 
          type="text" 
          placeholder="Image URL" 
          className="placeholder:capitalize text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-600 w-5/6 h-12 bg-transparent border border-gray-300 dark:border-white outline-none rounded-md shadow px-4"
        />
        <button 
          type="submit" 
          className="bg-gradient-to-r font-bold text-lg from-cyan-400 to-blue-500 text-white w-5/6 h-12 rounded-md shadow-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;