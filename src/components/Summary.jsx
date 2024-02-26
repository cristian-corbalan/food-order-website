import { useContext } from 'react';
import { CartContext } from '../store/cart-context.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';

export default function Summary ({ onCloseModal }) {
  const { lastOrder } = useContext(CartContext);

  const total = lastOrder.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="summary">
      <h2>You order was sent!!</h2>
      <h3>Summary</h3>
      <ul>
        {lastOrder.map(item => <li key={item.id}>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</li>)}
      </ul>
      <p className="summary-total">Total amount: {currencyFormatter.format(total)}</p>
      <div className="modal-actions">
        <Button onClick={onCloseModal}>Confirm</Button>
      </div>
    </div>
  );
}
