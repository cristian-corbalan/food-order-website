import imgLogo from '../assets/logo.jpg';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../store/cart-context.jsx';

export default function Header ({ onOpenCart }) {
  const { getCartQuantity } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(getCartQuantity());
  }, [getCartQuantity]);

  return (
    <header id="main-header">
      <div id="title">
        <img src={imgLogo} alt="Food logo"/>
        <h1>React food</h1>
      </div>
      <button className='text-button' onClick={onOpenCart}>Cart ({quantity})</button>
    </header>
  );
}
