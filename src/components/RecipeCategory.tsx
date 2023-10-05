import axios from "axios";
import { useState, useEffect } from "react";
import { RecipeCategoryProps } from "../utils/types";
import { FaBars, FaTimes } from "react-icons/fa";

type OnSelectedCategoryType = (category: string) => void;

export const RecipeCategory = ({
  onSelectedCategory,
}: {
  onSelectedCategory: OnSelectedCategoryType;
}) => {
  const [recipeCategory, setRecipeCategory] = useState<RecipeCategoryProps[]>(
    []
  );

  const [nav, setNav] = useState(false);

  const [activeCategory, setActiveCategory] = useState("Beef");
  onSelectedCategory(activeCategory);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setRecipeCategory(response.data.categories);
      } catch (error) {
        console.error("Error when searching for recipe categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="hidden md:block">
        <h2 className="text-3xl mb-2 font-bold dark:text-white">Categories</h2>
        <ul className="list-none">
          {recipeCategory ? (
            recipeCategory.map((recipe, i) => (
              <li
                onClick={() => setActiveCategory(recipe.strCategory)}
                className={`flex items-center gap-2 mb-2 p-2 group cursor-pointer hover:bg-yellow-200  dark:text-white dark:hover:text-black rounded-xl transition-colors duration-200 ${
                  activeCategory == recipe.strCategory ? "bg-yellow-400" : null
                } `}
                key={i}
              >
                <img
                  className={`w-14 object-cover rounded-xl transition-all ease-out duration-200 ${
                    activeCategory == recipe.strCategory ? "scale-105" : null
                  } `}
                  src={recipe.strCategoryThumb}
                  alt={recipe.idCategory}
                />
                <h3
                  className={`dark:text-inherit truncate text-lg max-[822px]:text-base group-hover:font-bold transition-all ease-out duration-200 ${
                    activeCategory == recipe.strCategory
                      ? "font-bold text-black"
                      : null
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
      {nav ? (
        <FaTimes
          onClick={() => setNav(!nav)}
          className="cursor-pointer md:hidden mx-[50%] dark:bg-white "
        />
      ) : (
        <FaBars
          onClick={() => setNav(!nav)}
          className="cursor-pointer md:hidden dark:bg-white mx-[50%]"
        />
      )}

      {nav && (
        <>
          <h2 className="text-3xl mb-2 mt-5 font-bold dark:text-white">
            Categories:
          </h2>
          <ul className="grid grid-cols-1 min-[450px]:grid-cols-2 top-0 left-0 w-full dark:bg-[#343541] bg-white">
            {recipeCategory.map((recipe, i) => (
              <li
                onClick={() => {
                  setActiveCategory(recipe.strCategory);
                  setNav(!nav);
                }}
                className={`flex items-center gap-2 mb-2 p-2 group cursor-pointer hover:bg-yellow-200  dark:text-white dark:hover:text-black rounded-xl transition-colors duration-200 ${
                  activeCategory == recipe.strCategory ? "bg-yellow-400" : null
                } `}
                key={i}
              >
                <img
                  className={`w-14 object-cover rounded-xl transition-all ease-out duration-200 ${
                    activeCategory == recipe.strCategory ? "scale-105" : null
                  } `}
                  src={recipe.strCategoryThumb}
                  alt={recipe.idCategory}
                />
                <h3
                  className={`dark:text-inherit truncate text-lg max-[822px]:text-base group-hover:font-bold transition-all ease-out duration-200 ${
                    activeCategory == recipe.strCategory
                      ? "font-bold text-black"
                      : null
                  }`}
                >
                  {recipe.strCategory}
                </h3>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
