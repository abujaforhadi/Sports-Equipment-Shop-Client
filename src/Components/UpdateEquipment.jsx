import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const UpdateEquipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "",
    itemName: "",
    categoryName: "",
    description: "",
    price: "",
    rating: "",
    customization: "",
    processingTime: "",
    stockStatus: "",
    userEmail: "",
    userName: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch(`https://sports2.vercel.app/data/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setFormData(data))
      .catch((error) => console.error("Error fetching equipment data:", error));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    // console.log(formData); 
    fetch(`https://sports2.vercel.app/data/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update equipment");
        }
        return response.json();
      })
      .then(() => {
        setSuccessMessage("Equipment updated successfully!");
        setTimeout(() => navigate("/"), 2000); 
      })
      .catch((error) => console.error("Error updating equipment:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-3xl font-bold mb-4">Update Equipment</h1>

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
          {successMessage}
        </div>
      )}

<form onSubmit={handleUpdate} className="bg-white p-6 shadow-md rounded">
  {Object.keys(formData).map((field) =>
    field !== "_id" ? ( 
      <div key={field} className="mb-4">
        <label className="block font-semibold mb-2 capitalize">
          {field.replace(/([A-Z])/g, " $1")}
        </label>
        <input
          type={field === "price" || field === "rating" ? "number" : "text"}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          readOnly={field === "userEmail" || field === "userName"}
          className={`w-full p-2 border rounded ${
            field === "userEmail" || field === "userName"
              ? "bg-gray-100 text-gray-600"
              : ""
          }`}
          placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
        />
      </div>
    ) : null 
  )}

  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Update Equipment
  </button>
</form>

    </div>
  );
};

export default UpdateEquipment;
