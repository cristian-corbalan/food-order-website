import MealItem from './MealItem.jsx';

export default function Meals ({ meals }) {
  return (
    <main>
      <h2>Our meals</h2>
      <ul id="meals">
        {meals.map(meal =>
          <MealItem key={meal.id} meal={meal}/>
        )}
      </ul>
    </main>
  );
}
