import React, { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const ManageStaff = () => {
  const { accessToken, roleId } = useContext(AuthContext);
  const [staffList, setStaffList] = useState([]);
  const [newStaff, setNewStaff] = useState({ username: "", password: "", role_id: 2 });
  const [editingStaff, setEditingStaff] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/staffs/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setStaffList(response.data);
    } catch (err) {
      setError("Failed to fetch staff.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    if (!newStaff.username || !newStaff.password) {
      setError("Please fill all required fields");
      return;
    }
    try {
      const response = await axios.post(
        "/staffs/",
        { ...newStaff, role_id: 2 },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setStaffList([...staffList, response.data]);
      setNewStaff({ username: "", password: "", role_id: 2 });
      setSuccessMessage("Staff created successfully!");
    } catch (err) {
      setError("Failed to create staff: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleUpdateStaff = async (e) => {
    e.preventDefault();
    if (!editingStaff.username || !editingStaff.password) {
      setError("Please fill all required fields");
      return;
    }
    try {
      const response = await axios.put(
        `/staffs/${editingStaff.id}/`,
        { ...editingStaff, role_id: 2 },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setStaffList(staffList.map((staff) => (staff.id === editingStaff.id ? response.data : staff)));
      setModalOpen(false);
      setEditingStaff(null);
      setSuccessMessage("Staff updated successfully!");
    } catch (err) {
      setError("Failed to update staff: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleDeleteStaff = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;
    try {
      await axios.delete(`/staffs/${id}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setStaffList(staffList.filter((staff) => staff.id !== id));
      setModalOpen(false);
      setEditingStaff(null);
      setSuccessMessage("Staff deleted successfully!");
    } catch (err) {
      setError("Failed to delete staff: " + (err.response?.data?.detail || err.message));
    }
  };

  const openModal = (staff) => {
    setEditingStaff({ ...staff, password: "", role_id: 2 }); // Password is empty when modal opens
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingStaff(null);
  };

  // Handle clicking outside the modal to close it
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
        Manage Staff
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

      <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Staff</h2>
        <form onSubmit={handleCreateStaff} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
            <input
              type="text"
              value={newStaff.username}
              onChange={(e) => setNewStaff({ ...newStaff, username: e.target.value })}
              placeholder="Username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
              required
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
            <input
              type="password"
              value={newStaff.password}
              onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
              required
            />
          </div>
          <div className="flex-1 min-w-[100px]">
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 text-sm font-medium"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Existing Staff</h2>
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">ID</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Username</th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff) => (
                  <tr key={staff.id} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">{staff.id}</td>
                    <td className="py-3 px-4">{staff.username}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openModal(staff)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteStaff(staff.id)}
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

      {modalOpen && editingStaff && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Staff</h2>
            <form onSubmit={handleUpdateStaff} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                <input
                  type="text"
                  value={editingStaff.username}
                  onChange={(e) =>
                    setEditingStaff({ ...editingStaff, username: e.target.value })
                  }
                  placeholder="Username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <input
                  type="password"
                  value={editingStaff.password}
                  onChange={(e) =>
                    setEditingStaff({ ...editingStaff, password: e.target.value })
                  }
                  placeholder="New Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={!editingStaff.username || !editingStaff.password}
                  className={`flex-1 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 ${
                    !editingStaff.username || !editingStaff.password
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStaff;