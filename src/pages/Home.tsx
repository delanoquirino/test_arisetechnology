import axios from "axios";
import { useEffect, useState } from "react";

import { AllRecipeProps } from "../utils/types";

import { RecipeByName } from "../components/RecipeByName";
import { RecipeCategory } from "../components/RecipeCategory";
import { RecipeRandom } from "../components/RecipeRandom";
import { Link } from "react-router-dom";

export const Home = () => {
  const [allRecipes, setAllRecipes] = useState<AllRecipeProps[]>([]);
  const [category, setCategory] = useState("Beef");
  useEffect(() => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}
      `
      )
      .then((response) => {
        setAllRecipes(response.data.meals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category]);

  return (
    <div className="dark:bg-[#343541]">
      <RecipeByName />
      <div className="flex flex-col md:grid grid-cols-4 gap-2 md:gap-7 px-9 mt-5">
        <section className="h-full md:block">
          <RecipeCategory onSelectedCategory={setCategory} />
        </section>
        <section className="col-span-4 md:col-span-3">
          <RecipeRandom />
          <div className="mt-1 md:mt-10">
            <h2 className="font-bold  text-3xl dark:text-white mt-2 md:mt-5">
              Recipes using: {category}
            </h2>
            <section className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {allRecipes.map((recipe) => (
                <Link
                  to={`/recipe?q=${recipe.idMeal}`}
                  className=" bg-yellow-200 p-2 pb-4 rounded-xl h-full hover:scale-105 hover:opacity-80 transition-all ease-in-out duration-300 cursor-pointer"
                  key={recipe.idMeal}
                >
                  <img
                    className="w-full h-[80%] rounded-xl object-cover "
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                  />
                  <h2 className="text-xl font-bold truncate">
                    {recipe.strMeal}
                  </h2>
                  <p className="text-sm truncate font-bold ">
                    Category: {category}
                  </p>
                </Link>
              ))}
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};
