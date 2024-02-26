import { useContext } from 'react';
import { CartContext } from '../store/cart-context.jsx';
import { currencyFormatter } from '../util/formatting.js';

export default function MealItem ({ meal }) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <li className="meal-item">
      <article>
        <img src={'http://localhost:3000/' + meal.image} alt={meal.name}/>
        <div className="meal-item-description">
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
          <p>{meal.description}</p>
          <button className="button meal-item-actions" onClick={() => addItemToCart(meal.id)}>Add to Cart</button>
        </div>
      </article>
    </li>
  );
}
