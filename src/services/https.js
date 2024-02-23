export async function fetchMeals () {
  const response = await fetch('http://localhost:3000/meals');
  return await response.json();
}
