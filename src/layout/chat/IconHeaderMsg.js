import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserId } from '../../redux/selectors';
import { useEffect, useState } from 'react';
import { setReadChat } from '../../api/serviceChat';

function IconHeaderMsg() {
  const userId = useSelector(getUserId);
  const [travelId, setTravelId] = useState('00');
  const [isMsg, setIsMsg] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = { userId };
        const result = await setReadChat(data);
        console.log('result', result);

        if (result.result.length === 0) {
        
          setIsMsg(false);
        } else {
   
          setIsMsg(true);
        }
      } catch (error) {}
    };
    
    fetchData();


  }, [travelId, userId]);


  const handelButton = () => {
    setIsMsg(false);

    setTimeout(() => {
        return navigate(`/travelChat/${travelId}`);
      }, 3000);
   
  }
  




  return (
    <div className="icon-msg">
      {isMsg ? (
          <button
          type="button"
          onClick={handelButton}
        
        >
        {/* <Link to={`/travelChat/${travelId}`}> */}
        
            <span>🔔</span>
        {/* </Link> */}
          </button>
      ) : null}
    </div>
  );
}

export default IconHeaderMsg;






