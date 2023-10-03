import axios from "axios";
import { useEffect, useState } from "react";
import { RecipeRandomProps } from "../utils/types";

export const RecipeRandom = () => {
  const [randomRecipes, setRandomRecipes] = useState<RecipeRandomProps[]>([]);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/random.php?`)
      .then((response) => {
        setRandomRecipes(response.data.meals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-5 hidden md:block">
      <h2 className="font-bold text-3xl dark:text-white">Random Recipes</h2>
      <div className="md:grid md: grid-cols-3 gap-3 lg:grid-cols-4 mt-5">
        {randomRecipes ? (
          randomRecipes.map((recipe) => (
            <div className="bg-yellow-200 rounded-xl group hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer" key={recipe.idMeal}>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="h-64 rounded-lg object-cover"
              />

              <h3 className="dark:text-white text-base font-bold p-2">
                {recipe.strMeal}
              </h3>
            </div>
          ))
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
};
