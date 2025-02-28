import React from "react";
import FoodCard from "./FoodCard";

const Menu = ({ selectedFilter, foodItems }) => {
  // Filter qilish
  const filteredItems =
    selectedFilter === "Barcha mahsulotlar"
      ? foodItems
      : foodItems.filter((item) => item.type === selectedFilter);

  // Group by type
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-[20rem] w-full flex flex-col items-center  mx-auto">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>

      {/* Har bir tur uchun alohida bo'lim */}
      {Object.keys(groupedItems).map((type) => (
        <div key={type} className="w-full mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-lg font-semibold">{type}</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 justify-center">
            {groupedItems[type].map((item) => (
              <div className="h-full flex justify-center">
              <FoodCard key={item.id} {...item} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
