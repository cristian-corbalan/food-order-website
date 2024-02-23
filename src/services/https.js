export async function fetchMeals () {
  const response = await fetch('http://localhost:3000/meals');
  return await response.json();
}

export async function sendOrder (order) {
  const response = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    body: JSON.stringify({
      order
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}
