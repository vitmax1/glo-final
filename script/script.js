window.addEventListener('DOMContentLoaded', function () {
	'use strict';

	// таймер

	const countTimer = (deadline) => {

		let timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');


		const getTimeRemaining = () => {
			let dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			if (timeRemaining <= 0) {
				seconds = `00`;
				minutes = `00`;
				hours = `00`;
			}
			return {
				timeRemaining,
				hours,
				minutes,
				seconds
			};

		}

		const updateClock = () => {
			let timer = getTimeRemaining();

			timerHours.textContent = timer.hours;
			timerMinutes.textContent = timer.minutes;
			timerSeconds.textContent = timer.seconds;

			if (timer.timeRemaining > 0) {
				setInterval(() => {
					updateClock();
				}, 1000);
			} else if (timer.timeRemaining <= 0) {
				clearInterval(timer);
			}

			timerHours.innerHTML = (`0` + timer.hours).slice(-2);
			timerMinutes.innerHTML = (`0` + timer.minutes).slice(-2);
			timerSeconds.innerHTML = (`0` + timer.seconds).slice(-2);

		}

		updateClock();

	}
	countTimer('05 august 2019');

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
	toggleMenu();

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
	togglePopUp();

	/////// tabs
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = (index) => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		}

		tabHeader.addEventListener('click', (enent) => {

			let target = event.target;
			target = target.closest('.service-header-tab');

			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}


		});
	};
	tabs();

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
	addDots();

	/////// slider
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			dot = document.querySelectorAll('.dot'),
			slider = document.querySelector('.portfolio-content');

		let currentSlide = 0,
			interval;

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 3000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', (event) => {
			event.preventDefault();

			let target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');

		});

		slider.addEventListener('mouseover', (event) => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', (event) => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				startSlide();
			}
		});

		startSlide();
	};
	slider();

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
	dataImg();	

	/////// validate-calc
	const validNumber = () => {
		const calcItem = document.querySelectorAll('.calc-item');

		calcItem.forEach((element) => {
			if (element.matches('select')) {
				return; //

			} else {
				element.addEventListener('input', (item) => {
					item.target.value = item.target.value.replace(/\D/g, '');
				});
			}
		});

	};
	validNumber();

	//////// calculator
	const calc = (price = 100) => {

		const calcBlock = document.querySelector('.calc-block'),
				  calcType = document.querySelector('.calc-type'),
				  calcSquare = document.querySelector('.calc-square'),
				  calcDay = document.querySelector('.calc-day'),
				  calcCount = document.querySelector('.calc-count'),
					totalValue = document.getElementById('total');

					const countSum = () => {
						let total = 0,
						countValue = 1,
						dayValue = 1;

						const typeValue = calcType.options[calcType.selectedIndex].value,
									squareValue = +calcSquare.value;

									if (calcCount.value > 1){
										countValue += (calcCount.value - 1) / 10;
									}

									if (calcDay.value && calcDay.value < 5) {
										dayValue *= 2;
									} else if (calcDay.value && calcDay.value < 10) {
										dayValue *= 1.5;
									}
									
									if (typeValue && squareValue){
										total = Math.round(price * typeValue * squareValue * countValue * dayValue);
									} 

									totalValue.textContent = total;
					};

					calcBlock.addEventListener('change', (event) => {
						const target = event.target;
						// if (target.matches('.calc-type') || target.matches('.calc-square') ||
						// target.matches('.calc-day') || target.matches('.calc-count')){
						// 	console.log(1);
						// }
						if (target.matches('select') || target.matches('input')){
							countSum();	
						}
					});
					
	};
	calc(100);

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
	validNamePhone();

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
	sendForm();

});