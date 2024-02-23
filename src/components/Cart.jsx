import { useContext } from 'react';
import { CartContext } from '../store/cart-context.jsx';
import CartItem from './CartItem.jsx';

export default function Cart ({ onCloseModal, onOpenCheckout }) {
  const { getCartTotal, getCartItems } = useContext(CartContext);

  return (
    <div className="cart">
      <h2>Your cart</h2>
      <ul>
        {getCartItems().map(meal => <CartItem key={meal.id} id={meal.id} quantity={meal.quantity} name={meal.name} price={meal.price}/>)}
      </ul>
      <p className="cart-total">${getCartTotal()}</p>
      <div className="modal-actions">
        <button className="text-button" onClick={onCloseModal}>Close</button>
        <button className="button" onClick={onOpenCheckout}>Go to Checkout</button>
      </div>
    </div>
  );
}
