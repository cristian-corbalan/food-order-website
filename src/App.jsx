import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import CartContextProvider from './store/cart-context.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import useHttp from './hooks/useHttp.js';
import Error from './components/Error.jsx';
import Summary from './components/Summary.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';

const httpConfig = {};

function App () {
  const { data: meals, error, isLoading } = useHttp('http://localhost:3000/meals', httpConfig, []);

  return (
    <CartContextProvider meals={meals}>
      <UserProgressContextProvider>
        <Cart/>

        <Checkout/>

        <Summary/>

        <Header/>

        {error.message && <Error title="Ups, something was wrong" message="Could not fetch our meals, try again later" />}
        {!error.message && <Meals meals={meals} isLoading={isLoading}/>}
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
