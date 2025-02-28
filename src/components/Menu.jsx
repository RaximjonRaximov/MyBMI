import foodItems from "../data/foodData";
import FoodCard from "./FoodCard";

const Menu = () => {
  // Group food items by their type
  const groupedItems = foodItems.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-[30rem] flex flex-col items-center mx-auto">
      <h1 className="text-2xl font-bold">Menu</h1>
      {Object.keys(groupedItems).map((type) => (
        <div key={type} className="w-[18rem] mt-6">
          <h2 className="text-xl font-semibold mb-2">{type}</h2>
          <div className="grid grid-cols-2 gap-2 place-items-center">
            {groupedItems[type].map((item) => (
              <FoodCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;