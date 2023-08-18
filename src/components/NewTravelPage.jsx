import { useDispatch } from 'react-redux';
import { useState } from 'react';
import "./NewTravelPage.css";

function NewTravelPage() {
	const [travel, setTravel] = useState({
		topics: '',
		remarks: '',
		price: 0,
		forSale: true,
		origin: '',
		destination: '',
    photo: null,
	});

	const dispatch = useDispatch();

	const handleSubmit = event => {
		event.preventDefault();
		dispatch();
	};

	const handleChange = event => {
    const { name, value } = event.target;
    setTravel({...travel, [name]: value});
  };

	return (
		<div className="newTravelContainer">
			<h1>Crear nuevo viaje espacial</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="topics">Topics</label>
				<input
					value={travel.topics}
					onChange={handleChange}
					type="text"
					name="topics"
					id="topics"
				/>
				<label htmlFor="remarks">Comentarios</label>
				<input
					value={travel.remarks}
					onChange={handleChange}
					type="text"
					name="remarks"
					id="remarks"
				/>
				<label htmlFor="price">Price</label>
				<input
					value={travel.price}
					onChange={handleChange}
					type="number"
					name="price"
					id="price"
				/>
				<label htmlFor="forSale">For sale</label>
				<select
          value={travel.forSale}
          onChange={handleChange}
					name="forSale"
					id="forSale"
				>
					<option value={true}>For Sale</option>
					<option value={false}>For Buy</option>
				</select>
				<label htmlFor="origin">Origin</label>
				<input
          value={travel.origin}
          onChange={handleChange}
					type="string"
					name="origin"
					id="origin"
				/>
				<label htmlFor="destination">Destination</label>
				<input
          value={travel.destination}
          onChange={handleChange}
					type="string"
					name="destination"
					id="destination"
				/>
				<label htmlFor="photo">Subir una fotografía</label>
				<input
					onChange={handleChange}
					type="file"
					name="photo"
					id="photo"
				/>
				<button type="submit">Crear viaje</button>
			</form>
		</div>
	);
}

export default NewTravelPage;
