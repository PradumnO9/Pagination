import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import Card from "./Card";
import "./Card.css";

const PAGE_SIZE = 9;

const CardList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const cardData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=200");
    const json = await data.json();
    setProducts(json.products);
  };

  useEffect(() => {
    cardData();
  }, []);

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handleLeftArrowClick = () => {
    currentPage === 0
      ? setCurrentPage(noOfPages - 1)
      : setCurrentPage((prevValue) => prevValue - 1);
  };

  const handleRightArrowClick = () => {
    currentPage === noOfPages - 1
      ? setCurrentPage(0)
      : setCurrentPage((prevValue) => prevValue + 1);
  };

  return (
    <div>
      {!products ? (
        <h1>Loading...</h1>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>Pagination</h1>
          <div className="button-outer-container">
            <FaChevronLeft
              className="arrow-button"
              onClick={handleLeftArrowClick}
              size={25}
            />
            {[...Array(noOfPages).keys()].map((n) => {
              return (
                <button
                  className={
                    "page-number " + (currentPage === n ? "current-index" : "")
                  }
                  onClick={() => {
                    setCurrentPage(n);
                  }}
                  key={n}
                >
                  {n}
                </button>
              );
            })}
            <FaChevronRight
              className="arrow-button"
              onClick={handleRightArrowClick}
              size={25}
            />
          </div>
          <div className="products-container">
            {products.slice(start, end).map((product) => {
              return <Card key={product.id} product={product} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardList;
