import React from "react";
import Slider from "../Components/Slider";
import { Link, useLoaderData } from "react-router";
import Card from "../Components/Card";
import SportsBrands from "../Components/SportsBrands";
import DealsOfTheDay from "../Components/DealsOfTheDay";

const Home = () => {
  const data = useLoaderData();
  // console.log(data);

  return (
    <section>
      <div className="">
        <Slider />
      </div>

      {/* Tooltip Placement on the New Arrivals Section */}
      <div>
        <h1 className=" text-center animate__animated animate__flash animate__infinite text-2xl pb-4 font-bold text-red-600">
          New Arrivals!
        </h1>

       
       

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        <p className="flex justify-center my-4">
          <Link to="/all-products" className="btn btn-outline">
            View All Products
          </Link>
        </p>
      </div>

      <div>
        <DealsOfTheDay></DealsOfTheDay>
        <SportsBrands />
      </div>
    </section>
  );
};

export default Home;
