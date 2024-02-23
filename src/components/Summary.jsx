import { useContext } from 'react';
import { CartContext } from '../store/cart-context.jsx';

export default function Summary ({ onCloseModal }) {
  const { getCartItems, getCartTotal, resetCart } = useContext(CartContext);

  function handleConfirmPurchase () {
    onCloseModal();
    resetCart();
  }

  return (
    <div className="summary">
      <h2>You order was sent!!</h2>
      <h3>Summary</h3>
      <ul>
        {getCartItems().map(item => <li key={item.id}>{item.name} - {item.quantity} x {item.price}</li>)}
      </ul>
      <p className="summary-total">Total amount: ${getCartTotal()}</p>
      <div className="modal-actions">
        <button className="button" onClick={handleConfirmPurchase}>Confirm</button>
      </div>
    </div>
  );
}
