import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const UserPanel = ({user,origin}) => {
    const [classProperty, setClassProperty] = useState("text-decoration-none m-3");
    const [classFavorite, setClassFavorite] = useState("text-decoration-none m-3");
    const [classBuy, setClassBuy] = useState("text-decoration-none m-3");

    useEffect(() => {
        switch (origin) {
          case 'property':
            setClassProperty('text-decoration-none m-3 fs-5 fw-bold ');
            break;
          case 'favorite':
            setClassFavorite('text-decoration-none m-3 fs-5 fw-bold ');
            break;

          case 'buy':
            setClassBuy('text-decoration-none m-3 fs-5 fw-bold ');
            break;

          default:
            break;
        }
    }, [origin])

    

    return (
        <div className="mt-3 pb-3 mb-3 d-flex">
            <div className="container-fluid">

            <Link to={`/travel-user/${user}`} className={classProperty}>  Travels on Property </Link>
            <Link to={`/travel-favorite`} className={classFavorite}> Favorite Travels </Link>
            <Link to={`/travel-buy`} className={classBuy}> Purchased Travels </Link>
                
            </div>
        </div>
    );
}


export default UserPanel;