import { useEffect } from "react";
import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

export const DarkMode = () => {
  const [toggle, setToggle] = useState(true);
  console.log(toggle);
  
  function toggleThemeMode() {
    const newTheme = toggle ? "light" : "dark";
    localStorage.theme = newTheme;
    setToggle(!toggle);
  }


  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
       setToggle(true);
    } else {
      document.documentElement.classList.remove("dark");
      setToggle(false);
    }
  }, [toggle]);

  return (
    

    <button onClick={toggleThemeMode}>
      {toggle ? <BsMoonFill color={"#d4dee1"} size={24} />: <BsSunFill size={24} /> }
    </button>
  );
};
