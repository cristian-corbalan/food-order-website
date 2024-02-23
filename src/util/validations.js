export function isEmail (email) {
  const regularExpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regularExpression.test(email);
}

export function isName (name) {
  const regularExpression = /^[a-zA-ZÀ-ÿ\s,.'-]+$/;
  return regularExpression.test(name);
}

export function hasMinLength (string, amount) {
  return string.length >= amount;
}
