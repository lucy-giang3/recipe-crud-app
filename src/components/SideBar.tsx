import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Compass,
  Bookmark,
  Menu,
  ChevronLeft,
  BookUser,
  LogOut,
} from "lucide-react";

const SideBar = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (state: boolean) => void;
}) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`flex flex-col text-white bg-[#2b2c2d] h-screen fixed top-0 left-0 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Top Part: Logo + Collapse Button */}
      <div className="flex items-center pt-3 pr-5 pl-4 pb-2">
        {!isCollapsed && (
          <Link to="/" className="flex items-center pb-0 gap-2">
            <button className="text-white bg-[#2b2c2d] pl-4 hover:text-[#2bbb91] rounded-r-lg focus:outline-none">
              RECIPES.IO
            </button>
          </Link>
        )}
        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto text-white rounded-full focus:outline-none hover:bg-[#696e6c] hover:text-gray-400 cursor-pointer transition duration-200"
        >
          {isCollapsed ? (
            <Menu className="w-6 h-6 mb-4" />
          ) : (
            <ChevronLeft className="w-10 h-10 p-1 rounded-full hover:bg-[#696e6c] hover:text-gray-400 cursor-pointer transition duration-200" />
          )}
        </button>
      </div>

      {/* Sidebar Links */}
      <div className="flex flex-col items-start">
        {[
          { to: "/", icon: Home, label: "Home" },
          { to: "/explore", icon: Compass, label: "Explore" },
          { to: "/bookmarks", icon: Bookmark, label: "Bookmarks" },
          { to: "/my-recipes", icon: BookUser, label: "My Recipes" },
          { to: "/login", icon: LogOut, label: "Log Out" },
        ].map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-2 p-4 hover:bg-[#696e6c] w-full ${
              isActive(to) ? "bg-[#2b5449]" : ""
            }`}
          >
            <Icon className="w-6 h-6" />
            {!isCollapsed && <span>{label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
