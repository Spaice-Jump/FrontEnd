import { Navigate, useLocation } from 'react-router-dom';
import { getIsLogged } from '../redux/selectors';
import { useSelector } from 'react-redux';

const RequireAuth = ({ children }) => {
	const isLogged = useSelector(getIsLogged);
	const location = useLocation();

	if (!isLogged) {
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
			/>
		);
	}
	return children;
};

export default RequireAuth;
