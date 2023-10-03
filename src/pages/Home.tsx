import axios from "axios";
import { useEffect, useState } from "react";

import { AllRecipeProps } from "../utils/types";


import { RecipeByName } from "../components/RecipeByName";
import { RecipeCategory } from "../components/RecipeCategory";
import { RecipeRandom } from "../components/RecipeRandom";
import { Link } from "react-router-dom";

export const Home = () => {
  const [allRecipes, setAllRecipes] = useState<AllRecipeProps[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=
      `
      )
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
      <div className="grid grid-cols-4 gap-5 px-9">
        <div className="h-full hidden md:block">
          <RecipeCategory />
        </div>
        <div className="col-span-4 md:col-span-3">
          <RecipeRandom />
          <div>
            <h2 className="font-bold text-3xl dark:text-white mt-5">
              All Recipe
            </h2>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {allRecipes ? (
                allRecipes.map((recipe) => (
                  <Link to={`/recipe?q=${recipe.idMeal}`}
                    className=" bg-yellow-200 p-4 md:pb-9 rounded-xl h-full hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer"
                    key={recipe.idMeal}
                  >
                    <img
                      className="w-full h-[80%] rounded-xl object-cover "
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                    />
                    <h2 className="text-xl font-bold">{recipe.strMeal}</h2>
                   
                      <p className="max-[328px]:text-xs ">
                        <b>Category:</b> {recipe.strCategory}
                      </p>
                     
                
                    <div className="mt-1 max-w-full">
                      <p className="max-[360px]:hidden text-sm truncate">
                        {recipe.strInstructions}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p>Carregando...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
