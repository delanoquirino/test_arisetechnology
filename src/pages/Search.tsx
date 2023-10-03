import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { AllRecipeProps } from "../utils/types";
export const Search = () => {
  const [searchParams] = useSearchParams();
  const [recipe, setRecipe] = useState<AllRecipeProps[]>([]);

  const query = searchParams.get("q");
  console.log(recipe);
  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((response) => {
        setRecipe(response.data.meals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  return (
    <div className="min-h-screen dark:bg-[#343541] ">
      <div className="p-5 ">
        <Link className="font-bold dark:text-white text-center" to="/">Voltar</Link>
        <h2 className="font-bold text-3xl text-center dark:text-white mt-5">
          Result for: {query}
        </h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto h-full ">
          {recipe ? (
            recipe.map((recipe) => (
              <Link
                to={`/recipe?q=${recipe.idMeal}`}
                className=" bg-yellow-200 p-3 md:pb-9 rounded-xl  hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer"
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
  );
};
