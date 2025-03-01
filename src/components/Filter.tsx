import React from "react";

interface Filters {
  cookTime: string;
  prepTime: string;
  servings: string;
  difficulty: string;
  tags: string;
}

interface FilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filter: React.FC<FilterProps> = ({
  filters,
  setFilters,
  isModalOpen,
  setIsModalOpen,
}) => {
  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-center justify-end z-50"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="bg-[#2b2c2d] p-6 rounded-l-lg w-80 h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-white">
          Filter Options
        </h3>

        <div className="flex gap-4 mb-4 flex-col">
          <input
            type="number"
            placeholder="Cook Time (min)"
            value={filters.cookTime}
            onChange={(e) =>
              setFilters({ ...filters, cookTime: e.target.value })
            }
            className="border p-2 rounded bg-[#3d3d3d] text-white"
          />
          <input
            type="number"
            placeholder="Prep Time (min)"
            value={filters.prepTime}
            onChange={(e) =>
              setFilters({ ...filters, prepTime: e.target.value })
            }
            className="border p-2 rounded bg-[#3d3d3d] text-white"
          />
          <input
            type="number"
            placeholder="Servings"
            value={filters.servings}
            onChange={(e) =>
              setFilters({ ...filters, servings: e.target.value })
            }
            className="border p-2 rounded bg-[#3d3d3d] text-white"
          />
          <select
            value={filters.difficulty}
            onChange={(e) =>
              setFilters({ ...filters, difficulty: e.target.value })
            }
            className="border p-2 bg-[#3d3d3d] rounded text-white"
          >
            <option value="">Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-2 bg-[#a2a2a7] hover:bg-[#636867] text-white rounded"
          >
            Close
          </button>
          <button
            onClick={() =>
              setFilters({
                cookTime: "",
                prepTime: "",
                servings: "",
                difficulty: "",
                tags: "",
              })
            }
            className="p-2 bg-[#2bbb91] hover:bg-[#2b5449] text-white rounded"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
