import { useNavigate } from "react-router-dom";

const PurchasedTravel = () => {
  const navigate = useNavigate();
  const handleReturn = () => {
    return navigate('/travels');
  }
  
  return (
    <div className="purchased-travel">
      <h1>¡ Enhorabuena !</h1>
      <p>La compra del viaje se ha realizado con éxito</p>
      <button onClick={handleReturn}>Seguir navegando</button>
    </div>)
}

export default PurchasedTravel;
