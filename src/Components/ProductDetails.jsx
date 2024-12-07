import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Loading from "./Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://sports2.vercel.app/data/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEquipment(data[0]);
        } else {
          setEquipment(data);
        }
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  if (!equipment) {
    return <Loading />;
  }

  const handleBuyNow = () => {
    setShowModal(true);
  };

  const handleConfirmPurchase = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="bg-white/10 rounded-lg p-2 md:w-1/2 container mx-auto my-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Product Details</h1>
      <div className="p-2 shadow-md rounded">
        <img
          src={equipment.image}
          alt={equipment.itemName}
          className="w-1/2 mx-auto rounded-lg"
        />
        <div className="absolute -mt-10 badge badge-primary badge-outline">
          Only
          <p className="animate__animated animate__flash animate__infinite text-red-700 p-1">
            {equipment.stockStatus}
          </p>
          Left!
        </div>
        <h2 className="text-2xl font-semibold">{equipment.itemName}</h2>
        <p className="text-lg mb-4">{equipment.description}</p>
        <p className="font-semibold text-lg mb-2">
          Category: {equipment.categoryName}
        </p>
        <p className="font-semibold text-lg mb-2">Price: ${equipment.price}</p>
        <p className="font-semibold text-lg mb-2">
          Rating: {equipment.rating} / 5
        </p>
        <p className="font-semibold text-lg mb-2">
          Stock Status: {equipment.stockStatus}
        </p>
        <p className="font-semibold text-lg mb-2">
          Customization: {equipment.customization}
        </p>
        <p className="font-semibold text-lg mb-2">
          Processing Time: {equipment.processingTime} days
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Confirm Purchase</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to purchase{" "}
              <span className="font-semibold">{equipment.itemName}</span> for $
              {equipment.price}?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleConfirmPurchase}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
