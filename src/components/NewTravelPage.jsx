import { createTravel, fetchLocations } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations, getUserId } from '../redux/selectors';
import { useState, useEffect } from 'react';
import './NewTravelPage.css';
import resizeFile from '../utils/resizeFile';

function NewTravelPage() {
	const userId = useSelector(getUserId);

	const [travel, setTravel] = useState({
		topic: '',
		origin: 'Earth',
		destination: 'Earth',
		remarks: '',
		price: null,
		forSale: true,
		photo: null,
		userId: userId,
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
		dispatch(createTravel(travel));
	};

	const handleChange = async event => {
		const { name, value } = event.target;

		if (name === 'photo') {
			if (name === 'photo') {
				const image = await resizeFile(event.target.files[0]);
				setTravel({ ...travel, [name]: image });
				return;
			}
		}
		setTravel({ ...travel, [name]: value });
	};

	const isDisabled =
		!travel.topic || !travel.origin || !travel.destination || !travel.price;

	return (
		<div className="newTravelContainer">
			<h1>Crear nuevo viaje espacial</h1>
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
					Crear viaje
				</button>
			</form>
		</div>
	);
}

export default NewTravelPage;
