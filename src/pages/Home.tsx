import { RecipeByName } from "../components/RecipeByName"

export const Home = () => {
  return (
    <div className="dark:bg-[#343541]">
      <RecipeByName/>
      <div>Receitas Aleatorias</div>
    </div>
  );
};
