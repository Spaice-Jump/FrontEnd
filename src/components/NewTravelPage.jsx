import { createTravel, fetchLocations } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getLocations, getUserId } from "../redux/selectors";
import { useState, useEffect } from "react";
import videoBackground from "../assets/video/new-travel-background.mp4";
import "./NewTravelPage.css";

function NewTravelPage() {
  const userId = useSelector(getUserId);

  const [travel, setTravel] = useState({
    topic: "",
    origin: "Earth",
    destination: "Earth",
    remarks: "",
    price: null,
    forSale: true,
    photo: null,
    userId: userId,
  });

  const locations = useSelector(getLocations);
  const dispatch = useDispatch();
  useEffect(() => {
    if (locations.length !== 0) {
      return;
    }
    dispatch(fetchLocations());
  }, [dispatch, locations]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createTravel(travel));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "photo") {
      setTravel({ ...travel, [name]: event.target.files[0] });
      return;
    }
    setTravel({ ...travel, [name]: value });
  };

  const isDisabled =
    !travel.topic || !travel.origin || !travel.destination || !travel.price;

  return (
    <section id="new-travel" className="masthead new-travel-page">
      <video className="video-background" autoPlay muted loop>
        <source src={videoBackground} type="video/mp4" />
        Tu navegador no admite la reproducción de videos.
      </video>
      <div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center new-travel-all-form">
        <div className="text-center">
          <h1 className="mx-auto my-0 text-uppercase new-travel-title">
            Crear nuevo viaje espacial
          </h1>
          <form onSubmit={handleSubmit} className="new-travel-form">
            <label htmlFor="topic">Título del viaje</label>
            <input
              value={travel.topic}
              onChange={handleChange}
              type="text"
              name="topic"
              id="topic"
            />
            <label htmlFor="origin" className="origin-label">
              Origen
            </label>
            <select
              value={travel.origin}
              onChange={handleChange}
              type="string"
              name="origin"
              id="origin"
              required
            >
              {locations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
            <label htmlFor="destination" className="destination-label">
              Destino
            </label>
            <select
              value={travel.destination}
              onChange={handleChange}
              type="string"
              name="destination"
              id="destination"
              required
            >
              {locations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="price">Precio</label>
            <input
              value={travel.price}
              onChange={handleChange}
              type="number"
              name="price"
              id="price"
              required
            />
            <label htmlFor="remarks">Comentarios</label>
            <input
              value={travel.remarks}
              onChange={handleChange}
              type="text"
              name="remarks"
              id="remarks"
            />
            <label htmlFor="forSale">¿Qué quieres?</label>
            <select
              value={travel.forSale}
              onChange={handleChange}
              name="forSale"
              id="forSale"
              required
            >
              <option value={true}>Publicar un viaje</option>
              <option value={false}>Demandar un viaje</option>
            </select>
            <label htmlFor="photo">Subir una fotografía</label>
            <input
              onChange={handleChange}
              type="file"
              name="photo"
              id="photo"
            />
            <button type="submit" disabled={isDisabled}>
              Crear viaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NewTravelPage;
