import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api";
import { ThumbsUp } from "lucide-react";
import Bookmark from "../components/Bookmark";

interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  author: string;
  likes: number;
  imageUrl: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  category: string;
}

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchRecipe = async () => {
      const data = await getProduct(id);
      setRecipe(data);

      setLikeCount(data.likes);

      const userLiked = localStorage.getItem(`liked-${id}`);
      setHasLiked(!!userLiked);
    };

    fetchRecipe();
  }, [id]);

  const handleLike = () => {
    if (hasLiked) {
      const newLikeCount = likeCount - 1;
      setLikeCount(newLikeCount);

      localStorage.removeItem(`liked-${id}`);
      setHasLiked(false);
    } else {
      const newLikeCount = likeCount + 1;
      setLikeCount(newLikeCount); // Update the like count in the state

      // Mark the recipe as liked in localStorage
      localStorage.setItem(`liked-${id}`, "true");
      setHasLiked(true);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-start p-6">
      <div className="w-full max-w-4xl">
        {/* Recipe Image */}
        <img
          src="../recipe-crud-app/assets/recipeimage.PNG"
          alt={recipe.title}
          className="w-full h-80 object-cover rounded-lg"
        />

        <div className="mt-4">
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <h2 className="text-xl font-semibold mt-2">By {recipe.author}</h2>
          {/* Likes and Bookmark Button */}
          <div className="flex items-center space-x-4 mt-2">
            {/* Likes Button */}
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 p-2 transition-colors duration-100 ${
                hasLiked ? "text-[#2bbb91]" : "text-white"
              } hover:text-[#2bbb91]`}
            >
              <ThumbsUp
                size={24}
                className={`transition-colors duration-200 ${
                  hasLiked ? "text-[#2bbb91]" : "text-white"
                } hover:text-[#2bbb91]`}
              />
              <span className="transition-colors duration-100">
                {likeCount}
              </span>
            </button>

            {/* Bookmark Button */}
            <Bookmark recipeId={recipe._id} />
          </div>
        </div>

        {/* Subheading for Prep Time, Cook Time, Servings, Category */}
        <div className="mt-4 text-gray-600 text-lg">
          <span>{`Prep Time: ${recipe.prepTime} | `}</span>
          <span>{`Cook Time: ${recipe.cookTime} | `}</span>
          <span>{`Servings: ${recipe.servings} | `}</span>
          <span>{`Category: ${recipe.category}`}</span>
        </div>

        {/* Ingredients Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Ingredients:</h2>
          <ul className="list-disc pl-5 mt-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-lg">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {/* Directions Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Directions:</h2>
          <ol className="list-decimal pl-5 mt-2 text-lg">
            {recipe.instructions
              .split(".")
              .filter((sentence) => sentence.trim() !== "")
              .map((sentence, index) => (
                <li key={index}>{sentence.trim()}.</li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
