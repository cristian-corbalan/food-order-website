import { createContext, useState } from 'react';

const UserProgressContext = createContext({
  progress: '', // '' || 'cart' || 'checkout' || 'summary'
  openCart: () => {},
  closeCart: () => {},
  openCheckout: () => {},
  closeCheckout: () => {},
  openSummary: () => {},
  closeSummary: () => {}
});

export function UserProgressContextProvider ({ children }) {
  const [userProgress, setUserProgress] = useState('');

  function openCart () {
    setUserProgress('cart');
  }

  function closeCart () {
    setUserProgress('');
  }

  function openCheckout () {
    setUserProgress('checkout');
  }

  function closeCheckout () {
    setUserProgress('');
  }

  function openSummary () {
    setUserProgress('summary');
  }

  function closeSummary () {
    setUserProgress('');
  }

  const initialContextValue = {
    progress: userProgress,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
    openSummary,
    closeSummary
  };

  return (
    <UserProgressContext.Provider value={initialContextValue}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
