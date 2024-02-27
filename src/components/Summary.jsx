import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import Modal from './Modal.jsx';

export default function Summary () {
  const { lastOrder } = useContext(CartContext);
  const { progress, closeSummary } = useContext(UserProgressContext);

  const total = lastOrder.reduce((total, item) => total + (item.price * item.quantity), 0);

  function handleClose () {
    closeSummary();
  }

  return (
    <Modal open={progress === 'summary'} onClose={progress === 'summary' ? handleClose : null}>
      <div className="summary">
        <h2>You order was sent!!</h2>
        <h3>Summary</h3>
        <ul>
          {lastOrder.map(item => <li key={item.id}>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</li>)}
        </ul>
        <p className="summary-total">Total amount: {currencyFormatter.format(total)}</p>
        <div className="modal-actions">
          <Button onClick={handleClose}>Confirm</Button>
        </div>
      </div>
    </Modal>
  );
}
