import { useEffect, useState } from "react";
import { getProduct } from "../api";
import RecipeItem from "../components/RecipeItem";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
}

const BookmarkedRecipes = () => {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );

    const fetchBookmarkedRecipes = async () => {
      const recipesData = await Promise.all(
        savedBookmarks.map(async (id: string) => {
          const data = await getProduct(id);
          return {
            _id: data._id,
            title: data.title || "Untitled Recipe",
            description: data.description || "No description available.",
            tags: data.tags || [],
            imageUrl: data.imageUrl || "default-image-url.jpg",
          };
        })
      );

      setBookmarkedRecipes(recipesData);
    };

    fetchBookmarkedRecipes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bookmarked Recipes</h1>
      {bookmarkedRecipes.length === 0 ? (
        <p>No bookmarked recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarkedRecipes.map((recipe) => (
            <RecipeItem key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedRecipes;
