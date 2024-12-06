import React from 'react';
import Slider from '../Components/Slider';
import { useLoaderData } from 'react-router';
import Card from '../Components/Card';

const Home = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <div>
      <nav>
        <Slider></Slider>
      </nav>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {
          data.map((product) => (
            <Card key={product.id} product={product}></Card>
          ))
        }
      </div>
    </div>
  );
};

export default Home;
