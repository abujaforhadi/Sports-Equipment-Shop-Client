import React, { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";


const Card = ({ product }) => {

  const { _id, image, itemName, price,stockStatus } = product;
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true, 
    });
  }, []);
  
  // console.log(product);
  return (
    <div data-aos="fade-up" className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={itemName} className="w-1/3" />
      </figure>
      <div className="badge badge-primary badge-outline mx-5">Only <p className="animate__animated animate__swing animate__infinite text-red-700  p-1"> {stockStatus} </p> Left!</div>

      <div className="card-body">
        <h2 className="card-title">{itemName}</h2>
        <p className="text-gray-800">Price: ${price}</p>
        <div className="card-actions justify-center">
          <Link
            to={`/equipment/${_id}`}
            className="btn text-blue-500 hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
