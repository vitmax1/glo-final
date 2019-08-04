	///// menu
	const toggleMenu = () => {

		const body = document.body,
			menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		body.addEventListener('click', (event) => {
			let target = event.target;
			if (target.classList.contains('close-btn')) {
				handlerMenu();
			}

			target = target.closest('.menu');

			if (target) {
				handlerMenu();
			} else if (!target) {
				menu.classList.remove('active-menu');
			}
		});

	};

	export default toggleMenu;