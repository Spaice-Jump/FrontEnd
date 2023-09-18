import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { getSendEmail, getTravel } from '../../api/serviceTravels';
import './css/travelDescription.css';
import { useSelector, useDispatch } from 'react-redux';
import {
	getIsLogged,
	getUserId,
	getTravelById,
	getUi,
} from '../../redux/selectors';
import { deleteTravel, closeOpenTravel } from '../../redux/actions';
import Loading from '../utils/spinner/Loading';
import FavoriteHeart from '../utils/FavoriteHeart';
import Layout from '../Layout';
import CreditCard from '../utils/CreditCard';
import { formatDate, formatDateTime } from '../utils/formatDateFunctions';
import IconMsg from '../chat/IconMsg';

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
	const [sendEmail, setSendEmail] =useState(false)
	const [travelUser, setTravelUser]= useState('')
	const [email, setEmail] =useState({
		name:'',
		surnames:'',
		companyName:'',
		textEmail:'',
		user:'',


	})
	
	
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

	const handleBuy = event => {
		event.preventDefault();
		return navigate(`/travelBuy/${id}`);
	};

	if (isLoading) {
		return <Loading />;
	}
	

	const handeEmail= event=>{
		setSendEmail(true)
		console.log('send',sendEmail)

	}
	

	const handleChange = async event => {
		const { name, value } = event.target;

		if (name === 'name') {
			setEmail({ ...email, [name]: value });
			
			return;
		}
		if (name === 'surnames') {
		
				setEmail({ ...email, [name]: value })
			;
			return;
		}
		if (name === 'companyName') {
			setEmail({ ...email, [name]: value });
			return;
		}
		if (name === 'textEmail') {
			
			setEmail({ ...email, [name]: value, user: travel.userName });
			return;
		}

	};
	
	const handleSubmit = event => {
		event.preventDefault();
		
		
		getSendEmail(email).then(response=>alert(response.msg))
			
		
		

	};
	
	const isDisabled =
		!email.name ||
		!email.surnames ||
		!email.companyName ||
		!email.textEmail


	return (
		<Layout>
			<section className="travel-description-page">
				<div id="container-travel-description">
					<div className="product-details-travel-description">
						<h1>{travel.topic}</h1>
						<p>Publicado el {formatDate(travel.datetimeCreation)}</p>
						<p className="information">"{travel.remarks}"</p>
						<div className="control-travel-description">
							{travel.active && isLogged && travel.forSale ? (
								
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
							) : travel.active && isLogged && !travel.forSale ? (
								sendEmail ? <form
								onSubmit= {handleSubmit}
								className="new-email-form"
								
							>
								<label htmlFor="name">Nombre</label>
								<input
									value={email.name}
									onChange={handleChange}
									type="text"
									name="name"
									id="name"
									required
								/>
								<label
									htmlFor="surnames"
									className="surnames"
								>
									Apellidos
								</label>
								<input
									value={email.surname}
									onChange={handleChange}
									type="text"
									name="surnames"
									id="surnames"
									required
								/>
		
								<label
									htmlFor="companyName"
									className="companyName"
								>
									Nombre Empresa
								</label>
								<input
									value={email.companyName}
									onChange={handleChange}
									type="text"
									name="companyName"
									id="companyName"
									required
								/>
								
								<label htmlFor="textEmail">Comentarios</label>
								<textarea
									value={email.textEmail}
									onChange={handleChange}
									name="textEmail"
									id="textEmail"
								></textarea>
								
								<button
									type="submit"
									disabled={isDisabled}
								>
									Enviar Email
								</button>
								{error ? (
									<div className="error">
										<p> {error}</p>
									</div>
								) : null}
							</form>:
								<>
								<NavLink className="bi bi-whatsapp " to='https://api.whatsapp.com/send?phone=34696035437'>
									<button className='p-3 mb-2 bg-success text-white'>Enviar whatsapp al usuario
									<svg width="26" height="26" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
</svg>


									</button>
								</NavLink>
								<form method='get'>

								<button className='p-3 mb-2 bg-info text-white' onClick={handeEmail}>Enviar email al usuario
								</button>
								</form>
							
							</>

							) : null}
						</div>

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

						{isLogged && userId !== travel.userId ? (
							<div className="product-compare-icon">
                            <FavoriteHeart
                                travelId={travel._id}
                                checked={travel.favorite}
                            />
                            <IconMsg travelId={travel._id}/>
                            </div>
						) : null}
					</div>
					<div className="product-image-travel-description">
						{travel.photo ? (
							<img
								src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${travel.photo}`}
								alt={travel.topic}
							/>
						) : null}
						<div className="info-overlay">
							<p className="overlay-text">
								Pasa el ratón para ver más detalles
							</p>
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
									<strong>Travel Departure </strong>
									{formatDateTime(travel.datetimeDeparture)}
								</li>
								<li>
									<strong>Capacidad de viajeros </strong>
									{travel.availableSeats}
								</li>
								<li>
									<strong>Plazas disponibles </strong>
									{travel.availableSeats - travel.soldSeats}
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
					<button onClick={handleReturn}>Volver</button>
				</div>
			</section>
		</Layout>
	);
};

export default TravelDescription;
