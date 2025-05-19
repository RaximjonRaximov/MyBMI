import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

const ManageFoods = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [newProductTypeName, setNewProductTypeName] = useState("");
  const [editingType, setEditingType] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    type_id: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterTypeId, setFilterTypeId] = useState(""); // New state for filtering
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchProductTypes();
    fetchProducts();
  }, []);

  const fetchProductTypes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/product-types/");
      setProductTypes(response.data);
    } catch (err) {
      setError("Failed to fetch product types.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/products/");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (!price) return "";
    const numPrice = Number(price);
    return `${Math.floor(numPrice)} so'm`;
  };

  const handleCreateProductType = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/product-types/", { name: newProductTypeName });
      setProductTypes([...productTypes, response.data]);
      setNewProductTypeName("");
      setSuccessMessage("Product type created!");
    } catch (err) {
      setError("Failed to create product type.");
    }
  };

  const handleUpdateProductType = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/product-types/${editingType.id}/`, {
        name: editingType.name,
      });
      setProductTypes(productTypes.map((t) => (t.id === editingType.id ? response.data : t)));
      setEditingType(null);
      setSuccessMessage("Product type updated!");
    } catch (err) {
      setError("Failed to update product type.");
    }
  };

  const handleDeleteProductType = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/product-types/${id}/`);
      setProductTypes(productTypes.filter((type) => type.id !== id));
      setSuccessMessage("Product type deleted!");
    } catch (err) {
      setError("Failed to delete product type.");
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.type_id || !newProduct.image) {
      setError("Please fill all required fields");
      return;
    }
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("type_id", newProduct.type_id);
    formData.append("image", newProduct.image);

    try {
      const response = await axios.post("/products/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts([...products, response.data]);
      setNewProduct({ name: "", description: "", image: null, price: "", type_id: "" });
      setSuccessMessage("Product created!");
    } catch (err) {
      setError("Failed to create product: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (
      !editingProduct.name ||
      !editingProduct.description ||
      !editingProduct.price ||
      !editingProduct.type_id ||
      !(editingProduct.image instanceof File)
    ) {
      setError("Please fill all required fields including a new image");
      return;
    }
    const formData = new FormData();
    formData.append("name", editingProduct.name);
    formData.append("description", editingProduct.description);
    formData.append("price", editingProduct.price);
    formData.append("type_id", editingProduct.type_id);
    formData.append("image", editingProduct.image);

    try {
      const response = await axios.put(`/products/${editingProduct.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts(products.map((p) => (p.id === editingProduct.id ? response.data : p)));
      setEditingProduct(null);
      setSuccessMessage("Product updated!");
    } catch (err) {
      setError("Failed to update product: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/products/${id}/`);
      setProducts(products.filter((product) => product.id !== id));
      setSuccessMessage("Product deleted!");
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  // Filter products based on selected type
  const filteredProducts = filterTypeId
    ? products.filter((product) => product.type.id === Number(filterTypeId))
    : products;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-gray-100 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
        Manage Foods
      </h1>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg shadow-md text-center text-sm font-medium">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg shadow-md text-sm font-medium">
          {error}
        </div>
      )}

      {/* Top Section: Product Types and Add Food Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Product Types Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Types</h2>
          <form
            onSubmit={editingType ? handleUpdateProductType : handleCreateProductType}
            className="flex gap-3 mb-4"
          >
            <input
              type="text"
              value={editingType ? editingType.name : newProductTypeName}
              onChange={(e) =>
                editingType
                  ? setEditingType({ ...editingType, name: e.target.value })
                  : setNewProductTypeName(e.target.value)
              }
              placeholder="Enter type name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 text-sm font-medium"
            >
              {editingType ? "Update" : "Add"}
            </button>
            {editingType && (
              <button
                type="button"
                onClick={() => setEditingType(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 text-sm font-medium"
              >
                Cancel
              </button>
            )}
          </form>
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="py-3 px-4 text-left font-semibold text-gray-700">ID</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                    <th className="py-3 px-4 text-right font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productTypes.map((type) => (
                    <tr key={type.id} className="border-t hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">{type.id}</td>
                      <td className="py-3 px-4">{type.name}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingType(type)}
                          className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProductType(type.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add/Update Product Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editingProduct ? "Update Product" : "Add New Product"}
          </h2>
          <form
            onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
            className="flex flex-wrap gap-4 items-end"
          >
            {/* Name Field */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={editingProduct ? editingProduct.name : newProduct.name}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, name: e.target.value })
                    : setNewProduct({ ...newProduct, name: e.target.value })
                }
                placeholder="Product name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                required
              />
            </div>

            {/* Price Field */}
            <div className="flex-1 min-w-[100px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <input
                type="number"
                step="1"
                value={editingProduct ? editingProduct.price : newProduct.price}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, price: e.target.value })
                    : setNewProduct({ ...newProduct, price: e.target.value })
                }
                placeholder="Price"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                required
              />
            </div>

            {/* Type Field */}
            <div className="flex-1 min-w-[120px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select
                value={editingProduct ? editingProduct.type_id : newProduct.type_id}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, type_id: e.target.value })
                    : setNewProduct({ ...newProduct, type_id: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                required
              >
                <option value="">Select type</option>
                {productTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            {/* Image Field */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image *</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, image: e.target.files[0] })
                      : setNewProduct({ ...newProduct, image: e.target.files[0] })
                  }
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                  required
                />
              </div>
            </div>

            {/* Add/Update Button */}
            <div className="flex-1 min-w-[100px]">
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 text-sm font-medium"
              >
                {editingProduct ? "Update" : "Add"}
              </button>
            </div>

            {/* Cancel Button (if editing) */}
            {editingProduct && (
              <div className="flex-1 min-w-[100px]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>

          {/* Description Field (below the row) */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              value={editingProduct ? editingProduct.description : newProduct.description}
              onChange={(e) =>
                editingProduct
                  ? setEditingProduct({ ...editingProduct, description: e.target.value })
                  : setNewProduct({ ...newProduct, description: e.target.value })
              }
              placeholder="Description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
              rows="3"
              required
            />
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Existing Products</h2>

        {/* Filter by Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
          <select
            value={filterTypeId}
            onChange={(e) => setFilterTypeId(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
          >
            <option value="">All Types</option>
            {productTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">ID</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Price</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Type</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Image</th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">{product.id}</td>
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">{formatPrice(product.price)}</td>
                    <td className="py-3 px-4">{product.type.name}</td>
                    <td className="py-3 px-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                        onError={(e) => {
                          e.target.src = "/food.png";
                        }}
                      />
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFoods;