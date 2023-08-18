import React, { useState, useEffect } from 'react';
import ExperienceSection from '../home/components/ExperienceSection';
import { getTravels } from '../../api/serviceTravels';

const Travels = () => {
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    getTravels()
      .then(response => {
        setTravels(response.data);
      })
      .catch(error => {
        console.error('Error fetching travels:', error);
      });
  }, []);

  return (
    <>
      <ExperienceSection />
      <div className="container travels-container">
        <div className="row">
          {travels.map(travel => (
            <div key={travel.id} className="col-md-3 col-sm-6">
              <div className="product-grid">
                <div className="product-image">
                  <a href="#" className="image">
                    <img className="pic-1" src={travel.photo} alt="" />
                    <img className="pic-2" src={travel.photo} alt="" />
                  </a>
                </div>
                <div className="product-content">
                  <ul className="rating">
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star disable"></li>
                  </ul>
                  <h3 className="title"><a href="#">{travel.name}</a></h3>
                  <p className='text-travels-ads'>Topic: {travel.topics}</p>
                  <p className='text-travels-ads'>Remarks: {travel.remarks}</p>
                  <div className="price">
                    <span>Price: {travel.price}€</span>
                    {/*travel.discount && <span> {travel.originalPrice}€</span>*/}
                  </div>
                  {travel.forSale ? <p className='text-travels-ads'>Sale</p> : <p className='text-travels-ads'>For Buy</p>}
                  <p className='text-travels-ads'>Origin: {travel.origin}</p>
                  <p className='text-travels-ads'>Destination: {travel.destination}</p>
                  <div className="product-button-group">
                    <a className="product-like-icon" href="#"><i className="fas fa-heart"></i></a>
                    <a className="add-to-cart" href="#"><i className="fa fa-shopping-bag"></i>VIAJAR AQUÍ</a>
                    <a className="product-compare-icon" href="#"><i className="fas fa-random"></i></a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

//export default Travels;