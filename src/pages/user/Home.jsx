import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTableNumber } from "../../redux/cartSlice"; // Yangi action import qilindi
import Filter from "../../components/Filter";
import Menu from "../../components/Menu";
import axios from "../../api/axios";

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState("Barcha mahsulotlar");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // URL’dan table_number o‘qish va Redux’ga joylash
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tableNumberFromURL = params.get("table_number");
    const storedTableNumber = sessionStorage.getItem("tableNumber");

    if (tableNumberFromURL) {
      dispatch(setTableNumber(tableNumberFromURL));
    } else if (storedTableNumber) {
      dispatch(setTableNumber(storedTableNumber));
    }
  }, [dispatch]);

  // Mahsulotlarni yuklash
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const productsResponse = await axios.get("/products/");
        setProducts(productsResponse.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error("Fetch data error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  if (loading) {
    return <div className="text-center text-gray-600 p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Filter
        onFilterChange={handleFilterChange}
        selectedFilter={selectedFilter}
        products={products}
      />
      <Menu selectedFilter={selectedFilter} products={products} />
    </div>
  );
};

export default Home;