import logo from "./../assets/Images/logo.png";
import { BiSearch } from "react-icons/bi";
import { DarkMode } from "./DarkMode";

export const Header = () => {
  return (
    <div className="flex items-center gap-5 p-5 dark:bg-black">
      <img src={logo} width={40} alt="Logo with an image of a plate of food." />
      <div className="w-full flex items-center bg-yellow-200 p-2 rounded-full">
        <BiSearch size={18} />
        <input
          type="text"
          placeholder="Search for Meals"
          className=" px-2 outline-none bg-transparent"
        />
      </div>
      <DarkMode/>
    </div>
  );
};
