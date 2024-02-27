import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import Modal from './Modal.jsx';

export default function Summary () {
  const { getTotal, items, reset } = useContext(CartContext);
  const { progress, closeSummary } = useContext(UserProgressContext);

  function handleClose () {
    closeSummary();
    reset();
  }

  return (
    <Modal open={progress === 'summary'} onClose={progress === 'summary' ? handleClose : null}>
      <div className="summary">
        <h2>You order was sent!!</h2>
        <h3>Summary</h3>
        <ul>
          {items.map(item => <li key={item.id}>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</li>)}
        </ul>
        <p className="summary-total">Total amount: {currencyFormatter.format(getTotal())}</p>
        <div className="modal-actions">
          <Button onClick={handleClose}>Confirm</Button>
        </div>
      </div>
    </Modal>
  );
}
