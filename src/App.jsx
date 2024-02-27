import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { useState } from 'react';
import { fetchMeals } from './services/https.js';
import CartContextProvider from './store/cart-context.jsx';
import Modal from './components/Modal.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import useHttp from './hooks/useHttp.js';
import Error from './components/Error.jsx';
import Summary from './components/Summary.jsx';

function App () {
  const { isFetching: mealsIsFetching, error: mealsError, fetchData: meals } = useHttp([], fetchMeals);

  const [modal, setModal] = useState({
    isOpen: false,
    modalToShow: 'cart'
  });

  function handleOpenModal (modalToShow) {
    setModal({ isOpen: true, modalToShow });
  }

  function handleCloseModal () {
    setModal({ isOpen: false, modalToShow: 'cart' });
  }

  return (
    <CartContextProvider meals={meals}>
      {modal.isOpen && modal.modalToShow === 'cart' && (
        <Modal open={modal.isOpen} onClose={handleCloseModal}>
            <Cart onCloseModal={handleCloseModal} onOpenCheckout={() => handleOpenModal('checkout')}/>
        </Modal>
      )}

      {modal.isOpen && modal.modalToShow === 'checkout' && (
        <Modal open={modal.isOpen} onClose={handleCloseModal}>
            <Checkout onCloseModal={handleCloseModal} onShowSummary={() => handleOpenModal('summary')}/>
        </Modal>
      )}

      {modal.isOpen && modal.modalToShow === 'summary' && (
        <Modal open={modal.isOpen} onClose={handleCloseModal}>
          <Summary onCloseModal={handleCloseModal}/>
        </Modal>
      )}

      <Header onOpenCart={() => handleOpenModal('cart')}/>

      {mealsError.message && <Error title="Ups, something was wrong" message="Could not fetch our meals, try again later" />}
      {!mealsError.message && <Meals meals={meals} isLoading={mealsIsFetching}/>}
    </CartContextProvider>
  );
}

export default App;
