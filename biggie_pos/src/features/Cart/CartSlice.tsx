import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createCart,
  getCart,
  fetchCartItems,
  addItemToCart,
  updateCartItems,
  deleteCartItem,
  deleteAllCartItems,
  cartVoid,
  cartSent,
  transferCartitemsAction,
  updateCart,
} from "./CartActions";

interface CartDetails {
  _id: string;
  table_id: {
    _id: string;
    name: string;
  };
  created_by: {
    _id: string;
    username: string;
  };
  items: string[];
  order_no: string;
  status: string;
  discount: number;
  discount_type: string;
  clientPin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CartItem {
  _id: string;
  name: string;
  cartId: string | undefined;
  productId: string;
  product_id: string;
  quantity: number;
}

interface CartState {
  cartDetails: CartDetails;
  cartItems: CartItem[];
  totalAmount: number;
  loading: boolean;
  error: string | null;
  transferState: boolean;
}

const initialState: CartState = {
  cartDetails: {
    _id: "",
    table_id: {
      _id: "",
      name: "",
    },
    created_by: {
      _id: "",
      username: "",
    },
    items: [],
    order_no: "",
    status: "",
    createdAt: "",
    discount: 0,
    discount_type: "",
    clientPin: "N/A",
    updatedAt: "",
    __v: 0,
  },
  cartItems: [],
  totalAmount: 0,
  loading: false,
  error: null,
  transferState: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      // Check if the item is already in the cart
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        // If the item exists, increase its quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // If the item is not in the cart, add it
        state.cartItems.push(action.payload);
      }

      // Recalculate the total amount
      state.totalAmount = state.cartItems.reduce(
        (total, item: any) => total + parseFloat(item.price) * item.quantity,
        0
      );
    },
    subtractItem(state, action: PayloadAction<CartItem>) {
      // Find the item in the cart
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        // Decrease the item's quantity, but ensure it's greater than zero
        if (existingItem.quantity > 1) {
          existingItem.quantity -= action.payload.quantity;
        } else {
          // If the quantity reaches zero or less, remove the item from the cart
          state.cartItems = state.cartItems.filter(
            (item) => item.productId !== action.payload.productId
          );
        }

        // Recalculate the total amount
        state.totalAmount = state.cartItems.reduce(
          (total, item: any) => total + parseFloat(item.price) * item.quantity,
          0
        );
      }
    },
    removeCartItem(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );

      state.totalAmount = state.cartItems.reduce(
        (total, item: any) => total + parseFloat(item.price) * item.quantity,
        0
      );
    },
    clearcart(state) {
      state.cartDetails = initialState.cartDetails;
      state.cartItems = initialState.cartItems;
    },
    // addDiscount(
    //   state,
    //   action: PayloadAction<{ discount_type: string; discount: number }>
    // ) {
    //   state.discount_type = action.payload.discount_type;
    //   state.discount = action.payload.discount;

    //   if (state.discount_type === "amount") {
    //     state.totalAmount -= state.discount;
    //   } else if (state.discount_type === "percentage") {
    //     const discountAmount = (state.totalAmount * state.discount) / 100;
    //     state.totalAmount -= discountAmount;
    //   }
    // },
    // addClientPin(state, action: PayloadAction<string>) {
    //   state.clientPin = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartDetails = action.payload;
        state.cartItems = action.payload.items;
        state.cartDetails.clientPin = action.payload.client_pin;


        // Calculate the total amount of all cart items using reduce
        state.totalAmount = action.payload?.items?.reduce(
          (total: any, item: any) => total + parseFloat(item?.price),
          0
        );
         if (state.cartDetails.discount_type === "amount") {
           state.totalAmount -= state.cartDetails.discount;
         } else if (state.cartDetails.discount_type === "percentage") {
           const discountAmount =
             (state.totalAmount * state.cartDetails.discount) / 100;
           state.totalAmount -= discountAmount;
         }
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload as any;
        // Calculate the total amount of all cart items using reduce
        state.totalAmount = action.payload.reduce(
          (total: any, item: any) => total + parseFloat(item.price || 0),
          0
        );
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
        state.loading = false;
        const updatedData = action.payload;
        const index = state.cartItems.findIndex(
          (dataItem: { _id: boolean | string }) =>
            dataItem._id === updatedData._id
        );
        if (index !== -1) {
          state.cartItems[index] = updatedData;
        }
        // todo: make this a reducer
        state.totalAmount = state.cartItems.reduce(
          (total, item: any) => total + parseFloat(item.price),
          0
        );
      })
      .addCase(updateCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartDetails.discount_type = action.payload.discount_type;
        state.cartDetails.discount = action.payload.discount;
        state.cartDetails.clientPin = action.payload.client_pin;

        if (state.cartDetails.discount_type === "amount") {
          state.totalAmount -= state.cartDetails.discount;
        } else if (state.cartDetails.discount_type === "percentage") {
          const discountAmount =
            (state.totalAmount * state.cartDetails.discount) / 100;
          state.totalAmount -= discountAmount;
        }
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const deletedItemId = action.payload._id;
        const deletedItemIndex = state.cartItems.findIndex(
          (item) => item._id === deletedItemId
        );

        if (deletedItemIndex !== -1) {
          state.cartItems.splice(deletedItemIndex, 1);
        }

        state.totalAmount = state.cartItems.reduce(
          (total, item: any) => total + parseFloat(item.price),
          0
        );
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.error = action.error as string;
      })
      .addCase(deleteAllCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllCartItems.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = [];
        state.totalAmount = 0;
      })
      .addCase(deleteAllCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(cartSent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cartSent.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(cartSent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(cartVoid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cartVoid.fulfilled, (state) => {
        state.loading = false;
        // state.cartItems = [];
        // state.totalAmount = 0;
      })
      .addCase(cartVoid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(transferCartitemsAction.fulfilled, (state, action) => {
        state.loading = false;
        // Check if all items in payload exist in existing cartItems
        const allExist = action.payload.products?.every((itemId) =>
          state.cartItems?.some((cartItem) => cartItem?._id === itemId)
        );

        if (allExist) {
          state.cartItems = [];
          state.transferState = true; // Empty the cart if all items exist
          console.log(
            "All cart items transferred successfully. Cart emptied.",
            state.cartItems
          );
        } else {
          console.log("Some cart items may not exist. Cart not emptied.");
        }

        console.log("from cartslice transferCartitemsAction", action.payload);
      })
      .addCase(transferCartitemsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transferCartitemsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.transferState = false;
      });
  },
});

export const {
  removeCartItem,
  addItem,
  subtractItem,
  clearcart,
  addClientPin,
} = cartSlice.actions;

export default cartSlice.reducer;
