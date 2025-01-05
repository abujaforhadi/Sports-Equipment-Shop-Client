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
    <div data-aos="fade-up" className="card card-compact bg-white shadow-xl">
      <figure className="p-2">
        <img src={image} alt={itemName} className="w-1/2" />
      </figure>
      <div className="absolute m-2 badge badge-primary badge-outline mx-5"><p className="animate__animated animate__swing animate__infinite text-red-700  p-1"> {stockStatus} % </p> off</div>

      <div className="card-body">
        <h2 className="card-title justify-center text-gray-900">{itemName}</h2>
        <p className="text-gray-800 text-center">$ {price}</p>
        <div className="card-actions justify-center p-0">
          <Link
            to={`/equipment/${_id}`}
            className="btn  text-primary hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
