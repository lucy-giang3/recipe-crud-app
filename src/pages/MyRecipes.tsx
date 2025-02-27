import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api";
import RecipeItemEdit from "../components/RecipeItemEdit";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  imageUrl: string;
}

const MyRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getProducts();
      const filteredRecipes = data.filter(
        (recipe: Recipe) => recipe.author === "ChefDemo"
      );
      setRecipes(filteredRecipes);
    };

    fetchRecipes();
  }, []);

  return (
    <div className="p-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">My Recipes</h1>
        <button
          onClick={() => navigate("/add-recipe")}
          className="bg-[#2bbb91] hover:bg-[#2b5449] text-white px-4 py-2 rounded-lg"
        >
          + Add Recipe
        </button>
      </div>

      {/* Recipe Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="relative">
            <RecipeItemEdit recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
