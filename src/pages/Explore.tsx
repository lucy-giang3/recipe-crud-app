import { useEffect, useState } from "react";
import { getProducts } from "../api";
import RecipeItem from "../components/RecipeItem";
import SliderMenu from "../components/SliderMenu";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  likes: number;
  author: string;
}

export default function Explore() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getProducts();
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  const trendingRecipes = [...recipes]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 10);

  const featuredRecipes = recipes.filter(
    (recipe) => recipe.author.toLowerCase() === "chefwinter"
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>

      {/* Trending Recipes */}
      <h2 className="text-xl font-semibold mb-2">Trending Recipes</h2>
      <SliderMenu items={trendingRecipes} />

      {/* Featured Recipes */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Featured Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredRecipes.map((recipe) => (
          <RecipeItem key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
