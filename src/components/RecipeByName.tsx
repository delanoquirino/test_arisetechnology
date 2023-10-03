import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleTagItemClick = (itemName: string) => {
    if (!itemName) return;

    navigate(`/search?q=${itemName}`);

  };

  
  return (
    <ul className="flex justify-center flex-wrap gap-3 p-4 dark:text-white  ">
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
