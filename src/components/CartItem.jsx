import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';
import { currencyFormatter } from '../util/formatting.js';

export default function CartItem ({ item }) {
  const { addItem, removeItem } = useContext(CartContext);

  return (<li className="cart-item">
    <p>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</p>
    <div className="cart-item-actions">
      <button onClick={() => removeItem(item.id)}>-</button>
      <p>{item.quantity}</p>
      <button onClick={() => addItem(item)}>+</button>
    </div>
  </li>);
}
