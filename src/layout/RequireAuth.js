// import { useSelector } from 'react-redux';
// import { getIsLogged, getUserId } from '../redux/selectors';
// import { Navigate, useLocation } from 'react-router-dom';
// import storage from './utils/storage';
// import { getMe } from '../api/serviceAuth';

// const RequireAuth = async ({ children })  => {
//   const isLogged = useSelector(getIsLogged);
//   const userId = useSelector(getUserId);
//   const location = useLocation();

//   if (!isLogged) {
//     return (
//       <Navigate
//         to="/login"
//         state={{ from: location }}
//       />
//     );
//   } else {
//     if (userId === undefined) {
//       const accessToken = storage.get('auth');

//       if (accessToken === null) {

//         return (
//             <Navigate
//               to="/login"
//               state={{ from: location }}
//             />
//           );
//       } else {
//         try {
//             const newUserId = await getMe(accessToken)    
//         } catch (error) {
            
//         }
        
//       }
//     }
//   }

//   return children;
// };

// export default RequireAuth;


import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'; // Importa useEffect
import { getIsLogged, getUserId } from '../redux/selectors';
import { Navigate, useLocation } from 'react-router-dom';
import storage from './utils/storage';
import { getMe } from '../api/serviceAuth';
import { authLoginSuccess } from '../redux/actions';
// ...

const RequireAuth = ({ children }) => {
  const isLogged = useSelector(getIsLogged);
  const userId = useSelector(getUserId);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        const accessToken = storage.get('auth');
        if (accessToken !== null) {
          try {
            const newUserId = await getMe(accessToken);
            console.log(newUserId)
            dispatch(authLoginSuccess(newUserId));
            
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
    };

    fetchData();
  }, [userId]);

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
