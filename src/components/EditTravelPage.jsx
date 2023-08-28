import { fetchLocations, editTravel } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations, getTravelById } from '../redux/selectors';
import { useEffect, useState } from 'react';
import './NewTravelPage.css';
import { useParams } from 'react-router-dom';

function EditTravelPage() {
	const { id } = useParams();
	const editTrip = useSelector(getTravelById(id));

	const [travel, setTravel] = useState({
		topic: editTrip.topic,
		origin: editTrip.origin,
		destination: editTrip.destination,
		remarks: editTrip.remarks,
		price: editTrip.price,
		forSale: editTrip.forSale,
		photo: editTrip.photo,
		userId: editTrip.userId,
	});

	const locations = useSelector(getLocations);
	const dispatch = useDispatch();
	useEffect(() => {
		if (locations.length !== 0) {
			return;
		}
		dispatch(fetchLocations());
	}, [dispatch, locations]);

	const handleSubmit = event => {
		event.preventDefault();
		dispatch(editTravel(id, travel));
	};

	const handleChange = event => {
		const { name, value } = event.target;

		if (name === 'photo') {
			setTravel({ ...travel, [name]: event.target.files[0] });
			return;
		}
		setTravel({ ...travel, [name]: value });
	};

	const isDisabled =
		!travel.topic || !travel.origin || !travel.destination || !travel.price;

	return (
		<div className="newTravelContainer">
			<h1>Edita tu viaje espacial</h1>
			{travel.photo ? (
				<div className="product-image">
					<img
						src={`${process.env.REACT_APP_API_BASE_URL}uploads/${travel.photo}`}
						alt={travel.topic}
					/>
				</div>
			) : null}
			<form onSubmit={handleSubmit}>
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
			</form>
		</div>
	);
}

export default EditTravelPage;
