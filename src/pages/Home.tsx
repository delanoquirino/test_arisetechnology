import axios from "axios";
import { useEffect, useState } from "react";

import { AllRecipeProps } from "../utils/types";

import { RecipeByName } from "../components/RecipeByName";
import { RecipeCategory } from "../components/RecipeCategory";
import { RecipeRandom } from "../components/RecipeRandom";

export const Home = () => {
  const [allRecipes, setAllRecipes] = useState<AllRecipeProps[]>([])
  console.log(allRecipes)
  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=
      `)
      .then((response) => {
        setAllRecipes(response.data.meals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="dark:bg-[#343541]">
      <RecipeByName />
      <div className="grid grid-cols-4 px-9">
        <div className="h-full hidden md:block">
          <RecipeCategory />
        </div>
        <div className="col-span-4 md:col-span-3">
          <RecipeRandom />
          <div>
          {allRecipes ? (
        allRecipes.map((recipe) => (
          <div key={recipe.idMeal}>
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            
            <p>{recipe.strYoutube}</p>
          </div>
        ))
      ) : (
        <p>Carregando...</p>
      )}
          </div>
        </div>
      </div>
    </div>
  );
};
