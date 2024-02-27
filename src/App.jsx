import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { CartContextProvider } from './store/CartContext.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Summary from './components/Summary.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';

function App () {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
        <Cart/>

        <Checkout/>

        <Summary/>

        <Header/>

        <Meals/>
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
