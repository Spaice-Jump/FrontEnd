import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmail, getTravelById, getUserId, getUserName } from '../../redux/selectors';
import { setTravelFavorite } from '../../api/serviceTravels';
import { favoriteChange } from '../../redux/actions';
import useReturnUser from './returnUser'; // Importa tu hook personalizado

function FavoriteHeart({ travelId, checked }) {
  const [isFavorite, setIsFavorite] = useState(checked);
  const userId = useSelector(getUserId);
  const travel = useSelector(getTravelById(travelId));
  const dispatch = useDispatch();

  const email = useSelector(getEmail);
  const userName = useSelector(getUserName);



  

  const handleFavoriteChange = async newFavoriteState => {
    try {
      await setTravelFavorite(travelId, newFavoriteState);
      setIsFavorite(newFavoriteState); // Actualiza el estado local

      const user = {userId, email, userName}
      dispatch(favoriteChange(newFavoriteState, travel, travelId, userId, user));
    } catch (error) {
      console.error('Error al cambiar el estado favorito:', error);
    }
  };

  useEffect(() => {
    // No necesitas pasar un argumento aquí, solo cambia el estado local
  }, [isFavorite]);

  const toggleFavorite = () => {
    const newFavoriteState = !isFavorite;
    handleFavoriteChange(newFavoriteState);
  };

 

  return (
    <div>
      <span onClick={toggleFavorite}>{isFavorite ? '❤️' : '🤍'}</span>
    </div>
  );
}

export default FavoriteHeart;
