import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../Components/Loading";


const AllProducts = () => {
  const [equipment, setEquipment] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    fetch("https://sports2.vercel.app/data")
      .then((response) => response.json())
      .then((data) => {
        const shuffledData = data.sort(() => Math.random() - 0.5);
        setEquipment(shuffledData);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  const handleSortByPrice = () => {
    if (!isSorted) {
      const sortedEquipment = [...equipment].sort((a, b) => a.price - b.price);
      setEquipment(sortedEquipment);
      setIsSorted(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading></Loading>
      </div>
    ); // Display loading message while data is being fetched
  }

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-2xl font-bold text-center mb-6">All Products</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleSortByPrice}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isSorted}
        >
          Sort by Price
        </button>
      </div>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Item Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Stock Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
            <tr key={item._id}>
              <td className="border p-2">{item.itemName}</td>
              <td className="border p-2">{item.categoryName}</td>
              <td className="border p-2">${item.price}</td>
              <td className="border p-2">{item.rating}</td>
              <td className="border p-2">{item.stockStatus}</td>
              <td className="border p-2">
                <Link
                  to={`/equipment/${item._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
