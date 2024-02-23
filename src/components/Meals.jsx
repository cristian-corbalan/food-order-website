import MealItem from './MealItem.jsx';
import Loader from './Loader.jsx';

export default function Meals ({ meals, isLoading }) {
  return (
    <main>
      <h2 className="sr-only">Our meals</h2>
      {isLoading && <Loader/>}
      {!isLoading && (
        <ul id="meals">
          {meals.map(meal =>
            <MealItem key={meal.id} meal={meal}/>
          )}
        </ul>
      )}
    </main>
  );
}
