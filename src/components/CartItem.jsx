import { useContext } from 'react';
import { CartContext } from '../store/cart-context.jsx';

export default function CartItem ({ id, quantity, name, price }) {
  const { updateCartItemQuantity } = useContext(CartContext);
  return (<li className="cart-item">
    <p>{name} - {quantity} x ${price}</p>
    <div className="cart-item-actions">
      <button onClick={() => updateCartItemQuantity(id, -1)}>-</button>
      <p>{quantity}</p>
      <button onClick={() => updateCartItemQuantity(id, 1)}>+</button>
    </div>
  </li>);
}
