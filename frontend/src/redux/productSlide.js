import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  productList: [],
  CartItems: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    AddCartItem: (state, action) => {
      const check = state.CartItems.some((el) => el._id === action.payload._id);
      console.log(check);
      if (check) {
        toast.error("already item in Cart");
      } else {
        toast.success("Add item successufully");

        const total = action.payload.price;
        state.CartItems = [
          ...state.CartItems,
          { ...action.payload, qty: 1, total: total },
        ];
        console.log(action);
      }
    },
    DeleteCartItem: (state, action) => {
      console.log(action.payload);
      toast.success("one item delete");
      const index = state.CartItems.findIndex(
        (el) => el._id === action.payload
      );
      state.CartItems.splice(index, 1);
      console.log(index);
    },
    increaseQty: (state, action) => {
      const index = state.CartItems.findIndex(
        (el) => el._id === action.payload
      );
      let qty = state.CartItems[index].qty;
      const qtyItem = ++qty;
      state.CartItems[index].qty = qtyItem;
      const price = state.CartItems[index].price;
      const total = price * qtyItem;
      state.CartItems[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.CartItems.findIndex(
        (el) => el._id === action.payload
      );
      let qty = state.CartItems[index].qty;

      if (qty > 1) {
        const decItem = --qty;
        state.CartItems[index].qty = decItem;
        state.CartItems[index].qty = decItem;
        const price = state.CartItems[index].price;
        const total = price * decItem;
        state.CartItems[index].total = total;
      }
    },
  },
});

export const {
  setDataProduct,
  AddCartItem,
  DeleteCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;

export default productSlice.reducer;
