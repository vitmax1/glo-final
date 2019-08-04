	//////// send AJAX form
	const sendForm = () => {

		const errorMessage = 'Что-то пошло не так...',
			loadMessage = 'Загрузка...',
			successMessage = 'Спасибо! Мы скоро с вами свяжемся';

		const form = document.querySelectorAll('form');

		const statusMessage = document.createElement('div');
		statusMessage.style.cssText = 'font-size: 2rem; color: white;';


		form.forEach((item) => {
			item.addEventListener('submit', (event) => {
				event.preventDefault();
				item.appendChild(statusMessage);

				const formData = new FormData(item);
				let body = {};
				formData.forEach((val, key) => {
					body[key] = val;
				});

				statusMessage.textContent = loadMessage;

				postData(body).then((response) => {
						console.log(response);
						if (response.status !== 200) {
							throw new Error('status network not 200.');
						}
						statusMessage.textContent = successMessage;
					})
					.catch((error) => {
						statusMessage.textContent = errorMessage;
						console.error(error);
					});
			});
		});

		const postData = (body) => {

			return fetch('./server.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});

		};

	};

	export default sendForm;