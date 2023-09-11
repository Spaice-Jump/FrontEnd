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
import Loading from '../layout/utils/spinner/Loading';
import { useNavigate } from 'react-router-dom';

function EditTravelPage() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [travel, setTravel] = useState({});
	const editTrip = useSelector(getTravelById(id));
	const { isLoading, error } = useSelector(getUi);

	useEffect(() => {
		setTravel(editTrip);
		if (!editTrip) {
			const trip = dispatch(fetchSingleTravel(id));
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

	const handleChange = async event => {
		const { name, value } = event.target;

		if (name === 'photo') {
			const image = await resizeFile(event.target.files[0]);
			setTravel({ ...travel, [name]: image });
			return;
		}

		setTravel({ ...travel, [name]: value });
	};

	const isDisabled =
		!travel.topic || !travel.origin || !travel.destination || !travel.price;

	const navigate = useNavigate();
	const handleReturn = () => {
		navigate(`/travel/${travel.topic}/${id}`);
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<section
			id="edit-travel"
			className="masthead edit-travel-page"
		>
			<video
				className="video-background-edit-travel-page"
				autoPlay
				muted
				loop
			>
				<source
					src={videoBackground}
					type="video/mp4"
				/>
			</video>
			<div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center edit-travel-all-form">
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
						className="edit-travel-form"
					>
						<label htmlFor="topic">Título del viaje</label>
						<input
							value={travel.topic}
							onChange={handleChange}
							type="text"
							name="topic"
							id="topic"
						/>
						<label htmlFor="origin">Origen</label>
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
						<label htmlFor="destination">Destino</label>
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
						<label htmlFor="price">Precio</label>
						<input
							value={travel.price}
							onChange={handleChange}
							type="number"
							name="price"
							id="price"
							required
						/>
						<label htmlFor="remarks">Comentarios</label>
						<input
							value={travel.remarks}
							onChange={handleChange}
							type="text"
							name="remarks"
							id="remarks"
						/>
						<label htmlFor="forSale">¿Qué quieres?</label>
						<select
							value={travel.forSale}
							onChange={handleChange}
							name="forSale"
							id="forSale"
							required
						>
							<option value={true}>Publicar un viaje</option>
							<option value={false}>Demandar un viaje</option>
						</select>
						<label htmlFor="photo">Sustituye la fotografía</label>
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
					</form>
					{error ? (
						<div className="error">
							<p> {error}</p>
						</div>
					) : null}
				</div>
			</div>
		</section>
	);
}

export default EditTravelPage;
