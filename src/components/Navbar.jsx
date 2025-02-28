import React from 'react';

const Navbar = () => {
  return (
    <div className="sticky top-0 left-0 w-full bg-white shadow-md p-3 flex justify-center items-center z-30 border-b border-gray-300">
      <h1 className="text-lg font-semibold">Restoran</h1>
      <div className="absolute right-4 text-xl font-bold">🍽️</div>
    </div>
  );
};

export default Navbar;