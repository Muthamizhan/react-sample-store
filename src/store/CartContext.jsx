import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type == "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id == action.item.id
    );

    const updatedItems = [...state.items];

    if (existingItemIndex > -1) {
      const existingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...state.items[existingItemIndex],
        quantity: state.items[existingItemIndex].quantity + 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    }
    if (existingItemIndex == -1) {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type == "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id == action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedItems = [...state.items];
    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    }
    if (existingItem.quantity > 1) {
      const updatedItem = {
        ...state.items[existingItemIndex],
        quantity: state.items[existingItemIndex].quantity - 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (action.type == "CLEAR") {
    return {...state, items:[]}
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart(){
    dispatchCartAction({ type: "CLEAR"});

  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

  console.log(cartContext);
  return <CartContext value={cartContext}>{children}</CartContext>;
}

export default CartContext;
