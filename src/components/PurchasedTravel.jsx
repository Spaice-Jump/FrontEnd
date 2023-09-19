import videoBackgroundPurchasedTravel from '../assets/video/video-background-purchased-travel.mp4';
import { useNavigate } from 'react-router-dom';
import './componentTravels.css';

const PurchasedTravel = () => {
	const navigate = useNavigate();
	const handleReturn = () => {
		return navigate('/travels');
	};

	return (
		<div className="purchased-travel">
			<video
				className="video-background-purchased-travel"
				autoPlay
				muted
				loop
			>
				<source
					src={videoBackgroundPurchasedTravel}
					type="video/mp4"
				/>
			</video>
			<div className="icon-purchased">
				<div className="tick-purchased">✔</div>
			</div>
			<h1>¡Enhorabuena, te vas de viaje!</h1>
			<p>La compra del viaje se ha realizado con éxito</p>
			<button onClick={handleReturn}>Seguir navegando</button>
		</div>
	);
};

export default PurchasedTravel;
