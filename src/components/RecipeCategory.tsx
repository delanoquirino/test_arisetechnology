import axios from "axios";
import { useState, useEffect } from "react";
import { RecipeCategoryProps } from "../utils/types";

type OnSelectedCategoryType = (category: string) => void;
export const RecipeCategory = ({ onSelectedCategory }: { onSelectedCategory: OnSelectedCategoryType }) => {
  const [recipeCategory, setRecipeCategory] = useState<RecipeCategoryProps[]>(
    []
  );

 
  const [activeCategory, setActiveCategory] = useState('Beef');
  onSelectedCategory(activeCategory)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        setRecipeCategory(response.data.categories);
        
      } catch (error) {
        console.error("Error when searching for recipe categories:", error);
        
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
              onClick={() => setActiveCategory(recipe.strCategory)}
              className={`flex items-center gap-2 mb-2 p-2 group cursor-pointer hover:bg-yellow-200  dark:text-white dark:hover:text-black rounded-xl transition-colors duration-200 ${
                activeCategory == recipe.strCategory ? "bg-yellow-400" : null
              } `}
              key={ i}
            >
              <img
                className={`w-14 object-cover rounded-xl group-hover:scale-105 transition-all ease-out duration-200 ${
                  activeCategory == recipe.strCategory ? "scale-105" : null
                } `}
                src={recipe.strCategoryThumb}
                alt={recipe.idCategory}
              />
              <h3
                className={`dark:text-inherit text-lg group-hover:font-bold transition-all ease-out duration-200 ${
                  activeCategory == recipe.strCategory ? "font-bold" : null
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
