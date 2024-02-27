import { createContext, useReducer } from 'react';

const CartContext = createContext({
  cartItems: [],
  lastOrder: [],
  addItemToCart: () => {},
  getCartQuantity: () => {},
  getCartTotal: () => {},
  getCartItems: () => {},
  resetCart: () => {},
  saveOrder: () => {}
});

function cartReducer (state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(item => item.id === action.payload);
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      updatedItems[existingCartItemIndex] = {
        ...existingCartItem,
        quantity: existingCartItem.quantity++
      };
    } else {
      updatedItems.push({
        id: action.payload,
        quantity: 1
      });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'UPDATE_QUANTITY') {
    const { id, amount } = action.payload;

    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(item => item.id === id);
    const updatedItem = { ...updatedItems[updatedItemIndex] };

    updatedItem.quantity += amount;

    if (updatedItem.quantity === 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'RESET') {
    return { ...state, items: [] };
  }

  if (action.type === 'SAVE_ORDER') {
    return { ...state, lastOrder: action.payload };
  }
}

export function CartContextProvider ({ children, meals }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [], lastOrder: [] });

  function handleAddItemToCart (id) {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: id
    });
  }

  function handleUpdateCartItemQuantity (id, amount) {
    cartDispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, amount }
    });
  }

  function handleResetCart () {
    cartDispatch({
      type: 'RESET'
    });
  }

  function getTotal () {
    return cartState.items.reduce((total, item) => {
      const meal = meals.find(meal => meal.id === item.id);
      return total + (meal.price * item.quantity);
    }, 0);
  }

  function getQuantity () {
    return cartState.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  function getItems () {
    return cartState.items.map(item => {
      const { name, price } = meals.find(meal => meal.id === item.id);
      return {
        name,
        price,
        id: item.id,
        quantity: item.quantity
      };
    });
  }

  function setOrder (order) {
    cartDispatch({
      type: 'SAVE_ORDER',
      payload: order
    });
  }

  const defaultContext = {
    cartItems: cartState.items,
    lastOrder: cartState.lastOrder,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
    resetCart: handleResetCart,
    getCartTotal: getTotal,
    getCartQuantity: getQuantity,
    getCartItems: getItems,
    saveOrder: setOrder
  };

  return (
    <CartContext.Provider value={defaultContext}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
