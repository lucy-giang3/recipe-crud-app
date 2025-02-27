import React from "react";
import { useNavigate } from "react-router-dom";
import { FilePen } from "lucide-react";

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

const RecipeItemEdit: React.FC<RecipeItemProps> = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#3d3d3d] rounded-lg shadow-lg overflow-hidden mb-6 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      onClick={() => navigate(`/recipe/${recipe._id}`)}
    >
      <img
        src="/src/assets/recipeimage.PNG"
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-white">{recipe.title}</h2>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when clicking edit
              navigate(`/edit-recipe/${recipe._id}`);
            }}
            className="text-[#2bbb91] hover:text-[#497368]"
          >
            <FilePen size={20} className="inline-block" />
            {/* Edit Button */}
          </button>
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

export default RecipeItemEdit;
