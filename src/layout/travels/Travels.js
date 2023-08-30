import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css/travels.css";
import { Link } from "react-router-dom";
import ExperienceSection from "../home/components/ExperienceSection";
import { getTravels } from "../../api/serviceTravels";

const Travels = () => {
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    getTravels()
      .then((response) => {
        setTravels(response);
      })
      .catch((error) => {
        console.error("Error fetching travels:", error);
      });
  }, []);

  return (
    <>
      <section className="travels-first-container">
        <div className="container travels-container">
          <div className="row">
            {travels ? (
              travels.map((travel) => (
                <div key={travel._id} className="col-md-3 col-sm-6">
                  <div className="product-grid">
                    {travel.photo ? (
                      <div className="product-image">
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}uploads/${travel.photo}`}
                          alt={travel.topic}
                        />
                      </div>
                    ) : null}
                    <div className="product-content">
                      <ul className="rating">
                        <li className="fas fa-star"></li>
                        <li className="fas fa-star"></li>
                        <li className="fas fa-star"></li>
                        <li className="fas fa-star"></li>
                        <li className="fas fa-star disable"></li>
                      </ul>
                      <h3 className="title">
                        <Link to={`/travel/${travel._id}`}>{travel.topic}</Link>
                      </h3>
                      <p className="text-travels-ads">
                        Remarks: {travel.remarks}
                      </p>
                      <div className="price">
                        <span>Price: {travel.price}€</span>
                        {/* travel.discount && <span> {travel.originalPrice}€</span> */}
                      </div>
                      {travel.forSale ? (
                        <p className="text-travels-ads">Sale</p>
                      ) : (
                        <p className="text-travels-ads">Search</p>
                      )}
                      <p className="text-travels-ads">
                        Origin: {travel.origin}
                      </p>
                      <p className="text-travels-ads">
                        Destination: {travel.destination}
                      </p>
                      <div className="product-button-group">
                        <a className="product-like-icon" href="#">
                          <i className="fas fa-heart"></i>
                        </a>
                        <Link
                          to={`/travel/${travel._id}`}
                          className="add-to-cart"
                        >
                          <i className="fa fa-shopping-bag"></i>VIAJAR AQUÍ
                        </Link>
                        <a className="product-compare-icon" href="#">
                          <i className="fas fa-random"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No travel data available.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Travels;
