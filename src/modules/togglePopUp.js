	/////// popup
	const togglePopUp = () => {

		let popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = document.querySelector('.popup-content'),

			count = 0,
			flyAnimate;

		const popAnimate = () => {
			flyAnimate = requestAnimationFrame(popAnimate);

			if (count < 30) {
				count += 1;
				popupContent.style = `transform: translateY(${count}px)`;
			} else {
				cancelAnimationFrame(flyAnimate);
			}
		};

		const getSettings = () => {
			if (screen.width > 760) {
				popup.style.display = 'block';
				popAnimate();
			} else {
				popup.style.display = 'block';
			}
		};

		popupBtn.forEach((item) => {
			item.addEventListener('click', () => {
				getSettings();
			});
		}); //при клике на "оставить заявку", вызываем getSettings, проверяем ширину экрана,
		//и в зависимости от неё уже выполняется popAnimate


		popup.addEventListener('click', (event) => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
				count = 0;
			} else {
				target = target.closest('.popup-content');
				if (!target) {
					popup.style.display = 'none';
				}
			}

		});

	};

	export default togglePopUp;