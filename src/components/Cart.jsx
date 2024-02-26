import { useContext } from 'react';
import { CartContext } from '../store/cart-context.jsx';
import CartItem from './CartItem.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';

export default function Cart ({ onCloseModal, onOpenCheckout }) {
  const { getCartTotal, getCartItems } = useContext(CartContext);

  const total = getCartTotal();

  return (
    <div className="cart">
      <h2>Your cart</h2>
      {total === 0 && (
        <>
          <p>The cart is empty.</p>
          <div className="modal-actions">
            <Button onClick={onCloseModal}>Close</Button>
          </div>
        </>
      )}

      {total > 0 && (
        <>
          <ul>
            {getCartItems().map(meal => <CartItem
              key={meal.id}
              id={meal.id}
              quantity={meal.quantity}
              name={meal.name}
              price={meal.price}/>)}
          </ul>
          <p className="cart-total">{currencyFormatter.format(getCartTotal())}</p>
          <div className="modal-actions">
            <Button isTextOnly={true} onClick={onCloseModal}>Close</Button>
            <Button onClick={onOpenCheckout}>Go to Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
}
