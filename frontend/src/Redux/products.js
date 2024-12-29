import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createProductAction = createAsyncThunk(
  "products/create",
  async (product) => {
    const { name, price, image } = product;
    if (!name || !price || !image) {
      return { error: "Please fill all fields" };
    }
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        image,
      }),
    });

    const result = await response.json();

    if (result.success === true) {
      console.log("yes");

      toast.success("product created succesfully", {
        position: "bottom-center",
        className: "slate",
        autoClose: 2000,
      });
      return result.data;
    }
  }
);

export const getProductsAction = createAsyncThunk("products/get", async () => {
  const response = await fetch("/api/products");
  const data = await response.json();
  return data;
});

export const getOneProductAction = createAsyncThunk(
  "products/getOne",
  async (id) => {
    const response = await fetch(`http://localhost:5000/api/products/${id}`);
    const data = await response.json();
    return data;
  }
);

export const deleteProductAction = createAsyncThunk(
  "products/delete",
  async (id) => {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (result.success === true) {
      toast.error("product deleted succesfully", {
        position: "bottom-center",
        className: "slate",
        autoClose: 2000,
      });
    }
    return id;
  }
);

export const updateProductAction = createAsyncThunk(
  "products/update",
  async ({ id, product }, { rejectWithValue }) => {
    const { name, image, price } = product;

    // Validate input fields
    if (!name || !image || !price) {
      return rejectWithValue({ error: "Please fill all fields" });
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, image, price }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Product updated successfully", {
          position: "bottom-center",
          className: "slate",
          autoClose: 2000,
        });
        return result;
      } else {
        return rejectWithValue({ message: "Failed to update", error: result });
      }
    } catch (error) {
      return rejectWithValue({ message: "Update failed", error });
    }
  }
);


const productsStore = createSlice({
  name: "products",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      return [...state, action.payload];
    }),
      builder.addCase(getProductsAction.fulfilled, (state, action) => {
        return action.payload.data;
      }),
      builder.addCase(getOneProductAction.fulfilled, (state, action) => {
        return action.payload.data;
      }),
      builder.addCase(updateProductAction.fulfilled, (state, action) => {
        console.log(action);
        
        return state.map((product) =>
          product._id === action.payload.data._id ? action.payload.data : product
        );
      }),
      builder.addCase(updateProductAction.rejected, (state, action) => {
        console.log(action);
      }),
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      console.log(action.payload);
      return state.filter((product) => product._id !== action.payload);
    });
  },
});

export default productsStore.reducer;