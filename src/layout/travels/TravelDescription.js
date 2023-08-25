import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getTravel, getTravels } from '../../api/serviceTravels';
import ExperienceSection from '../home/components/ExperienceSection';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogged, getUserId } from '../../redux/selectors';
import { deleteTravel } from '../../redux/actions';

const TravelDescription = () => {
	const { id } = useParams();
	const [travel, setTravel] = useState(null);
	const isLogged = useSelector(getIsLogged);
	const userId = useSelector(getUserId);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	useEffect(() => {
		getTravel(id)
			.then(response => {
				setTravel(response);
			})
			.catch(error => {
				console.error('Error fetching travel details:', error);
			});
	}, [id]);

	if (!travel) {
		return <p>Loading...</p>;
	}

	const handleEdit = () => {
		navigate(`/travel-edit/${id}`);
	};

	const handleDelete = () => {
		dispatch(deleteTravel(id));
	};

	return (
		<>
			<ExperienceSection />
			<div className="travel-details">
				<h2>{travel.topic}</h2>
				<div className="travel-image">
					<img
						src={travel.photo}
						alt={travel.topic}
					/>
				</div>
				<p className="text-travel-description">Origin: {travel.origin}</p>
				<p className="text-travel-description">
					Destination: {travel.destination}
				</p>
				<p className="text-travel-description">Price: {travel.price}€</p>
				<p className="text-travel-description">Remarks: {travel.remarks}</p>
				{travel.forSale ? (
					<p className="text-travel-description">For Sale</p>
				) : (
					<p className="text-travel-description">For Buy</p>
				)}
				<div className="travel-buttons">
					{isLogged && userId === travel.userId ? (
						<>
							<button onClick={handleEdit} className="btn btn-primary">Editar viaje</button>
							<button onClick={handleDelete} className="btn btn-primary">Borrar viaje</button>
						</>
					) : null}
				</div>
			</div>
		</>
	);
};

export default TravelDescription;