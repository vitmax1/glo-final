	//////// валидация телефона и полей имя, сообщение
	const validNamePhone = () => {
		const inputPhone = document.querySelectorAll('.form-phone');

		document.body.addEventListener('input', (event) => {
			if (event.target.matches('.form-name, #form2-name, .mess')) {
				event.target.value = event.target.value.replace(/[^а-яё\s]/gi, '');
			}
		});

		inputPhone.forEach((element) => {

			element.addEventListener('input', (item) => {
				item.target.value = item.target.value.replace(/[^\+\d]|(.)\+/g, '');
			});

		});

	};

	export default validNamePhone;