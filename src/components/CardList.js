import React, { useEffect, useState } from "react";
import { FaCaretLeft } from "react-icons/fa6";
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

  return (
    <div>
      {!products ? (
        <h1>Loading...</h1>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>Pagination</h1>
          <div>
            {[...Array(noOfPages).keys()].map((n) => {
              return (
                <button
                  className="page-number"
                  onClick={() => {
                    setCurrentPage(n);
                  }}
                  key={n}
                >
                  {n}
                </button>
              );
            })}
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
