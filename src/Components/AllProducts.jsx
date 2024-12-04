import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const AllProducts = () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((response) => response.json())
      .then((data) => setEquipment(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-2xl font-bold text-center mb-6">All Products</h1>
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
