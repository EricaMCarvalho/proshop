import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/types';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const existsItem = state.cartItems.find(
        (item) => item.product === action.payload.product
      );

      if (existsItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === existsItem.product ? action.payload : i
          ),
        };
      }

      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
};
