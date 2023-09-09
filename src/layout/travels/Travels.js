import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/travels.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLocations, fetchTravels } from '../../redux/actions';




import { getTravels, getUi, getLocations } from '../../redux/selectors';
import Loading from '../../layout/utils/spinner/Loading';
import Filters from './Filter';


const Travels = () => {
	const [search, setSearch] = useState('');
	const dispatch = useDispatch();
 const [precMax, setPrecMax]= useState(Infinity)
 const [precMin, setPrecMin]= useState(0)
  const travel = useSelector(getTravels);
  const[locationOrigin, setLocationOrigin]= useState('')
  const[locationDestination, setLocationDestination]= useState('')

  const allLocations=useSelector(getLocations)


  const [data, setData] = useState({
    sales: '',
    buy: '',
    priceMin: 0,
    priceMax: Infinity,
  });
	useEffect(() => {
    dispatch(fetchTravels());
    dispatch(fetchLocations());
	}, [dispatch]);

  let travels = travel;
  let locationsOrigin = allLocations
  let locationsDestination = allLocations
  
  if (precMax === '') {
    setPrecMax(Infinity);
  }

  if (!!locationOrigin){
    const resultDestination = locationsDestination.filter(location => location.name !== locationOrigin);
    
    locationsDestination=resultDestination
  }

  if (!!locationDestination){
    const resultOrigin = locationsOrigin.filter(location => location.name !== locationDestination);
    
    locationsOrigin=resultOrigin
  }

 
  travels = Filters(
    travels,
    search,
    precMax,
    precMin,
    locationOrigin,
    locationDestination
  );

  
  
  //busqueda por palabras
  const searcher = (e)=>{
    setSearch(e.target.value)
  }
  

const handleChangeFilterPriceMax = event => {
  setData({ ...data, priceMax: event.target.value });
  setPrecMax(event.target.value)
};

const handleChangeFilterPriceMin = event => {
  setData({ ...data, priceMin: event.target.value });
  setPrecMin(event.target.value)
};
	const { isLoading, error } = useSelector(getUi);



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
            <label className="origin">Origen</label>
          <select name="origin" id="origin" onChange={e=>setLocationOrigin(e.target.value)}>
          <option value=''>Seleccionar</option> 
            {locationsOrigin.map(location=>(

             <option key={location._id} value={location.name}>{location.name}</option> 
            ))}
          </select>
          <label className="origin">Destino</label>
          <select name="destination" id="destination" onChange={e=>setLocationDestination(e.target.value)}>
          <option value=''>Seleccionar</option> 
            {locationsDestination.map(location=>(

             <option key={location._id} value={location.name}>{location.name}</option> 
            ))}
          </select>
            </form>
						{travels ? (
							travels.map(travel => (
								<div
									key={travel._id}
									className="col-md-3 col-sm-6 travels-columns"
								>
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
                                            <p className="text-travels-ads">
												User :
                                                <Link
													to={`/travel-user/${travel.userName}`}
													class="text-decoration-none"
												>{travel.userName}</Link> 
											</p>

											<div className="product-button-group">
												<a
													className="product-like-icon"
													href="#"
												>
													<i className="fas fa-heart"></i>
												</a>
												<Link
													to={`/travel/${travel._id}`}
													className="add-to-cart"
												>
													<i className="fa fa-shopping-bag"></i>
													{travel.active ? 'VIAJAR AQUÍ ' : 'VIAJE COMPLETO'}
												</Link>
												<a
													className="product-compare-icon"
													href="#"
												>
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
				{error ? (
					<div className="error">
						<p> {error}</p>
					</div>
				) : null}
			</section>
		</>
	);
};

export default Travels;
