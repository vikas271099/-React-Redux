import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

// **Fetch products from API**
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// **Add product API call**
export const addProductAPI = createAsyncThunk<Product, Product>(
  "products/addProductAPI",
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to add product");
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// **Update product API call**
export const updateProductAPI = createAsyncThunk<
  Product,
  { id: number; quantity: number }
>(
  "products/updateProductAPI",
  async (updatedProduct, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error("Failed to update product");
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products?.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload; // Update product in store
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts?.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts?.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addProductAPI?.fulfilled, (state, action) => {
        state.products.push(action.payload); // Add product to store
      })
      .addCase(updateProductAPI?.fulfilled, (state, action) => {
        const index = state.products?.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload; // Update store after API update
        }
      });
  },
});

export const { addProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
