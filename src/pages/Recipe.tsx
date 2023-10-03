import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Recipe = () => {
  const [searchParams] = useSearchParams();
  const [recipe, setRecipe] = useState();

  const query = searchParams.get("q");
  console.log(recipe);
  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${query}`)
      .then((response) => {
        setRecipe(response.data.meals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  return (
    <div className="text-black">Recipe</div>
  )
}

