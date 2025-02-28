import React from "react";

const Filter = ({ onFilterChange, selectedFilter, foodItems }) => {
  // Mavjud typelarni olish
  const types = [...new Set(foodItems.map((item) => item.type))];

  // Har bir turning birinchi elementining rasmini olish
  const getFirstImage = (type) => {
    const firstItem = foodItems.find((item) => item.type === type);
    return firstItem ? firstItem.image : null;
  };

  // Barcha mahsulotlar uchun filter
  const allFilter = { type: "Barcha mahsulotlar", icon: "🍽️" };

  // Barcha filtrlarni birlashtiramiz
  const filters = [allFilter, ...types.map((type) => ({ type, image: getFirstImage(type) }))];

  return (
    <div className="flex  justify-start gap-4 p-4 overflow-x-auto whitespace-nowrap bg-transparent">
      {filters.map((filter) => (
        <button
          key={filter.type}
          onClick={() => onFilterChange(filter.type)}
          className={`flex flex-col items-center p-2 hover:bg-gray-200 rounded-lg transition-all ${
            selectedFilter === filter.type ? "bg-gray-300" : ""
          }`}
        >
          {filter.image ? (
            <img
              src={filter.image}
              alt={filter.type}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl">{filter.icon}</span>
          )}
          <span className="text-sm font-medium">{filter.type}</span>
        </button>
      ))}
    </div>
  );
};

export default Filter;