import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTravel } from '../../api/serviceTravels';
import './css/travelDescription.css';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogged, getUserId, getTravelById } from '../../redux/selectors';
import { deleteTravel, buyTravel } from '../../redux/actions';

const TravelDescription = () => {
	const { id } = useParams();
	const [travel, setTravel] = useState(null);
	const isLogged = useSelector(getIsLogged);
	const userId = useSelector(getUserId);
	const travelById = useSelector(getTravelById(id));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [deleteProcess, setDeleteProcess] = useState(false);

	useEffect(() => {
		if (!travelById) {
			getTravel(id)
				.then(response => {
					setTravel(response);
				})
				.catch(error => {
					console.error('Error fetching travel details:', error);
				});
		} else {
			setTravel(travelById);
		}
	}, [id, travelById]);

	if (!travel) {
		return <p>Loading...</p>;
	}

	const handleEdit = () => {
		navigate(`/travel-edit/${id}`);
	};

	const HandleDeleteProcess = value => () => {
		setDeleteProcess(value);
	};

	const handleDelete = () => {
		dispatch(deleteTravel(id));
		navigate('/travels');
	};

	const handleReturn = () => {
    return navigate('/travels');
  }

	const handleBuy = async () => {
		await dispatch(buyTravel(travel.id));
		const travelInactive = getTravelById(travel.id);
		setTravel(travelInactive);
	};

	return (
		<>
			<section className="travel-description-page">
				{travel.active ? 
					<>
						<div id="container-travel-description">
							<div class="product-details-travel-description">
								<h1>{travel.topic}</h1>
								<p class="information">"{travel.remarks}"</p>
								<div class="control-travel-description">
									<button
										onClick={handleBuy}
										class="btn-travel-description"
									>
										<span class="price-travel-description">{travel.price}€</span>
										<span class="shopping-cart-travel-description">
											<i
												class="fa fa-shopping-cart"
												aria-hidden="true"
											></i>
										</span>
										<span class="buy-travel-description">Buy Now</span>
									</button>
								</div>
							</div>
							<div class="product-image-travel-description">
								<img
									src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${travel.photo}`}
									alt={travel.topic}
								/>
								<div class="info-overlay">
									<p class="overlay-text">Pasa el ratón para ver más detalles</p>
								</div>
								<div class="info-travel-description">
									<h2>The Description</h2>
									<ul>
										<li>
											<strong>Origin: </strong>
											{travel.origin}
										</li>
										<li>
											<strong>Destination: </strong>
											{travel.destination}
										</li>
										<li>
											<strong>Remarks: </strong>
											{travel.remarks}
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="travel-buttons">
							{isLogged && userId === travel.userId ? (
								<>
									<button
										onClick={handleEdit}
										className="btn-travel-description btn-edit"
									>
										Editar viaje
									</button>
									{!deleteProcess ? (
										<button
											onClick={HandleDeleteProcess(true)}
											className="btn-travel-description btn-delete"
										>
											Borrar viaje
										</button>
									) : (
										<>
											<button
												onClick={handleDelete}
												className="btn-travel-description btn-confirm"
											>
												Confirmar borrado
											</button>
											<button
												onClick={HandleDeleteProcess(false)}
												className="btn-travel-description btn-cancel"
											>
												Cancelar
											</button>
										</>
									)}
								</>
							) : null}
						</div> 
					</>
				 : 
						<div className="purchased-travel">
							<h1>¡ Enhorabuena !</h1>
							<p>La compra del viaje se ha realizado con éxito</p>
							<button onClick={handleReturn}>Seguir navegando</button>
						</div>
				}
			</section>
		</>
	);
};

export default TravelDescription;
