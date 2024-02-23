import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { useCallback, useState } from 'react';
import { fetchMeals } from './services/https.js';
import CartContextProvider from './store/cart-context.jsx';
import Modal from './components/Modal.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import useFetch from './hooks/useFetch.js';
import Error from './components/Error.jsx';

function App () {
  const { isFetching: mealsIsFetching, error: mealsError, fetchData: meals } = useFetch([], fetchMeals);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkoutIsOpen, setCheckoutIsOpen] = useState(false);

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
            <Cart onCloseModal={handleCloseCart} onOpenCheckout={handleOpenCheckout}/>
        </Modal>
      )}

      {modalIsOpen && checkoutIsOpen && (
        <Modal open={modalIsOpen} onClose={handleCloseCart}>
            <Checkout onCloseModal={handleCloseCart}/>
        </Modal>
      )}

      <Header onOpenCart={handleOpenCart}/>

      {mealsError.message && <Error title="Ups, something was wrong" message="Could not fetch our meals, try again later" />}
      {!mealsError.message && <Meals meals={meals} isLoading={mealsIsFetching}/>}
    </CartContextProvider>
  );
}

export default App;
