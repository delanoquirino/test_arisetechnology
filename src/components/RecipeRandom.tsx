import axios from "axios";
import { useEffect, useState } from "react";
import { RecipeRandomProps } from "../utils/types";

export const RecipeRandom = () => {
  const [randomRecipes, setRandomRecipes] = useState<RecipeRandomProps[]>([]);
  console.log(randomRecipes);
  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((response) => {
        setRandomRecipes(response.data.meals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="h-20 w-80">
      {randomRecipes ? (
        randomRecipes.map((recipe, index) => (
          <div key={index}>
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p>{recipe.strInstructions}</p>
            <p>{recipe.strYoutube}</p>
          </div>
        ))
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};
