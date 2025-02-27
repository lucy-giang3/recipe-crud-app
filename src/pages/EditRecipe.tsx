import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct, deleteProduct } from "../api";
import DeleteModal from "../components/DeleteModal";

const EditRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    imageUrl: "",
    ingredients: "",
    instructions: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    category: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await getProduct(id!);
      setFormData({
        title: recipe.title,
        description: recipe.description,
        tags: recipe.tags.join(", "),
        imageUrl: recipe.imageUrl,
        ingredients: recipe.ingredients.join(", "),
        instructions: recipe.instructions,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        category: recipe.category,
      });
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedRecipe = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      ingredients: formData.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
    };

    await updateProduct(id!, updatedRecipe);

    navigate("/my-recipes");
  };

  const handleDelete = async () => {
    await deleteProduct(id!);
    navigate("/my-recipes");
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <label className="block">
          <span className="font-semibold">Title</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </label>

        {/* Description */}
        <label className="block">
          <span className="font-semibold">Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows={3}
          />
        </label>

        {/* Tags */}
        <label className="block">
          <span className="font-semibold">Tags</span>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Separate tags with commas"
          />
        </label>

        {/* Ingredients */}
        <label className="block">
          <span className="font-semibold">Ingredients</span>
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Separate ingredients with commas"
          />
        </label>

        {/* Instructions */}
        <label className="block">
          <span className="font-semibold">Instructions</span>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows={4}
          />
        </label>

        {/* Prep Time */}
        <label className="block">
          <span className="font-semibold">Prep Time</span>
          <input
            type="text"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="e.g. 15 mins"
          />
        </label>

        {/* Cook Time */}
        <label className="block">
          <span className="font-semibold">Cook Time</span>
          <input
            type="text"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="e.g. 30 mins"
          />
        </label>

        {/* Servings */}
        <label className="block">
          <span className="font-semibold">Servings</span>
          <input
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </label>

        {/* Category */}
        <label className="block">
          <span className="font-semibold">Category</span>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </label>

        {/* Image URL */}
        <label className="block">
          <span className="font-semibold">Image URL</span>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Save Changes
        </button>
      </form>

      {/* Delete Button */}
      <button
        onClick={openDeleteModal}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded-md"
      >
        Delete Recipe
      </button>

      {/* Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default EditRecipe;
