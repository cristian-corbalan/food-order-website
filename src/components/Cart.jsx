import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';
import CartItem from './CartItem.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import Modal from './Modal.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Cart () {
  const { getCartTotal, getCartItems } = useContext(CartContext);
  const { progress, closeCart, openCheckout } = useContext(UserProgressContext);

  const total = getCartTotal();

  function handleClose () {
    closeCart();
  }

  function handleToCheckout () {
    openCheckout();
  }

  return (
    <Modal open={progress === 'cart'} onClose={progress === 'cart' ? handleClose : null}>
      <div className="cart">
        <h2>Your cart</h2>
        {total === 0 && (
          <>
            <p>The cart is empty.</p>
            <div className="modal-actions">
              <Button onClick={handleClose}>Close</Button>
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
              <Button isTextOnly={true} onClick={handleClose}>Close</Button>
              <Button onClick={handleToCheckout}>Go to Checkout</Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
