import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { useState } from 'react';
import CartContextProvider from './store/cart-context.jsx';
import Modal from './components/Modal.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import useHttp from './hooks/useHttp.js';
import Error from './components/Error.jsx';
import Summary from './components/Summary.jsx';

const httpConfig = {};

function App () {
  const { data: meals, error, isLoading } = useHttp('http://localhost:3000/meals', httpConfig, []);

  console.log(meals);
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

      {error.message && <Error title="Ups, something was wrong" message="Could not fetch our meals, try again later" />}
      {!error.message && <Meals meals={meals} isLoading={isLoading}/>}
    </CartContextProvider>
  );
}

export default App;
