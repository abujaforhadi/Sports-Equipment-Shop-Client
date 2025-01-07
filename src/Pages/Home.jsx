import React, { useEffect, useState } from "react";
import Slider from "../Components/Slider";
import { Link, useLoaderData } from "react-router";
import Card from "../Components/Card";
import SportsBrands from "../Components/SportsBrands";
import DealsOfTheDay from "../Components/DealsOfTheDay";
import CustomerReview from "../Components/CustomerReview";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import CategorySection from "../Components/CategorySection";
import Hero1 from "../Components/Hero1";
import OfferGrid from "../Components/OfferGrid";

const Home = () => {
  const data = useLoaderData();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });

    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative">
      <div data-aos="fade-down">
        <Hero1 />
      </div>
      <div data-aos="fade-down">
        <OfferGrid/>
      </div>

      <div className="py-4">
        <h1
          className="text-center text-2xl pb-4 font-bold text-red-600"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          New Arrivals!
        </h1>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 "
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {data.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        <p
          className="flex justify-center my-6"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          
          <Link
            to="/all-products"
            className="block text-center py-2 px-5 bg-[#0FABCA] text-white rounded-md hover:bg-[#01849b] transition-all duration-200"
          >
            View All
          </Link>
        </p>
      </div>

      <div data-aos="fade-right" data-aos-delay="300">
        <CategorySection />
      </div>

      <div className="py-8 bg-gray-100">
        <div data-aos="zoom-in" data-aos-offset="200" data-aos-duration="1200">
          <DealsOfTheDay />
        </div>
      </div>

      <div className="py-8 px-6">
        <h1
          className="text-center py-2 text-2xl font-bold"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Client Reviews
        </h1>
        <div data-aos="fade-up" data-aos-delay="400">
          <CustomerReview />
        </div>
      </div>

      <div className="py-8 bg-gray-50">
        <h1
          className="text-center py-2 text-sm"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          SHOP BY <br />
          <span className="text-2xl font-bold">
            BRANDS<span className="text-red-600">.</span>
          </span>
        </h1>
        <div
          data-aos="zoom-in"
          data-aos-offset="200"
          data-aos-duration="1200"
        >
          <SportsBrands />
        </div>
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition duration-300"
          aria-label="Scroll to Top"
          data-aos="fade"
          data-aos-delay="800"
        >
          <FaRegArrowAltCircleUp />
        </button>
      )}
    </section>
  );
};

export default Home;
