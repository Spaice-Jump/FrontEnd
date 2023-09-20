import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import image404 from '../../assets/img/404-error.png';
import video404 from '../../assets/video/space-cat-error404.mp4';

function Error404() {
	return (
		<div className="error-404">
			<video
				autoPlay
				muted
				loop
				className="video-background"
			>
				<source
					src={video404}
					type="video/mp4"
				/>
			</video>
			<div className="content">
				<h1 className="error-text">
					Ups... Parece que estás perdido en el espacio...
				</h1>
				<img
					src={image404}
					alt="Error 404"
					className="error-image"
				/>
				<br></br>
				<Link
					to="/"
					className="btn btn-primary"
				>
					Volver a Inicio
				</Link>
			</div>
		</div>
	);
}

export default Error404;
