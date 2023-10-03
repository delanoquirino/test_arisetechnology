import { RecipeByName } from "../components/RecipeByName";
import { RecipeCategory } from "../components/RecipeCategory";
import { RecipeRandom } from "../components/RecipeRandom";

export const Home = () => {
  return (
    <div className="dark:bg-[#343541]">
      <RecipeByName />
      <div className="grid grid-cols-4 px-9">
        <div className="h-full hidden md:block">
          <RecipeCategory />
        </div>
        <div className="col-span-4 md:col-span-3">
          <RecipeRandom />
        </div>
      </div>
    </div>
  );
};
