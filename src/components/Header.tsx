import logo from "./../assets/Images/logo.png";
import { BiSearch } from "react-icons/bi";
import { DarkMode } from "./DarkMode";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


export const Header = () => {
  const [search, setSearch] = useState("")
  console.log(search)
  const navigate = useNavigate()
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!search) return

    navigate(`/search?q=${search}`)
    setSearch("")
  }
  
  return (
    <div className="flex items-center gap-5 p-5 dark:bg-[#343541]">
      <Link to={`/`}><img src={logo} width={40} alt="Logo with an image of a plate of food." /></Link>
      <form onSubmit={handleSubmit} className="w-full flex items-center bg-yellow-200 p-2 rounded-full">
        <button>
          <BiSearch size={18} />
        </button>
        <input
          type="text"
          placeholder="Search for Meals"
          className=" px-2 outline-none bg-transparent w-11/12"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </form>
      <DarkMode/>
    </div>
  );
};
