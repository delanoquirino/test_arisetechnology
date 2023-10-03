import axios from "axios";
import { useEffect, useState } from "react";

import { AllRecipeProps } from "../utils/types";

import { AiFillYoutube } from "react-icons/ai";

import { RecipeByName } from "../components/RecipeByName";
import { RecipeCategory } from "../components/RecipeCategory";
import { RecipeRandom } from "../components/RecipeRandom";

export const Home = () => {
  const [allRecipes, setAllRecipes] = useState<AllRecipeProps[]>([]);
  console.log(allRecipes);
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
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {allRecipes ? (
                allRecipes.map((recipe) => (
                  <div
                    className=" bg-yellow-200 p-3 md:pb-9 rounded-xl h-full hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer"
                    key={recipe.idMeal}
                  >
                    <img
                      className="w-full h-[80%] rounded-xl object-cover"
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                    />
                    <h2 className="text-xl font-bold">{recipe.strMeal}</h2>
                    <div className="flex items-center gap-4 justify-between ">
                      <p className="max-[328px]:text-xs ">
                        <b>Category:</b> {recipe.strCategory}
                      </p>
                      <a
                        className="max-[425px]:hidden"
                        href={recipe.strYoutube}
                        target="_blank"
                      >
                        <AiFillYoutube size={25} color="red" />
                      </a>
                    </div>
                    <div className="mt-2">
                      <p className="max-[425px]:hidden text-ellipsis truncate whitespace-wrap">
                        {recipe.strInstructions}
                      </p>
                    </div>
                  </div>
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
