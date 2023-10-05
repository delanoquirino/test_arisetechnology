import axios from "axios";
import { useEffect, useState } from "react";
import { RecipeRandomProps } from "../utils/types";
import { Link } from "react-router-dom";


export const RecipeRandom = () => {
  const [randomRecipes, setRandomRecipes] = useState<RecipeRandomProps[]>([]);
 
  const getRandomMeals = async () => {
    const tempMeals: RecipeRandomProps[] = [];
    while (tempMeals.length !== 4) {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/random.php?`
        );
        const meal = response.data.meals[0];
      

        if (
          !tempMeals.some((existingMeal) => existingMeal.idMeal === meal.idMeal)
        ) {
          tempMeals.push(meal);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return tempMeals;
  };

  useEffect(() => {
    getRandomMeals()
      .then((randomMeals) => {
        setRandomRecipes(randomMeals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="hidden md:block">
      <h2 className="font-bold text-3xl dark:text-white">Random Recipes</h2>

      <div className="md:grid md:grid-cols-2 gap-6 lg:grid-cols-4 mt-5">
        {randomRecipes.map((recipe) => (
          <Link
            to={`/recipe?q=${recipe.idMeal}`}
            className="bg-yellow-200 rounded-xl group hover:scale-110 hover:opacity-80 transition-all ease-in-out duration-300 cursor-pointer"
            key={recipe.idMeal}
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="h-64 w-full rounded-lg object-cover"
            />

            <h3 className="text-base truncate font-bold p-2">
              {recipe.strMeal}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};
