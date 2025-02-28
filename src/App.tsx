import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeList from "./pages/RecipeList";
import RecipeDetail from "./pages/RecipeDetail";
import BookmarkedRecipes from "./pages/BookmarkedRecipes";
import LogIn from "./pages/LogIn";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Sidebar from "./components/SideBar";
import MyRecipes from "./pages/MyRecipes";
import AddRecipe from "./pages/AddRecipe";
import Explore from "./pages/Explore";
import EditRecipe from "./pages/EditRecipe";

function App() {
  return (
    <Router basename="/recipe-crud-app">
      <Routes>
        {/* Login Pages */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Register />} />
        </Route>

        {/* Main Content */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<RecipeList />} />
          <Route path="/bookmarks" element={<BookmarkedRecipes />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        </Route>
      </Routes>
    </Router>
  );
}

function AuthLayout() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  );
}

function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const contentClass = isCollapsed ? "ml-16" : "ml-65";

  return (
    <div className="flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main content area */}
      <div
        className={`flex-grow p-4 transition-all duration-300 ${contentClass}`}
      >
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/bookmarks" element={<BookmarkedRecipes />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
