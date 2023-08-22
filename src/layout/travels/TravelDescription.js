import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTravel } from '../../api/serviceTravels';
import ExperienceSection from '../home/components/ExperienceSection';
import { useSelector } from 'react-redux';
import { getIsLogged, getUserId } from '../../redux/selectors';

const TravelDescription = () => {
	const { id } = useParams();
	const [travel, setTravel] = useState(null);
	const isLogged = useSelector(getIsLogged);
	const userId = useSelector(getUserId);

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
						<button className="btn btn-primary">Edit</button>
					) : null}
				</div>
			</div>
		</>
	);
};

export default TravelDescription;
