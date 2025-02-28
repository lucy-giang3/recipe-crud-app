import React from "react";
import { useNavigate } from "react-router-dom";
import Bookmark from "./Bookmark";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
}

interface RecipeItemProps {
  recipe: Recipe;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#3d3d3d] rounded-lg shadow-lg overflow-hidden mb-6 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      onClick={() => navigate(`/recipe/${recipe._id}`)}
    >
      <img
        src="../recipe-crud-app/assets/recipeimage.PNG"
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-white">{recipe.title}</h2>
          <Bookmark recipeId={recipe._id} />
        </div>
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#2bbb91] text-sm text-[#2b2c2d] px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
