import { useEffect, useState } from "react";
import { getProducts } from "../api";
import RecipeItem from "../components/RecipeItem";
import Filter from "../components/Filter";

interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  cookTime: number;
  prepTime: number;
  servings: number;
  difficulty: string;
  tags: string[];
  description: string;
  imageUrl: string;
}

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    cookTime: "",
    prepTime: "",
    servings: "",
    difficulty: "",
    tags: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getProducts();
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(searchTerm));

    const matchesFilters =
      (filters.cookTime === "" ||
        recipe.cookTime <= parseInt(filters.cookTime)) &&
      (filters.prepTime === "" ||
        recipe.prepTime <= parseInt(filters.prepTime)) &&
      (filters.servings === "" ||
        recipe.servings >= parseInt(filters.servings)) &&
      (filters.difficulty === "" ||
        recipe.difficulty.toLowerCase() === filters.difficulty.toLowerCase()) &&
      (filters.tags === "" ||
        recipe.tags.some((tag) =>
          tag.toLowerCase().includes(filters.tags.toLowerCase())
        ));

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-transparent p-2 w-3/4 bg-[#2b2c2d] text-white rounded"
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 bg-[#2bbb91] text-sm text-[#2b2c2d] rounded ml-2 
    hover:bg-[#219e7b] active:bg-[#198b64] transition-colors"
        >
          Filter
        </button>
      </div>

      <Filter
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredRecipes.length === 0 && <p>No recipes found</p>}
        {filteredRecipes.map((recipe) => (
          <RecipeItem key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
