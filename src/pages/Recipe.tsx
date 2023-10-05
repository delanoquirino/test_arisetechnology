import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { RecipeDetailsProps } from "../utils/types";

import ReactPlayer from "react-player";
import { Label } from "../components/Label";
import { Loading } from "../components/Loading";

export const Recipe = () => {
  const [searchParams] = useSearchParams();
  const [recipe, setRecipe] = useState<RecipeDetailsProps>();
  const [loading, setLoading] = useState(true);

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [measures, setMeasures] = useState<string[]>([]);
  const query = searchParams.get("q");

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${query}`)
      .then((response) => {
        const meal = response.data.meals[0];
        setRecipe(meal);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [query]);

  useEffect(() => {
    if (!recipe) return;

    const newIngredients: string[] = [];
    const newMeasures: string[] = [];

    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;

      if (recipe[ingredientKey] && typeof recipe[ingredientKey] === "string") {
        newIngredients.push(recipe[ingredientKey]);
      }

      if (recipe[measureKey] && typeof recipe[measureKey] === "string") {
        newMeasures.push(recipe[measureKey]);
      }
    }

    setIngredients(newIngredients);
    setMeasures(newMeasures);
  }, [recipe]);

  return (
    <div className="w-full min-h-screen text-black dark:bg-[#343541] dark:text-white">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="bg-black h-80 sm:h-96 w-full relative">
            <img
              className="w-full h-full object-cover"
              src={recipe?.strMealThumb}
              alt={recipe?.idMeal}
            />
          </div>
          <div className="max-w-6xl mx-auto p-4">
            <h1 className="font-bold text-xl my-4">{recipe?.strMeal}</h1>
            <div>
              <h2 className="font-bold text-lx mt-7 mb-2">Ingredients:</h2>
              <ul className="list-none flex gap-2 flex-wrap text-sm sm:text-lg">
                {ingredients?.map((ingredient, i) => (
                  <li
                    className="flex items-center text-base gap-2 mb-2 p-1 md:p-2  cursor-pointer bg-yellow-200 text-black dark:hover:text-black rounded-xl transition-colors duration-200"
                    key={i}
                  >
                    <h3 className="dark:text-inherit ">
                      <span>{ingredient}</span>: <span>{measures[i]}</span>
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
            <h2 className="font-bold text-lx mt-7 mb-2">Instructions: </h2>
            <p className="leading-8">{recipe?.strInstructions}</p>
            <h2 className="font-bold text-lx mt-7 mb-2">Category:</h2>
            <div className="flex gap-2 flex-wrap cursor-pointer">
              <Label name={recipe?.strCategory} />
            </div>
            <h2 className="font-bold text-lx mt-7 mb-2">Region:</h2>
            <div className="flex gap-2 flex-wrap cursor-pointer">
              <Label name={recipe?.strArea} />
            </div>

            <div className="flex gap-2 flex-wrap"></div>
            <div
              className="mt-10 player-wrapper h-[300px] md:h-[400px] lg:h-[500px]
        "
            >
              <ReactPlayer
                className="react-player"
                url={recipe?.strYoutube}
                width="100%"
                height="100%"
                pip={true}
                stopOnUnmount={false}
              />
            </div>
            <Link
              className="block text-center my-5 font-bold dark:text-white"
              to="/"
            >
              Voltar
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
