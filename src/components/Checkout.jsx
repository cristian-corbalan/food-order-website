import { useContext, useState } from 'react';
import { CartContext } from '../store/cart-context.jsx';
import Input from './Input.jsx';
import useInput from '../hooks/useInput.js';
import { hasMinLength, isEmail, isName } from '../util/validations.js';
import { sendOrder } from '../services/https.js';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import Modal from './Modal.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Checkout () {
  const { getCartTotal, getCartItems, resetCart, saveOrder } = useContext(CartContext);
  const { progress, closeCheckout, openSummary } = useContext(UserProgressContext);

  const [sendError, setSendError] = useState({ message: '' });
  const [isSending, setIsSending] = useState(false);

  const {
    value: nameValue,
    InputError: nameHasError,
    handleBlur: handleNameBlur,
    handleChange: handleNameChange
  } = useInput('', (value) => isName(value) && hasMinLength(value, 3));

  const {
    value: emailValue,
    InputError: emailHasError,
    handleBlur: handleEmailBlur,
    handleChange: handleEmailChange
  } = useInput('', isEmail);

  const {
    value: streetValue,
    InputError: streetHasError,
    handleBlur: handleStreetBlur,
    handleChange: handleStreetChange
  } = useInput('', (value) => hasMinLength(value, 3));

  const {
    value: postalCodeValue,
    InputError: postalCodeHasError,
    handleBlur: handlePostalCodeBlur,
    handleChange: handlePostalCodeChange
  } = useInput('', (value) => hasMinLength(value, 3));

  const {
    value: cityValue,
    InputError: cityHasError,
    handleBlur: handleCityBlur,
    handleChange: handleCityChange
  } = useInput('', (value) => hasMinLength(value, 3));

  async function handleFormSubmit (event) {
    event.preventDefault();

    if (nameHasError || emailHasError || streetHasError || postalCodeHasError || cityHasError) {
      return;
    }

    const order = {
      items: getCartItems(),
      customer: {
        email: emailValue,
        name: nameValue,
        street: streetValue,
        'postal-code': postalCodeValue,
        city: cityValue
      }
    };

    setSendError({ message: '' });

    setIsSending(true);
    try {
      const { message } = await sendOrder(order);

      if (message === 'Order created!') {
        saveOrder(order.items);
        resetCart();
        openSummary();
      }
    } catch (e) {
      setSendError({ message: 'The order could not be sent, please try again later.' });
    }

    setIsSending(false);
  }

  function handleClose () {
    closeCheckout();
  }

  return (
    <Modal open={progress === 'checkout'} onClose={progress === 'checkout' ? handleClose : null}>
      <div>

        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(getCartTotal())}</p>

        <form action="#" onSubmit={handleFormSubmit}>
          <Input
            label="Full name"
            id="name"
            name="name"
            type="text"
            required
            minLength={6}
            error={nameHasError && 'Please enter a valid name.'}
            onBlur={handleNameBlur}
            onChange={handleNameChange}/>
          <Input
            label="E-Mail Adress"
            id="email"
            name="email"
            type="email"
            required
            error={emailHasError && 'Please enter a valid email address.'}
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}/>
          <Input
            label="Street"
            id="street"
            name="street"
            type="text"
            required
            minLength={3}
            error={streetHasError && 'Please enter a valid street.'}
            onBlur={handleStreetBlur}
            onChange={handleStreetChange}/>

          <div className="control-row">
            <Input
              label="Postal Code"
              id="postal"
              name="postal"
              type="text"
              required
              minLength={3}
              error={postalCodeHasError && 'Please enter a valid postal code.'}
              onBlur={handlePostalCodeBlur}
              onChange={handlePostalCodeChange}/>
            <Input
              label="City"
              id="city"
              name="city"
              type="text"
              required
              minLength={3}
              error={cityHasError && 'Please enter a valid city name.'}
              onBlur={handleCityBlur}
              onChange={handleCityChange}/>
          </div>
          <div className="modal-actions">
            <Button type="button" isTextOnly={true} onClick={handleClose}>Close</Button>
            <Button disabled={isSending}>Submit Order</Button>
          </div>
        </form>
        {sendError.message && (
          <div className="modal-actions">
           <p className="modal-error-text">{sendError.message}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
