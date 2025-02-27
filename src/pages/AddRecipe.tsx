import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    description: "",
    instructions: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    category: "",
    tags: "",
    difficulty: "Easy",
    author: "ChefDemo",
  });

  const [errors, setErrors] = useState({
    title: "",
    ingredients: "",
    description: "",
    instructions: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    category: "",
    tags: "",
    difficulty: "",
    author: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let validationErrors = { ...errors };

    Object.keys(formData).forEach((field) => {
      const key = field as keyof typeof formData;
      if (formData[key] === "") {
        validationErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required.`;
      } else {
        validationErrors[key] = "";
      }
    });

    // If there are any errors, update the state and do not submit the form
    if (Object.values(validationErrors).some((error) => error !== "")) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Send the formData to the backend
      await axios.post("http://localhost:3000/api/products", formData);
      console.log("Recipe added successfully!");
      navigate("/my-recipes");
    } catch (error) {
      console.error("Error adding recipe", error);
      alert("There was an error adding the recipe. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error for the current field when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/my-recipes")}
        className="text-blue-500 hover:underline mb-4"
      >
        ← Back to My Recipes
      </button>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Add a New Recipe</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <label className="block">
          <span className="font-semibold">Title</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </label>

        {/* Ingredients */}
        <label className="block">
          <span className="font-semibold">Ingredients</span>
          <textarea
            className="w-full p-2 border rounded-md"
            rows={3}
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Separate ingredients with commas"
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm">{errors.ingredients}</p>
          )}
        </label>

        {/* Description */}
        <label className="block">
          <span className="font-semibold">Description</span>
          <textarea
            className="w-full p-2 border rounded-md"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </label>

        {/* Instructions */}
        <label className="block">
          <span className="font-semibold">Instructions</span>
          <textarea
            className="w-full p-2 border rounded-md"
            rows={5}
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
          />
          {errors.instructions && (
            <p className="text-red-500 text-sm">{errors.instructions}</p>
          )}
        </label>

        {/* Prep Time & Cook Time */}
        <div className="flex space-x-4">
          <label className="flex-1">
            <span className="font-semibold">Prep Time (mins)</span>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
            />
            {errors.prepTime && (
              <p className="text-red-500 text-sm">{errors.prepTime}</p>
            )}
          </label>
          <label className="flex-1">
            <span className="font-semibold">Cook Time (mins)</span>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
            />
            {errors.cookTime && (
              <p className="text-red-500 text-sm">{errors.cookTime}</p>
            )}
          </label>
        </div>

        {/* Servings */}
        <label className="block">
          <span className="font-semibold">Servings</span>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
          />
          {errors.servings && (
            <p className="text-red-500 text-sm">{errors.servings}</p>
          )}
        </label>

        {/* Category */}
        <label className="block">
          <span className="font-semibold">Category</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </label>

        {/* Tags */}
        <label className="block">
          <span className="font-semibold">Tags</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Separate tags with commas"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
          {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
        </label>

        {/* Difficulty */}
        <label className="block">
          <span className="font-semibold">Difficulty</span>
          <select
            className="w-full p-2 border rounded-md"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          {errors.difficulty && (
            <p className="text-red-500 text-sm">{errors.difficulty}</p>
          )}
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
