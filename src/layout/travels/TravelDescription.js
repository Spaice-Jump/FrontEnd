import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTravel } from '../../api/serviceTravels';
import './css/travelDescription.css';
import { useSelector, useDispatch } from 'react-redux';
import {
	getIsLogged,
	getUserId,
	getTravelById,
	getUi,
} from '../../redux/selectors';
import { deleteTravel, buyTravel, closeOpenTravel } from '../../redux/actions';
import Loading from '../utils/spinner/Loading';

const TravelDescription = () => {
	const { id } = useParams();
	const [travel, setTravel] = useState(null);
	const isLogged = useSelector(getIsLogged);
	const userId = useSelector(getUserId);
	const { isLoading, error } = useSelector(getUi);
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
		navigate(`/travel-edit/${travel.topic}/${id}`);
	};

	const HandleDeleteProcess = value => () => {
		setDeleteProcess(value);
	};

	const handleDelete = () => {
		dispatch(deleteTravel(id));
		navigate('/travels');
	};

	const handleBuy = () => {
		dispatch(buyTravel(travel._id));
	};

	const handleReturn = () => {
		return navigate('/travels');
	};

	const handleCloseTravel = () => {
		dispatch(closeOpenTravel(travel._id, !travel.active));
		setTravel({ ...travel, active: !travel.active });
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<section className="travel-description-page">
			<div id="container-travel-description">
				<div className="product-details-travel-description">
					<h1>{travel.topic}</h1>
					<p class="information">"{travel.remarks}"</p>
					<div class="control-travel-description">
						{travel.active && isLogged ? (
							<>
								{userId === travel.userId ? (
									<p>Viaje de mi compañía</p>
								) : (
									<button
										onClick={handleBuy}
										className="btn-travel-description"
									>
										<span className="price-travel-description">
											{travel.price}€
										</span>
										<span className="shopping-cart-travel-description">
											<i
												className="fa fa-shopping-cart"
												aria-hidden="true"
											></i>
										</span>
										<span className="buy-travel-description">Buy Now</span>
									</button>
								)}
							</>
						) : (
							<>
								{travel.userBuyer === userId ? (
									<p>Ya has comprado un pasaje para este viaje</p>
								) : (
									<p>Viaje completo</p>
								)}
							</>
						)}
						<div id="open-close-travel">
							{isLogged && userId === travel.userId ? (
								travel.active ? (
									<>
										<p>¿Quieres cerrar tu viaje?</p>
										<p>(Podrás volver a abrirlo en cualquier momento)</p>
										<button onClick={handleCloseTravel}>Cerrar mi viaje</button>
									</>
								) : (
									<>
										<p>¿Quieres abrir tu viaje?</p>
										<button onClick={handleCloseTravel}>Abrir mi viaje</button>
									</>
								)
							) : null}
						</div>
						<button onClick={handleReturn}>Volver</button>
					</div>
				</div>
				<div className="product-image-travel-description">
					{travel.photo ? (
						<img
							src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${travel.photo}`}
							alt={travel.topic}
						/>
					) : null}
					<div className="info-overlay">
						<p className="overlay-text">Pasa el ratón para ver más detalles</p>
					</div>
					<div className="info-travel-description">
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
				{error ? (
					<div className="error">
						<p> {error}</p>
					</div>
				) : null}
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
		</section>
	);
};

export default TravelDescription;
