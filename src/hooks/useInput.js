import { useState } from 'react';

export default function useInput (initialValue = '', validFunction = () => {}) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [didEdit, setDidEdit] = useState(false);

  const inputHasError = didEdit && !validFunction(inputValue);

  function handleValueChange (event) {
    setInputValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur () {
    setDidEdit(true);
  }

  return {
    value: inputValue,
    InputError: inputHasError,
    handleChange: handleValueChange,
    handleBlur: handleInputBlur
  };
}
