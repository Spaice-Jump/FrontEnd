import { useParams } from 'react-router-dom';
import Loading from '../utils/spinner/Loading';
import './css/travelUser.css';
import { useEffect, useState } from 'react';
import { getTravelUser } from '../../api/serviceTravels';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserName } from '../../redux/selectors';
import UserPanel from '../utils/UserPanel';

const TravelUser = () => {
  const { user } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [travelsData, setTravelsData] = useState([]);
  const userName = useSelector(getUserName);

  useEffect(() => {
    const fetchData = async () => {
      const data = { user };
      try {
        const travelsData = await getTravelUser(data, {
          headers: { 'content-type': 'multipart/form-data' },
        });
        if (travelsData?.status === 400) {
          setError(travelsData.message);
        }
        if (travelsData?.status === 'OK') {
          setTravelsData(travelsData.result);
        }
        setIsLoading(true);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [user]);

  const resetError = () => {
    setError(null);
  };

  return (
    <>
      {isLoading ? (
        <section className="travels-first-container">
          <div className="container travels-container">
            <div className="row"></div>
            <h1>Travels to {user}</h1>
            {userName === user ? (
                <UserPanel user={user} origin={"property"}/>
            ) : null}
            {travelsData ? (
              travelsData.map(travel => (
                <div
                  key={travel._id}
                  className="col-md-3 col-sm-6 travels-columns"
                >
                  <div className="product-grid">
                    {travel.photo ? (
                      <div className="product-image">
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${travel.photo}`}
                          alt={travel.topic}
                        />
                      </div>
                    ) : null}
                    <div className="product-content">
                      <h3 className="title">
                        <Link to={`/travel/${travel._id}`}>{travel.topic}</Link>
                      </h3>
                      <p className="text-travels-ads">
                        Remarks: {travel.remarks}
                      </p>
                      <div className="price">
                        <span>Price: {travel.price}€</span>
                        {/* travel.discount && <span> {travel.originalPrice}€</span> */}
                      </div>
                      {travel.forSale ? (
                        <p className="text-travels-ads">Sale</p>
                      ) : (
                        <p className="text-travels-ads">Search</p>
                      )}
                      <p className="text-travels-ads">
                        Origin: {travel.origin}
                      </p>
                      <p className="text-travels-ads">
                        Destination: {travel.destination}
                      </p>
                     
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No travel data available.</p>
            )}
          </div>
        </section>
      ) : (
        <>
          <Loading />
        </>
      )}

      {!error ? (
        <br />
      ) : (
        <div
          className="error"
          onClick={resetError}
        >
          <p data-testid="error"> {error}</p>
        </div>
      )}
    </>
  );
};

export default TravelUser;
