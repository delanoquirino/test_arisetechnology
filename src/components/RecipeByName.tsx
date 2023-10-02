import axios from "axios";
import { useEffect, useState } from "react";

type ItemProps = {
  name: string;
};

const tagLetter = [
  { name: "a" },
  { name: "b" },
  { name: "c" },
  { name: "d" },
  { name: "e" },
  { name: "f" },
  { name: "g" },
  { name: "h" },
  { name: "i" },
  { name: "j" },
  { name: "k" },
  { name: "l" },
  { name: "m" },
  { name: "n" },
  { name: "o" },
  { name: "p" },
  { name: "q" },
  { name: "r" },
  { name: "s" },
  { name: "t" },
  { name: "u" },
  { name: "v" },
  { name: "w" },
  { name: "x" },
  { name: "y" },
  { name: "z" },
];

export const RecipeByName = () => {
  const [tagName, setTagName] = useState("");

  const handleTagItemClick = (itemName: string) => {
    if (itemName === tagName) {
      setTagName("");
    } else {
      setTagName(itemName);
    }
  };

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${tagName}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <ul className="flex justify-center flex-wrap gap-3 p-2 dark:text-white  ">
      {tagLetter.map((item: ItemProps, i) => (
        <li className="text-xl" key={`${i} + item`}>
          <button
            className="uppercase hover:text-[#FEF08A] hover:scale-110"
            onClick={() => handleTagItemClick(item.name)}
          >
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
