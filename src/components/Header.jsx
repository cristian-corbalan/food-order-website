import imgLogo from '../assets/logo.jpg';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../store/CartContext.jsx';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header () {
  const { getQuantity } = useContext(CartContext);
  const { openCart } = useContext(UserProgressContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(getQuantity());
  }, [getQuantity]);

  function handleOpenCart () {
    openCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={imgLogo} alt="Food logo"/>
        <h1>React food</h1>
      </div>
      <Button isTextOnly={true} onClick={handleOpenCart}>Cart ({quantity})</Button>
    </header>
  );
}
