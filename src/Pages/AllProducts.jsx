import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import ProductCard from "../Components/ProductCard";

const AllProducts = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sports2.vercel.app/data")
      .then((response) => response.json())
      .then((data) => {
        const shuffledData = data.sort(() => Math.random() - 0.5);
        setEquipment(shuffledData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-2xl font-bold text-center mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {equipment.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
