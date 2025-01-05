import React, { useEffect, useState } from "react";
import AOS from "aos";
import Loading from "./Loading";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleItems, setVisibleItems] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    fetch("https://sports2.vercel.app/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const uniqueCategories = [
          ...new Set(data.map((item) => item.categoryName)),
        ];
        setCategories(uniqueCategories);
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = items.filter((item) => item.categoryName === category);
    setFilteredItems(filtered);
    setVisibleItems(6); 
  };

  const handleShowAllItems = () => {
    setSelectedCategory(null);
    setFilteredItems(items);
    setVisibleItems(6);
  };

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 6); 
  };

  if (loading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const itemsToDisplay = filteredItems.length > 0 ? filteredItems : items;
  const displayedItems = itemsToDisplay.slice(0, visibleItems);

  return (
    <div className="container mx-auto my-6">
      <h1
        className="text-center text-2xl font-bold mb-4"
        data-aos="fade-up"
      >
        Categories
      </h1>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6"
        data-aos="fade-up"
      >
        <button
          className={`bg-blue-100 shadow-lg p-2 rounded-lg text-center text-primary text-sm cursor-pointer hover:bg-blue-200 transition ${
            !selectedCategory ? "bg-blue-400 text-white" : ""
          }`}
          onClick={handleShowAllItems}
        >
          All Items
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`bg-blue-100 shadow-lg p-2 rounded-lg text-center text-sm cursor-pointer hover:bg-blue-200 transition ${
              selectedCategory === category ? "bg-blue-400 text-white" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <h1
        className="text-center text-2xl font-bold mb-4"
        data-aos="fade-right"
      >
        {selectedCategory ? `${selectedCategory} Items` : "All Items"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedItems.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            data-aos="zoom-in"
          >
            <img
              src={item.image}
              alt={item.itemName}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-2">{item.itemName}</h2>
            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
            <p className="text-gray-800 font-bold mt-2">Price: ${item.price}</p>
            <p className="text-gray-500 text-sm">Rating: {item.rating}</p>
            <p className="text-gray-500 text-sm">Stock: {item.stockStatus}</p>
          </div>
        ))}
      </div>

      {displayedItems.length < itemsToDisplay.length && (
        <div className="flex justify-center mt-4" data-aos="fade-up">
          <button className="btn btn-outline" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySection;
