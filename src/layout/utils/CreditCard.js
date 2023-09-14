import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useDispatch } from 'react-redux';
import { buyTravel } from '../../redux/actions';
import SpinnerBanc from './spinner/SpinnerBanc';

const CreditCard = ({ travelId, price }) => {
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [state, setState] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  });

  const handleBuy = event => {
    event.preventDefault();

    console.log(JSON.stringify(state));


    const timer = setTimeout(() => {
        setShowSpinner(false);
      }, 6000); // Cerrar el spinner después de 6 segundos
      setShowSpinner(true);
      return () => {
        
        clearTimeout(timer); // Limpia el temporizador si el componente se desmonta antes
      };

    //dispatch(buyTravel(travelId));
  };



  const handleInputChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocusChange = e => {
    setState({
      ...state,
      focus: e.target.name,
    });
  };

  useEffect(() => {
    if (
      !!state.number?.length === true &&
      !!state.name?.length === true &&
      !!state.expiry?.length === true &&
      !!state.cvc?.length === true
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
    
  }, [state]);

  const btnClass = !buttonDisabled
    ? ' btn-travel-description btn-disabled'
    : 'btn-travel-description';

 

  return (
    <div className="App">
      {showSpinner ? (
        <SpinnerBanc />
      ) : (
        <div>
          <div className="card">
            <div className="card-body">
              <Cards
                number={state.number}
                name={state.name}
                expiry={state.expiry}
                cvc={state.cvc}
                focused={state.focus}
              />
              <form>
                <div className="form-group">
                  <label htmlFor="number">Número de la tarjeta</label>
                  <input
                    type="text"
                    name="number"
                    id="number"
                    maxLength="16"
                    className="form-control"
                    onChange={handleInputChange}
                    onFocus={handleFocusChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    maxLength="30"
                    className="form-control"
                    onChange={handleInputChange}
                    onFocus={handleFocusChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="expiry">Fecha de expiración</label>
                    <input
                      type="text"
                      name="expiry"
                      id="expiry"
                      maxLength="4"
                      className="form-control"
                      onChange={handleInputChange}
                      onFocus={handleFocusChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="cvc">CVC</label>
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      maxLength="4"
                      className="form-control"
                      onChange={handleInputChange}
                      onFocus={handleFocusChange}
                    />
                  </div>
                </div>

                <button
                  onClick={handleBuy}
                  className={btnClass}
                  disabled={!buttonDisabled}
                >
                  <span className="price-travel-description">{price}€</span>
                  <span className="shopping-cart-travel-description">
                    <i
                      className="fa fa-shopping-cart"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <span className="buy-travel-description">Buy Now</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditCard;
