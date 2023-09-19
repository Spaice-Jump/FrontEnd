import video404 from '../../assets/video/space-cat-error404.mp4';
import image404 from '../../assets/img/404-error.png';
import React, { useEffect } from 'react';

function Error404() {
	useEffect(() => {
		function removeElementsByClass(className) {
			const elements = document.getElementsByClassName(className);
			while (elements.length > 0) {
				elements[0].parentNode.removeChild(elements[0]);
			}
		}

		removeElementsByClass('contact-section bg-black');
		removeElementsByClass('navbar navbar-expand-lg navbar-light fixed-top');
		removeElementsByClass('footer bg-black small text-center text-white-50');
	}, []);

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
					Parece que estás perdido en el espacio...
				</h1>
				<img
					src={image404}
					alt="Error 404"
					className="error-image"
				/>
			</div>
		</div>
	);
}

export default Error404;
