import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTravel } from '../../api/serviceTravels';
import ExperienceSection from '../home/components/ExperienceSection';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogged, getUserId, getTravelById } from '../../redux/selectors';
import { deleteTravel } from '../../redux/actions';

const TravelDescription = () => {
	const { id } = useParams();
	const [travel, setTravel] = useState(null);
	const isLogged = useSelector(getIsLogged);
	const userId = useSelector(getUserId);
	const travelById = useSelector(getTravelById(id));
	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	const handleDelete = () => {
		dispatch(deleteTravel(id));
	};

	return (
		<>
			<ExperienceSection />
			<div className="travel-details">
				<h2>{travel.topic}</h2>
				{travel.photo ? (
					<div className="product-image">
						<img
							src={`${process.env.REACT_APP_API_BASE_URL}uploads/${travel.photo}`}
							alt={travel.topic}
						/>
					</div>
				) : null}
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
							<button
								onClick={handleEdit}
								className="btn btn-primary"
							>
								Editar viaje
							</button>
							<button
								onClick={handleDelete}
								className="btn btn-primary"
							>
								Borrar viaje
							</button>
						</>
					) : null}
				</div>
			</div>
		</>
	);
};

export default TravelDescription;
