import { Link } from 'react-router-dom';


const UserPanel = ({user,origin}) => {
    


    return (
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="container-fluid">
                {origin === "property" ? 
                <>
                    <Link to={`/travel-user/${user}`} className="text-decoration-none fs-5 fw-bold ">  Travels on Property </Link>
                    <Link to={`/travel-favorite`} className="text-decoration-none"> Favorite Travels </Link>
                </>
                 :
                 <>
                    <Link to={`/travel-user/${user}`} className="text-decoration-none"> Travels on Property </Link>
                    <Link to={`/travel-favorite`} className="text-decoration-none fs-5 fw-bold"> Favorite Travels </Link>
                </>}



                
            </div>

        </div>
    );
}


export default UserPanel;