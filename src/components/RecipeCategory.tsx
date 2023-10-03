import axios from "axios";
import { useState, useEffect } from "react";
import { RecipeCategoryProps } from "../utils/types";

export const RecipeCategory = () => {
  const [recipeCategory, setRecipeCategory] = useState<RecipeCategoryProps[]>(
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        setRecipeCategory(response.data.categories);
      } catch (error) {
        console.error("Erro ao buscar categorias de receitas:", error);
        
      }
    };
  
    fetchCategories();
  }, []);

  return (
    <div>
      <h2 className="text-3xl mb-2 font-bold dark:text-white">Categories</h2>
      <ul className="list-none">
        {recipeCategory ? (
          recipeCategory.map((recipe, i) => (
            <li
              onClick={() => setActiveIndex(i)}
              className={`flex items-center gap-2 mb-2 p-2 group cursor-pointer hover:bg-yellow-200  dark:text-white dark:hover:text-black rounded-xl transition-colors duration-200 ${
                activeIndex == i ? "bg-yellow-400" : null
              } `}
              key={recipe.idCategory}
            >
              <img
                className={`w-14 object-cover rounded-xl group-hover:scale-105 transition-all ease-out duration-200 ${
                  activeIndex == i ? "scale-105" : null
                } `}
                src={recipe.strCategoryThumb}
                alt={recipe.idCategory}
              />
              <h3
                className={`dark:text-inherit text-lg group-hover:font-bold transition-all ease-out duration-200 ${
                  activeIndex == i ? "font-bold" : null
                }`}
              >
                {recipe.strCategory}
              </h3>
            </li>
          ))
        ) : (
          <p>Carregando...</p>
        )}
      </ul>
    </div>
  );
};
