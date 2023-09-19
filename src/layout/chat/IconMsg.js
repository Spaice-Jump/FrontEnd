import { Link } from 'react-router-dom';

function IconMsg({ travelId }) {
	return (
		<div className="icon-msg">
			<Link to={`/travelChat/${travelId}`}>
				<button className="icon-msg__btn">
					<span>✉️</span>
				</button>
			</Link>
		</div>
	);
}

export default IconMsg;
