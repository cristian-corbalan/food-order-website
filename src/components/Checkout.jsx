import { useContext } from 'react';
import { CartContext } from '../store/cart-context.jsx';
import Input from './Input.jsx';
import useInput from '../hooks/useInput.js';
import { hasMinLength, isEmail, isName } from '../util/validations.js';

export default function Checkout ({ onCloseModal }) {
  const { getCartTotal } = useContext(CartContext);
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

  function handleFormSubmit (event) {
    event.preventDefault();

    if (nameHasError || emailHasError || streetHasError || postalCodeHasError || cityHasError) {
      return;
    }

    console.log('Form data:', { nameValue, emailValue, streetValue, postalCodeValue, cityValue });
    console.log('Fetching...');
  }

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total amount: ${getCartTotal()}</p>
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
          <button type="button" className="text-button" onClick={onCloseModal}>Close</button>
          <button className="button">Submit Order</button>
        </div>
      </form>
    </div>
  );
}
