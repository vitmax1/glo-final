/////// data-img
const dataImg = () => {

	const commandPhoto = document.querySelectorAll('.command__photo');

	commandPhoto.forEach(elem => {

		let ourPhotos;

		elem.addEventListener('mouseenter', (event) => {
			ourPhotos = event.target.src; //в неё запишем наш src

			event.target.src = event.target.dataset.img; //а далее - переназначим в пользу dataset.img
		});

		elem.addEventListener('mouseleave', (event) => {
			event.target.src = ourPhotos;
		});

	});

};

export default dataImg;

