import React from 'react';

const Navbar = () => {
  return (
    <div className="sticky top-0 left-0 w-full bg-white shadow-md p-3 z-30 border-b border-gray-300">
      <div className="max-w-[20rem] w-full flex justify-between items-center mx-auto">
        <h1 className="text-lg font-semibold">Restoran</h1>
        <div className="text-xl font-bold">🍽️</div>
      </div>
    </div>
  );
};

export default Navbar;
