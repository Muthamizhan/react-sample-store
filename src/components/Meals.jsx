import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/http";

const requestConfig = {};

export default function Meals() {
  // const [mealsData, setMealsData] = useState([]);
  const {
    data: mealsData,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  console.log(mealsData);

  // useEffect(() => {
  //   async function fetchMealData() {
  //     const response = await fetch("http://localhost:3000/meals");
  //     const resData = await response.json();

  //     if (!response.ok) {
  //       throw new Error("Failed to Fetch data");
  //     }

  //     setMealsData(resData);
  //   }
  //   fetchMealData();
  // }, []);

  if (isLoading) {
    return <p className="center"> Loading Meals...</p>;
  }

  return (
    <ul id="meals">
      {!isLoading &&
        mealsData.length &&
        mealsData.map((meal) => {
          return <MealItem meal={meal} key={meal.id} />;
        })}
    </ul>
  );
}
