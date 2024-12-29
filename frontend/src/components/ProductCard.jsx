import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteProductAction, updateProductAction } from "../Redux/products";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const ProductCard = ({ name, image, price, _id }) => {
  const swal = withReactContent(Swal);
  const dispatch = useDispatch();

  const deleteProduct = (productId) => {
    dispatch(deleteProductAction(productId));
  };

  const editProduct = (productId) => {
    swal
      .fire({
        title: "Edit Product",
        background: "#334155",
        color: "white",
        html: (
          <>
            <div className="space-y-4">
              <input
                type="text"
                id="name"
                defaultValue={name}
                placeholder="name"
                className="placeholder:capitalize text-white placeholder:text-slate-600 w-5/6 h-11 bg-slate-800 border border-white outline-none rounded-md shadow px-2.5"
              />
              <input
                type="text"
                id="price"
                defaultValue={price}
                placeholder="price"
                className="placeholder:capitalize text-white placeholder:text-slate-600 w-5/6 h-11 bg-slate-800 border border-white outline-none rounded-md shadow px-2.5"
              />
              <input
                type="text"
                defaultValue={image}
                id="image"
                placeholder="image"
                className="placeholder:capitalize text-white placeholder:text-slate-600 w-5/6 h-11 bg-slate-800 border border-white outline-none rounded-md shadow px-2.5"
              />
            </div>
          </>
        ),
        confirmButtonText: "Edit Product",
        confirmButtonColor: "#3b82f6",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#F44336",
        showCloseButton: true,
        preConfirm: () => {
          const name = document.querySelector("#name").value;
          const price = document.querySelector("#price").value;
          const image = document.querySelector("#image").value;
          return { name, price, image };
        },
      })
      .then((res) => {
        if (res.isConfirmed) {
          const product = res.value;
          dispatch(updateProductAction({ id: productId, product }));
        }
      });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <img src={image} alt="product pic" className="h-56 w-full object-cover" />
      <div className="flex flex-col items-start p-4 gap-3">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate">{name}</h2>
        <p className="text-gray-600 dark:text-gray-400 font-bold text-xl">${price?.toLocaleString()}</p>
        <div className="flex items-center justify-center gap-2 mt-auto">
          <button
            className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300"
            onClick={() => editProduct(_id)}
          >
            <FaRegEdit />
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-all duration-300"
            onClick={() => deleteProduct(_id)}
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;