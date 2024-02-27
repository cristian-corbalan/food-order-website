import MealItem from './MealItem.jsx';
import Loader from './Loader.jsx';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';

const httpConfig = {};
export default function Meals () {
  const { data: meals, error, isLoading } = useHttp('http://localhost:3000/meals', httpConfig, []);

  if (error) {
    return <Error title="Failed to fetch mels" message={error} />;
  }

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
