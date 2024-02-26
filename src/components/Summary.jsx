import { useContext } from 'react';
import { CartContext } from '../store/cart-context.jsx';
import { currencyFormatter } from '../util/formatting.js';

export default function Summary ({ onCloseModal }) {
  const { lastOrder, getCartTotal } = useContext(CartContext);

  return (
    <div className="summary">
      <h2>You order was sent!!</h2>
      <h3>Summary</h3>
      <ul>
        {lastOrder.map(item => <li key={item.id}>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</li>)}
      </ul>
      <p className="summary-total">Total amount: {currencyFormatter.format(getCartTotal())}</p>
      <div className="modal-actions">
        <button className="button" onClick={onCloseModal}>Confirm</button>
      </div>
    </div>
  );
}
