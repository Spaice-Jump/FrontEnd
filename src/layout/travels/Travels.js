import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/travels.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTravels, fetchTravelsSuccess } from '../../redux/actions';




import { getTravels, getUi } from '../../redux/selectors';
import Loading from '../../layout/utils/spinner/Loading';


const Travels = () => {
	// const [result, setResult] = useState([]);
	const [search, setSearch] = useState('');
	const dispatch = useDispatch();

  const travel = useSelector(getTravels);
  const [advertFilter, setAdvertFilter] = useState([]);
  const [data, setData] = useState({
    sales: '',
    buy: '',
    priceMin: 0,
    priceMax: Infinity,
  });
	useEffect(() => {
    //setResult(travel)
    dispatch(fetchTravels());
	}, [dispatch]);

  // useEffect(() => {
  //   dispatch(advertsLoaded(advert));
  // }, [dispatch, advert]);

  // const [checked, setCheked] = useState(null);

  // const handleClickFilter = event => {
  //   event.preventDefault();

  //   const state = () => {
  //     let resultSale = '';

  //     if (data.sales) {
  //       resultSale = true;
  //     } else if (data.buy) {
  //       resultSale = false;
  //     }
  //     return resultSale;
  //   };
  //   if (state() === true || state() === false) {
  //     let filterPrice = advert.filter(
  //       advert =>
  //         advert.price >= data.priceMin &&
  //         advert.price <= data.priceMax &&
  //         advert.sale === state(),
  //     );

  //     dispatch(advertsLoadedSuccess(filterPrice));
  //   } else {
  //     let filterPrice = advert.filter(
  //       advert =>
  //         advert.price >= data.priceMin && advert.price <= data.priceMax,
  //     );

  //     dispatch(advertsLoadedSuccess(filterPrice));
  //   }
  // };

  // const handleChangeFilterSaleCheck = event => {
  //   event.target.name === 'sales'
  //     ? setData({ ...data, sales: event.target.checked })
  //     : setData({ ...data, buy: event.target.checked });
  // };
  // const handleChangeFilterPriceMax = event => {
  //   setData({ ...data, priceMax: event.target.value });
  // };

  // const handleChangeFilterPriceMin = event => {
  //   setData({ ...data, priceMin: event.target.value });
  // };
  // const disabledCheckBuy = data.sales;
  // const disabledCheckSale = data.buy;
  
  
  //busqueda por palabras
  const searcher = (e)=>{
    setSearch(e.target.value)
  }

  //filtrado por precios





  //filtrado
  
  
  
  let travels= travel
  console.log('t',travel)
  const handleClickFilter = event => {
    event.preventDefault();
    travels=[]
    let filterPrice=[]
    console.log('fff',filterPrice)
    if(!search && !filterPrice){
    dispatch(fetchTravels())
    //dispatch(fetchTravelsSuccess(travel))
    travels=travel
    console.log('tave1',travels)
  }else{
    travels = travel.filter((dato)=> dato.topic.toLowerCase().includes(search.toLocaleLowerCase()))
    dispatch(fetchTravelsSuccess(travels))
    console.log('tave1',travels)
  }
  
  console.log('evento', data)
  console.log('travelst',travels)

    filterPrice = travels.filter(
      travel =>
      //console.log('trav', travel.price), console.log('data', data.priceMin),
      travel.price >= data.priceMin &&
      travel.price <= data.priceMax,
      //travel.sale === state(),
      );
      travels= filterPrice
      //setResult(filterPrice)
      console.log('filtro', filterPrice)
      console.log('aaaa',travels)
      dispatch(fetchTravelsSuccess(filterPrice))
      console.log('singular',travel)
      
   
      //dispatch(advertsLoadedSuccess(filterPrice));
      
      //dispatch(advertsLoadedSuccess(filterPrice));

    };

const handleChangeFilterPriceMax = event => {
  setData({ ...data, priceMax: event.target.value });
};

const handleChangeFilterPriceMin = event => {
  setData({ ...data, priceMin: event.target.value });
};

	const travelsjj = useSelector(getTravels);
	const { isLoading, error } = useSelector(getUi);


	// //busqueda
	// const searcher = e => {
	// 	setSearch(e.target.value);
	// };

	// //filtrado
	// let travels = [];
	// if (!search) {
	// 	travels = result;
	// } else {
	// 	travels = result.filter(dato =>
	// 		dato.topic.toLowerCase().includes(search.toLocaleLowerCase())
	// 	);
	// }







	// useEffect(() => {
	// 	// setResult(travel);
	// 	dispatch(fetchTravels());
	// }, [dispatch /* , travel */]);


	if (isLoading) {
		return <Loading />;
	}


  return (
    <>
      <section className="travels-first-container">
        <div className="container travels-container">
          <div className="row">
        <input type='text' value={search} onChange={searcher} placeholder='Search' name='search' className='form-Control'></input>
        <form>
        <label className="labelAdvertsPage" name="price">
              Precio Minimo
            </label>
            <input
              className="inputPriceMinAdvertsPage"
              type="number"
              pattern="filtro precio"
              name="price"
              value={data.sales.value}
              onChange={handleChangeFilterPriceMin}
              placeholder="introduzca precio minimo"
            />
            <label className="labelAdvertsPage" name="price">
              Precio Maximo
            </label>
            <input
              className="inputPriceMaxAdvertsPage"
              type="number"
              pattern="filtro precio"
              name="price"
              value={data.sales.value}
              onChange={handleChangeFilterPriceMax}
              placeholder="introduzca precio maximo"
            />

            <button onClick={handleClickFilter}>Filtrar</button>
            </form>
            {travels ? (
              travels.map((travel) => (
                <div key={travel._id} className="col-md-3 col-sm-6 travels-columns">
                  <div className="product-grid">
                    {travel.photo ? (
                      <div className="product-image">
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${travel.photo}`}
                          alt={travel.topic}
                        />
                      </div>
                    ) : null}
                    <div className="product-content">
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
// =======
// 	return (
// 		<>
// 			<section className="travels-first-container">
// 				<div className="container travels-container">
// 					<div className="row">
// 						<input
// 							type="text"
// 							// value={search}
// 							// onChange={searcher}
// 							placeholder="Search"
// 							className="form-Control"
// 						></input>
// 						{travels ? (
// 							travels.map(travel => (
// 								<div
// 									key={travel._id}
// 									className="col-md-3 col-sm-6 travels-columns"
// 								>
// 									<div className="product-grid">
// 										{travel.photo ? (
// 											<div className="product-image">
// 												<img
// 													src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${travel.photo}`}
// 													alt={travel.topic}
// 												/>
// 											</div>
// 										) : null}
// 										<div className="product-content">
// 											<h3 className="title">
// 												<Link to={`/travel/${travel._id}`}>{travel.topic}</Link>
// 											</h3>
// 											<p className="text-travels-ads">
// 												Remarks: {travel.remarks}
// 											</p>
// 											<div className="price">
// 												<span>Price: {travel.price}€</span>
// 												{/* travel.discount && <span> {travel.originalPrice}€</span> */}
// 											</div>
// 											{travel.forSale ? (
// 												<p className="text-travels-ads">Sale</p>
// 											) : (
// 												<p className="text-travels-ads">Search</p>
// 											)}
// 											<p className="text-travels-ads">
// 												Origin: {travel.origin}
// 											</p>
// 											<p className="text-travels-ads">
// 												Destination: {travel.destination}
// 											</p>
// 											<div className="product-button-group">
// 												<a
// 													className="product-like-icon"
// 													href="#"
// 												>
// 													<i className="fas fa-heart"></i>
// 												</a>
// 												<Link
// 													to={`/travel/${travel._id}`}
// 													className="add-to-cart"
// 												>
// 													<i className="fa fa-shopping-bag"></i>
// 													{travel.active ? 'VIAJAR AQUÍ ' : 'VIAJE COMPLETO'}
// 												</Link>
// 												<a
// 													className="product-compare-icon"
// 													href="#"
// 												>
// 													<i className="fas fa-random"></i>
// 												</a>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							))
// 						) : (
// 							<p>No travel data available.</p>
// 						)}
// 					</div>
// 				</div>
// 				{error ? (
// 					<div className="error">
// 						<p> {error}</p>
// 					</div>
// 				) : null}
// 			</section>
// 		</>
// 	);
// >>>>>>> develop
};

export default Travels;
