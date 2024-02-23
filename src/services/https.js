export async function fetchMeals () {
  const response = await fetch('http://localhost:3000/meals');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }

  return resData;
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
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to send order');
  }

  return resData;
}
