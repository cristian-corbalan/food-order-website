import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';
import CartItem from './CartItem.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import Modal from './Modal.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Cart () {
  const { getTotal, items } = useContext(CartContext);
  const { progress, closeCart, openCheckout } = useContext(UserProgressContext);

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

        <ul>
          {items.map(item => <CartItem key={item.id} item={item}/>)}
        </ul>

        <p className="cart-total">{currencyFormatter.format(getTotal())}</p>
        <div className="modal-actions">
          <Button isTextOnly={true} onClick={handleClose}>Close</Button>
          <Button onClick={handleToCheckout}>Go to Checkout</Button>
        </div>
      </div>
    </Modal>
  );
}
