import { useState } from "react";
import RecipeItem from "./RecipeItem";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  likes: number;
  author: string;
}

interface SliderMenuProps {
  items: Recipe[];
}

const SliderMenu: React.FC<SliderMenuProps> = ({ items }) => {
  const [scrollIndex, setScrollIndex] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    setScrollIndex((prev) =>
      direction === "left"
        ? Math.max(prev - 1, 0)
        : Math.min(prev + 1, Math.max(items.length - 5, 0))
    );
  };

  return (
    <div className="relative flex items-center overflow-hidden">
      <button
        onClick={() => handleScroll("left")}
        className="p-2 bg-gray-300 rounded-full absolute left-0 z-10"
        disabled={scrollIndex === 0}
      >
        &lt;
      </button>
      <div
        className="flex gap-4 transition-transform"
        style={{ transform: `translateX(-${scrollIndex * 100}%)` }}
      >
        {items.map((recipe) => (
          <div key={recipe._id} className="w-1/5 flex-shrink-0">
            <RecipeItem recipe={recipe} />
          </div>
        ))}
      </div>
      <button
        onClick={() => handleScroll("right")}
        className="p-2 bg-gray-300 rounded-full absolute right-0 z-10"
        disabled={scrollIndex >= Math.max(items.length - 5, 0)}
      >
        &gt;
      </button>
    </div>
  );
};

export default SliderMenu;
