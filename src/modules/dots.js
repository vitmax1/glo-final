	/////// dots add
	const addDots = () => {
		let slideImg = document.querySelectorAll('.portfolio-item'),
			dotImg = document.querySelector('.portfolio-dots');

		slideImg.forEach(() => {
			let newDot = document.createElement('li');
			newDot.className = 'dot';
			dotImg.appendChild(newDot);
		});

	};

	export default addDots;