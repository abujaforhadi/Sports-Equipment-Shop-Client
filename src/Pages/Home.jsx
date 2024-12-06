import React from "react";
import Slider from "../Components/Slider";
import { useLoaderData } from "react-router";
import Card from "../Components/Card";

const Home = () => {
  const data = useLoaderData();
  // console.log(data);

  return (
    <div>
      <nav className="">
        <Slider></Slider>
      </nav>
      <h1 className=" text-center animate__animated animate__flash animate__infinite text-2xl pb-4 font-bold text-red-600">
        New Arrivals!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((product) => (
          <Card key={product.id} product={product}></Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
