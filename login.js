document.addEventListener('DOMContentLoaded', () => {
	// Функция для отображения формы входа
	function showLoginForm() {
		document.getElementById('login-in').classList.remove('none')
		document.getElementById('login-in').classList.add('block')
		document.getElementById('login-up').classList.remove('block')
		document.getElementById('login-up').classList.add('none')
	}

	// Функция для отображения формы регистрации
	function showRegisterForm() {
		document.getElementById('login-up').classList.remove('none')
		document.getElementById('login-up').classList.add('block')
		document.getElementById('login-in').classList.remove('block')
		document.getElementById('login-in').classList.add('none')
	}

	// Обработчик события для кнопки "Зарегистрироваться" на странице авторизации
	document.getElementById('sign-up').addEventListener('click', event => {
		event.preventDefault()
		showRegisterForm()
	})

	// Обработчик события для кнопки "Войти"
	document.getElementById('sign-in').addEventListener('click', event => {
		event.preventDefault()
		showLoginForm()
	})

	// Функция для отправки уведомления в консоль
	function sendNotification(message, type) {
		console.log(`${type.toUpperCase()}: ${message}`)
	}

	// Функция для отображения уведомления
	function showNotification(message, type = 'error') {
		const notification = document.getElementById('notification')
		notification.innerText = message
		notification.classList.add(type)
		notification.style.display = 'block'
		setTimeout(() => {
			notification.style.display = 'none'
			notification.classList.remove(type)
		}, 3000) // Уведомление исчезнет через 3 секунды
	}

	// Функция для регистрации нового пользователя
	function register(username, password) {
		// Проверяем, существует ли уже пользователь с таким именем
		if (localStorage.getItem(username)) {
			showNotification('Пользователь с таким именем уже существует!', 'error')
			return
		}

		// Сохраняем пароль пользователя
		localStorage.setItem(username, password)

		// Отправляем уведомление о успешной регистрации
		showNotification('Регистрация прошла успешно!', 'success')

		// Показываем форму входа
		showLoginForm()
	}

	// Функция для входа пользователя
	function login(username, password) {
		// Проверяем, существует ли пользователь с таким именем и паролем
		if (localStorage.getItem(username) === password) {
			// Отправляем уведомление о успешном входе
			showNotification('Вход выполнен успешно!', 'success')
			return true
		} else if (!localStorage.getItem(username)) {
			// Отправляем уведомление о отсутствующем пользователе
			showNotification('Пользователя с таким именем не существует!', 'error')
			return false
		} else {
			// Отправляем уведомление о неправильном логине/пароле
			showNotification(
				'Неправильно введен пароль. Попробуйте еще раз!',
				'error'
			)
			return false
		}
	}

	// Обработчик события для формы регистрации
	document.getElementById('login-up').addEventListener('submit', event => {
		event.preventDefault()

		// Получаем введенное имя пользователя и пароль
		const username = document.getElementById('register-username').value
		const password = document.getElementById('register-password').value

		// Регистрируем пользователя
		register(username, password)
	})

	// Обработчик события для формы входа
	document.getElementById('login-in').addEventListener('submit', event => {
		event.preventDefault()

		// Получаем введенное имя пользователя и пароль
		const username = document.getElementById('login-username').value
		const password = document.getElementById('login-password').value

		// Входим под пользователем
		if (login(username, password)) {
			// Перенаправляем на страницу планировщика задач
			window.location.href = 'task-planner.html'
		}
	})
})
