import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "./Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null); // State to hold the fetched product data

  useEffect(() => {
    fetch(`https://sports2.vercel.app/data/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEquipment(data[0]); // If data is an array, use the first element
        } else {
          setEquipment(data); // If data is a single object, use it directly
        }
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);


  if (!equipment) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Product Details</h1>
      <div className="bg-white p-6 shadow-md rounded">
        <img
          src={equipment.image}
          alt={equipment.itemName}
          className="w-full h-64 object-cover mb-4"
        />
        <h2 className="text-2xl font-semibold">{equipment.itemName}</h2>
        <p className="text-lg text-gray-700 mb-4">{equipment.description}</p>
        <p className="font-semibold text-lg mb-2">Category: {equipment.categoryName}</p>
        <p className="font-semibold text-lg mb-2">Price: ${equipment.price}</p>
        <p className="font-semibold text-lg mb-2">Rating: {equipment.rating} / 5</p>
        <p className="font-semibold text-lg mb-2">Stock Status: {equipment.stockStatus}</p>
        <p className="font-semibold text-lg mb-2">Customization: {equipment.customization}</p>
        <p className="font-semibold text-lg mb-2">Processing Time: {equipment.processingTime} days</p>
      </div>
    </div>
  );
};

export default ProductDetails;
