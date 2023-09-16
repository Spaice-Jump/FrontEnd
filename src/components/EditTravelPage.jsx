import {
	fetchLocations,
	editTravel,
	deletePhoto,
	fetchSingleTravel,
} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations, getTravelById, getUi } from '../redux/selectors';
import { useEffect, useState } from 'react';
import './componentTravels.css';
import videoBackground from '../assets/video/new-travel-background.mp4';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import resizeFile from '../utils/resizeFile';
import Layout from '../layout/Layout';
import Loading from '../layout/utils/spinner/Loading';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditTravelPage() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [travel, setTravel] = useState({});
	const editTrip = useSelector(getTravelById(id));
	const { isLoading, error } = useSelector(getUi);

	useEffect(() => {
		if (editTrip) {
			editTrip.datetimeDeparture = new Date(editTrip.datetimeDeparture);
			setTravel(editTrip);
		} else {
			const trip = dispatch(fetchSingleTravel(id));
			editTrip.datetimeDeparture = new Date(editTrip.datetimeDeparture);
			setTravel(trip);
		}
	}, [dispatch, id, editTrip]);

	const locations = useSelector(getLocations);
	useEffect(() => {
		if (locations.length !== 0) {
			return;
		}
		dispatch(fetchLocations());
	}, [dispatch, locations]);

	// Eliminación de la imagen desde icono.

	const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
		useState(false);

	const handleDeletePhoto = () => {
		setIsDeleteConfirmationVisible(true);
	};

	const confirmDeletePhoto = () => {
		dispatch(deletePhoto(id, travel));
		setIsDeleteConfirmationVisible(false);
	};

	const cancelDeletePhoto = () => {
		setIsDeleteConfirmationVisible(false);
	};

	const handleSubmit = event => {
		event.preventDefault();
		dispatch(editTravel(id, travel));
	};

	const navigate = useNavigate();
	const handleReturn = () => {
		navigate(`/travel/${travel.topic}/${id}`);
	};

	const [isPastDate, setIsPastDate] = useState(false);

	const handleDate = date => {
		const now = new Date();
		if (date < now) {
			setTravel({ ...travel, datetimeDeparture: null });
			setIsPastDate(true);
			return;
		} else {
			setIsPastDate(false);
		}
		const event = { target: { value: date, name: 'datetimeDeparture' } };
		handleChange(event);
	};

	const handleChange = async event => {
		const { name, value } = event.target;

		if (name === 'photo') {
			const image = await resizeFile(event.target.files[0]);
			setTravel({ ...travel, [name]: image });
			return;
		}
		if (name === 'forSale' && value === 'false') {
			setTravel({
				...travel,
				[name]: false,
				availableSeats: undefined,
				soldSeats: undefined,
			});
			return;
		}
		if (name === 'availableSeats') {
			setTravel({ ...travel, [name]: value, soldSeats: 0 });
			return;
		}

		setTravel({ ...travel, [name]: value });
	};

	const minDate = new Date();
	minDate.setHours(0, 0, 0, 0);

	const isDisabled =
		!travel.topic ||
		!travel.origin ||
		!travel.destination ||
		!travel.price ||
		!travel.datetimeDeparture;

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Layout>
			<section
				id="new-travel"
				className="masthead new-travel-page"
			>
				<video
					className="video-background"
					autoPlay
					muted
					loop
				>
					<source
						src={videoBackground}
						type="video/mp4"
					/>
				</video>
				<div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center new-travel-all-form">
					<div className="text-center">
						<h1 className="mx-auto my-0 text-uppercase edit-travel-page-title">
							Edita tu viaje espacial
						</h1>
						{travel.photo ? (
							<>
								<div className="product-image-edit-travel">
									<img
										className="img-visualized"
										src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${editTrip.photo}`}
										alt={travel.topic}
									/>
									<div className="delete-photo-overlay-edit-travel">
										<button
											onClick={handleDeletePhoto}
											className="delete-photo-button-edit-travel"
										>
											<FontAwesomeIcon icon={faTrash} />
											<br />
											Eliminar fotografía actual
										</button>
										{isDeleteConfirmationVisible && (
											<div className="delete-confirmation-edit-travel">
												<p>¿Estás seguro de que quieres eliminar esta foto?</p>
												<button onClick={confirmDeletePhoto}>Aceptar</button>
												<button onClick={cancelDeletePhoto}>Cancelar</button>
											</div>
										)}
									</div>
								</div>
							</>
						) : null}
						<form
							onSubmit={handleSubmit}
							className="new-travel-form"
						>
							<label htmlFor="topic">Título del viaje</label>
							<input
								value={travel.topic}
								onChange={handleChange}
								type="text"
								name="topic"
								id="topic"
								required
							/>
							<label
								htmlFor="origin"
								className="origin-label"
							>
								Origen
							</label>
							<select
								value={travel.origin}
								onChange={handleChange}
								type="string"
								name="origin"
								id="origin"
								required
							>
								{locations.map(location => (
									<option
										key={location.name}
										value={location.name}
									>
										{location.name}
									</option>
								))}
							</select>
							<label
								htmlFor="destination"
								className="destination-label"
							>
								Destino
							</label>
							<select
								value={travel.destination}
								onChange={handleChange}
								type="string"
								name="destination"
								id="destination"
								required
							>
								{locations.map(location => (
									<option
										key={location.name}
										value={location.name}
									>
										{location.name}
									</option>
								))}
							</select>
							<br />
							<label>Fecha de salida</label>
							<br />
							<DatePicker
								selected={travel.datetimeDeparture}
								onChange={handleDate}
								dateFormat="dd/MM/yyyy HH:mm"
								timeIntervals={5}
								showTimeSelect
								required
								minDate={minDate}
								maxDate={null}
								timeFormat="HH:mm"
								placeholderText="Click para seleccionar fecha"
							/>
							{isPastDate && (
								<div
									className="warning-message"
									style={{ color: 'red' }}
								>
									La hora seleccionada es anterior a la hora actual. Cámbiala a
									una hora posterior a la actual.
								</div>
							)}
							<br />
							<label htmlFor="price">Precio</label>
							<input
								value={travel.price}
								onChange={handleChange}
								type="number"
								name="price"
								id="price"
								required
							/>
							{travel.forSale ? (
								<>
									<label htmlFor="availableSeats">Asientos disponibles</label>
									<input
										value={travel.availableSeats}
										onChange={handleChange}
										type="number"
										name="availableSeats"
										id="availableSeats"
										required
									/>
								</>
							) : null}
							<label htmlFor="remarks">Comentarios</label>
							<textarea
								value={travel.remarks}
								onChange={handleChange}
								name="remarks"
								id="remarks"
							></textarea>
							<label htmlFor="photo">Subir una fotografía</label>
							<input
								onChange={handleChange}
								type="file"
								name="photo"
								id="photo"
							/>
							<button
								type="submit"
								disabled={isDisabled}
							>
								Actualizar viaje
							</button>
							<button
								type="submit"
								onClick={handleReturn}
							>
								Volver atrás
							</button>
							{error ? (
								<div className="error">
									<p> {error}</p>
								</div>
							) : null}
						</form>
					</div>
				</div>
			</section>
		</Layout>
	);
}

export default EditTravelPage;
