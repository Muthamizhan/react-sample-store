import { useContext } from "react";
import { currenctFormatter } from "../utils.js/formatter";
import Button from "./Button";
import CartContext from "../store/CartContext";

export default function MealItem({ meal }) {

  const cartContext = useContext(CartContext)
  function handleClick(data) {
    cartContext.addItem(data);
  }
  return (
    <li className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${meal.image}`}
          alt={meal.description}
        />
        <div>
          <h3>{meal.name}</h3>
          <span className="meal-item-price">
            {currenctFormatter.format(meal.price)}
          </span>
          <p className="meal-item-description">{meal.description}</p>
          <p className="meal-item-actions">
            <Button
              type="button"
              className="button-action"
              onClick={()=>{handleClick(meal)}}
            >
              Add to Cart
            </Button>
          </p>
        </div>
      </article>
    </li>
  );
}
