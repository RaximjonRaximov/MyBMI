// src/components/Menu.jsx
import React from "react";
import FoodCard from "./FoodCard";

const Menu = ({ selectedFilter, products }) => {
  // Filter products based on selectedFilter
  const filteredItems =
    selectedFilter === "Barcha mahsulotlar"
      ? products
      : products.filter((item) => item.type.name === selectedFilter);

  // Group by type
  const groupedItems = filteredItems.reduce((acc, item) => {
    const typeName = item.type.name;
    if (!acc[typeName]) {
      acc[typeName] = [];
    }
    acc[typeName].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-[20rem] w-[20rem] flex flex-col items-center mx-auto pb-[5rem]">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>

      {/* Display each type as a section */}
      {Object.keys(groupedItems).length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        Object.keys(groupedItems).map((type) => (
          <div key={type} className="w-full mb-6">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-lg font-semibold">{type}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 justify-center">
              {groupedItems[type].map((item) => (
                <FoodCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Menu;