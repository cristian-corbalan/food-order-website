export default function CartItem ({ id, quantity, name, price }) {
  return (<li className="cart-item">
    <p>{name} - {quantity} x ${price}</p>
    <div className="cart-item-actions">
      <button>-</button>
      <p>{quantity}</p>
      <button>+</button>
    </div>
  </li>);
}
