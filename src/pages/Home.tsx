import { RecipeByName } from "../components/RecipeByName"
import { RecipeRandom } from "../components/RecipeRandom";

export const Home = () => {
  return (
    <div className="dark:bg-[#343541]">
      <RecipeByName/>
      <RecipeRandom/>
    </div>
  );
};
