import { useContext } from 'react';
import { CartContext } from '../store/cart-context.jsx';
import { currencyFormatter } from '../util/formatting.js';

export default function CartItem ({ id, quantity, name, price }) {
  const { updateCartItemQuantity } = useContext(CartContext);
  return (<li className="cart-item">
    <p>{name} - {quantity} x {currencyFormatter.format(price)}</p>
    <div className="cart-item-actions">
      <button onClick={() => updateCartItemQuantity(id, -1)}>-</button>
      <p>{quantity}</p>
      <button onClick={() => updateCartItemQuantity(id, 1)}>+</button>
    </div>
  </li>);
}
