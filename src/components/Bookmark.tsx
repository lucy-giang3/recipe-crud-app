import React, { useState, useEffect } from "react";
import { Bookmark as BookmarkIcon } from "lucide-react";

interface BookmarkProps {
  recipeId: string;
}

const Bookmark: React.FC<BookmarkProps> = ({ recipeId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedBookmarks = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );
    setIsBookmarked(savedBookmarks.includes(recipeId));
  }, [recipeId]);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent navigation
    if (isBookmarked) {
      setShowModal(true);
    } else {
      toggleBookmark(e);
    }
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation
    const savedBookmarks = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );
    let updatedBookmarks;

    if (isBookmarked) {
      updatedBookmarks = savedBookmarks.filter((id: string) => id !== recipeId);
    } else {
      updatedBookmarks = [...savedBookmarks, recipeId];
    }

    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
    setShowModal(false);
  };

  return (
    <>
      <BookmarkIcon
        onClick={handleBookmarkClick}
        className="w-6 h-6 cursor-pointer transition-colors duration-200 hover:text-[#2bbb91]"
        color={isBookmarked ? "#2bbb91" : "#696c6e"}
        fill={isBookmarked ? "#2bbb91" : "none"}
      />

      {showModal && (
        <div
          className="fixed inset-0 flex justify-center items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-[#497368] p-4 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <p>Are you sure you want to remove this bookmark?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-[#393f3d] hover:bg-[#1b1f1d] rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#2bbb91] hover:bg-[#219e7b] text-white rounded"
                onClick={toggleBookmark}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookmark;
