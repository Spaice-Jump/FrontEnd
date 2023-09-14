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
import FavoriteHeart from '../utils/FavoriteHeart';
import CreditCard from '../utils/CreditCard';

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



	const handleReturn = () => {
		return navigate('/travels');
	};

	const handleCloseTravel = () => {
		dispatch(closeOpenTravel(travel._id, !travel.active));
		setTravel({ ...travel, active: !travel.active });
	};

	function formatDate(datetimeCreation) {
    const dateObj = new Date(datetimeCreation);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    return `${day}-${month}-${year}`;
  }

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

                                    <section>

                                    
                                    <CreditCard travelId={travel._id} price={travel.price}/>
									
                                    </section>
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

                        {isLogged && userId !== travel.userId ? (
                        <FavoriteHeart travelId={travel._id} checked={travel.favorite}/>
                        ) : null}
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
							<li>
								<strong>Travel Date </strong>
								{formatDate(travel.datetimeCreation)}
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
