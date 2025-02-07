import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./Card.css";

const PAGE_SIZE = 10;

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

  return (
    <div>
      {!products ? (
        <h1>Loading...</h1>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>Pagination</h1>
          <div>{[...Array(noOfPages).keys()].map(n => {
            return(<button className="page-number" key={n}>{n}</button>)
          })}</div>
          <div className="products-container">
            {products.slice(0, 9).map((product) => {
              return <Card key={product.id} product={product} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardList;
