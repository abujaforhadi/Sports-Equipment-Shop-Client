import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import ConfirmModal from "../Components/ConfirmModal"; // Modal to confirm deletion
import { AuthContext } from "../Auth/AuthProvider";

const MyEquipment = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState(null);
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null; 
  }

  useEffect(() => {
    if (user && user.email) {
      fetch(`https://sports2.vercel.app/data`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("Fetched data:", data);
          const filteredData = data.filter((item) => item.userEmail === user.email);
          // console.log("Filtered data:", filteredData);
          setEquipmentList(filteredData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching equipment:", error);
          toast.error("Error fetching equipment.");
          setLoading(false);
        });
    }
  }, [user]);

  const handleUpdate = (id) => {
    navigate(`/update-equipment/${id}`);
  };

  const handleDelete = (id) => {
    setEquipmentToDelete(id);
  


    setDeleteConfirm(true);

  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await fetch(`https://sports2.vercel.app/data/${equipmentToDelete}`, {
        method: "DELETE",
      });
      setEquipmentList((prev) =>
        prev.filter((equipment) => equipment._id !== equipmentToDelete)
      );
      toast.success("Equipment deleted successfully.");
    } catch (error) {
      console.error("Error deleting equipment:", error);
      toast.error("Error deleting equipment.");
    } finally {
      setLoading(false);
      setDeleteConfirm(false);
    }
  };

  if (loading) {
    return <loading></loading>;
  }

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-3xl font-bold mb-4">My Equipment</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipmentList.map((equipment) => (
          <div
            key={equipment._id}
            className="bg-white p-6 shadow-md rounded-md"
          >
            <img
              src={equipment.image}
              alt={equipment.itemName}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-2xl font-semibold">{equipment.itemName}</h2>
            <p className="text-lg text-gray-700 mb-4">{equipment.description}</p>
            <p className="font-semibold text-lg mb-2">
              Category: {equipment.categoryName}
            </p>
            <p className="font-semibold text-lg mb-2">Price: ${equipment.price}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleUpdate(equipment._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(equipment._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleteConfirm && (
        <ConfirmModal
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm(false)}
        />
      )}
    </div>
  );
};

export default MyEquipment;
