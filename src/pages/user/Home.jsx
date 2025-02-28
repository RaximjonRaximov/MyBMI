import React, { useState } from "react";
import Filter from "../../components/Filter";
import Menu from "../../components/Menu";
import foodItems from "../../data/foodData"; // foodItems import qilindi

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState("Barcha mahsulotlar");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="container mx-auto p-4">
      <Filter
        onFilterChange={handleFilterChange}
        selectedFilter={selectedFilter}
        foodItems={foodItems}
      />
      <Menu selectedFilter={selectedFilter} foodItems={foodItems} />
    </div>
  );
};

export default Home;