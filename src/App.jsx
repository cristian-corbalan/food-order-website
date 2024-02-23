import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { useCallback, useEffect, useState } from 'react';
import { fetchMeals } from './services/https.js';
import CartContextProvider from './store/cart-context.jsx';
import Modal from './components/Modal.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';

function App () {
  const [meals, setMeals] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkoutIsOpen, setCheckoutIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const meals = await fetchMeals();
      setMeals(meals);
    })();
  }, []);

  const handleOpenCart = useCallback(function handleOpenCart () {
    setModalIsOpen(true);
  }, []);

  const handleCloseCart = useCallback(function () {
    setModalIsOpen(false);
    setCheckoutIsOpen(false);
  }, []);

  const handleOpenCheckout = useCallback(function () {
    setCheckoutIsOpen(true);
  }, []);

  return (
    <CartContextProvider meals={meals}>
      {modalIsOpen && !checkoutIsOpen && (
        <Modal open={modalIsOpen} onClose={handleCloseCart}>
            <Cart meals={meals} onCloseModal={handleCloseCart} onOpenCheckout={handleOpenCheckout}/>
        </Modal>
      )}

      {modalIsOpen && checkoutIsOpen && (
        <Modal open={modalIsOpen} onClose={handleCloseCart}>
            <Checkout onCloseModal={handleCloseCart}/>
        </Modal>
      )}

      <Header onOpenCart={handleOpenCart}/>
      <Meals meals={meals}/>
    </CartContextProvider>
  );
}

export default App;
