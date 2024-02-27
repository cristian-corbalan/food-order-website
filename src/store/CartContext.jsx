import { createContext, useReducer } from 'react';

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  getTotal: () => {},
  getQuantity: () => {},
  reset: () => {}
});

function cartReducer (state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(item => item.id === action.item.id);
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      updatedItems[existingCartItemIndex] = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1
      };
    } else {
      updatedItems.push({
        ...action.item,
        quantity: 1
      });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(item => item.id === action.id);
    const updatedItem = { ...updatedItems[updatedItemIndex] };

    updatedItem.quantity--;

    if (updatedItem.quantity === 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'RESET_CART') {
    return { ...state, items: [] };
  }
}

export function CartContextProvider ({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });

  function addItem (item) {
    cartDispatch({
      type: 'ADD_ITEM',
      item
    });
  }

  function removeItem (id) {
    cartDispatch({
      type: 'REMOVE_ITEM',
      id
    });
  }

  function reset () {
    cartDispatch({
      type: 'RESET_CART'
    });
  }

  function getTotal () {
    return cartState.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function getQuantity () {
    return cartState.items.reduce((total, item) => total + item.quantity, 0);
  }

  const defaultContext = {
    items: cartState.items,
    addItem,
    removeItem,
    reset,
    getTotal,
    getQuantity
  };

  return (
    <CartContext.Provider value={defaultContext}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
