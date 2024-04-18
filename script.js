let tasks = []

let categories = [
	{
		title: 'Срочное',
	},
	{
		title: 'Работа',
	},
	{
		title: 'Образование',
	},
	{
		title: 'Личное',
	},
	{
		title: 'Домашние дела',
	},
	{
		title: 'Хобби и отдых',
	},
	{
		title: 'Локации и путешествия',
	},
	{
		title: 'Спорт',
	},
]

// Функция сохранения задач в локальное хранилище
const saveLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Функция получения задач из локального хранилища
const getLocal = () => {
	const tasksLocal = JSON.parse(localStorage.getItem('tasks'))
	if (tasksLocal) {
		tasks = tasksLocal
	}
}

// Функция переключения экранов
const toggleScreen = () => {
	screenWrapper.classList.toggle('show-category')
}

// Функция обновления счетчиков задач
const updateTotals = () => {
	// Фильтрация задач по выбранной категории
	const categoryTasks = tasks.filter(
		task => task.category.toLowerCase() === selectedCategory.title.toLowerCase()
	)
	// Обновление счетчика задач в выбранной категории и общего числа задач
	numTasks.innerHTML = `Кол-во задач: ${categoryTasks.length}`
	totalTasks.innerHTML = tasks.length
}

// Функция рендеринга категорий
const renderCategories = () => {
	// Очистка контейнера категорий
	categoriesContainer.innerHTML = ''
	// Проход по каждой категории
	categories.forEach(category => {
		// Фильтрация задач по категории
		const categoryTasks = tasks.filter(
			task => task.category.toLowerCase() === category.title.toLowerCase()
		)
		// Создание DOM-элемента для категории и добавление обработчика событий
		const div = document.createElement('div')
		div.classList.add('category')
		div.addEventListener('click', () => {
			// Переключение экранов
			screenWrapper.classList.toggle('show-category')
			selectedCategory = category
			// Обновление счетчиков задач и рендеринг задач для выбранной категории
			updateTotals()
			categoryTitle.innerHTML = category.title
			renderTasks()
		})
		// Добавление содержимого в DOM-элемент категории
		div.innerHTML = `
            <div class="content">
                <h1>${category.title}</h1>
                <p>Задач: ${categoryTasks.length}</p>
            </div>
            <div class="options">
                <div class="toggle-btn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                        />
                    </svg>
                </div>
            </div>
        `
		// Добавление DOM-элемента категории в контейнер
		categoriesContainer.appendChild(div)
	})
}

// Функция рендеринга задач
const renderTasks = () => {
	// Очистка контейнера задач
	tasksContainer.innerHTML = ''
	// Фильтрация задач по выбранной категории
	const categoryTasks = tasks.filter(
		task => task.category.toLowerCase() === selectedCategory.title.toLowerCase()
	)
	// Проверка, есть ли задачи в выбранной категории
	if (categoryTasks.length === 0) {
		tasksContainer.innerHTML = `<p class="no-tasks">Задачи отсутствуют</p>`
	} else {
		// Рендеринг каждой задачи
		categoryTasks.forEach(task => {
			// Создание DOM-элемента для задачи и добавление обработчиков событий
			const div = document.createElement('div')
			div.classList.add('task-wrapper')
			const label = document.createElement('label')
			label.classList.add('task')
			label.setAttribute('for', task.id)
			const checkbox = document.createElement('input')
			checkbox.type = 'checkbox'
			checkbox.id = task.id
			checkbox.checked = task.completed
			checkbox.addEventListener('change', () => {
				// Изменение состояния задачи при изменении чекбокса
				const index = tasks.findIndex(t => t.id === task.id)
				tasks[index].completed = !tasks[index].completed
				saveLocal()
			})
			// Добавление содержимого в DOM-элемент задачи
			div.innerHTML = `
                <div class="delete">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5
            `
			label.innerHTML = `
                <span class="checkmark">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                        />
                    </svg>
                </span>
                <p>${task.task}</p>
            `
			label.prepend(checkbox)
			div.prepend(label)
			tasksContainer.appendChild(div)
			// Добавление обработчика события для удаления задачи
			const deleteBtn = div.querySelector('.delete')
			deleteBtn.addEventListener('click', () => {
				const index = tasks.findIndex(t => t.id === task.id)
				tasks.splice(index, 1)
				saveLocal()
				renderTasks()
			})
		})

		// Рендеринг категорий
		renderCategories()
		// Обновление счетчиков задач
		updateTotals()
	}
}

// Функция переключения формы добавления задачи
const toggleAddTaskForm = () => {
	addTaskWrapper.classList.toggle('active')
	blackBackdrop.classList.toggle('active')
	addTaskBtn.classList.toggle('active')
}

// Функция добавления задачи
const addTask = e => {
	e.preventDefault()
	const task = taskInput.value
	const category = categorySelect.value
	if (task === '') {
		alert('Please enter a task')
	} else {
		// Проверка наличия задачи в хранилище
		const existingTask = tasks.find(
			t =>
				t.task.toLowerCase() === task.toLowerCase() &&
				t.category.toLowerCase() === category.toLowerCase()
		)
		if (existingTask) {
			alert('This task already exists!')
		} else {
			// Создание новой задачи
			const newTask = {
				id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1, // Генерация уникального id
				task,
				category,
				completed: false,
			}
			taskInput.value = ''
			tasks.push(newTask)
			saveLocal()
			toggleAddTaskForm()
			renderTasks()
		}
	}
}

// Инициализация переменных и DOM-элементов
let selectedCategory = categories[0]
const categoriesContainer = document.querySelector('.categories')
const screenWrapper = document.querySelector('.wrapper')
const menuBtn = document.querySelector('.menu-btn')
const backBtn = document.querySelector('.back-btn')
const tasksContainer = document.querySelector('.tasks')
const numTasks = document.getElementById('num-tasks')
const categoryTitle = document.getElementById('category-title')
const categorySelect = document.getElementById('category-select')
const addTaskWrapper = document.querySelector('.add-task')
const addTaskBtn = document.querySelector('.add-task-btn')
const taskInput = document.getElementById('task-input')
const blackBackdrop = document.querySelector('.black-backdrop')
const addBtn = document.querySelector('.add-btn')
const cancelBtn = document.querySelector('.cancel-btn')
const totalTasks = document.getElementById('total-tasks')

// Присоединение обработчиков событий
menuBtn.addEventListener('click', toggleScreen)
backBtn.addEventListener('click', toggleScreen)
addTaskBtn.addEventListener('click', toggleAddTaskForm)
blackBackdrop.addEventListener('click', toggleAddTaskForm)
addBtn.addEventListener('click', addTask)
cancelBtn.addEventListener('click', toggleAddTaskForm)

// Добавление опций в выпадающий список категорий
categories.forEach(category => {
	const option = document.createElement('option')
	option.value = category.title.toLowerCase()
	option.textContent = category.title
	categorySelect.appendChild(option)
})

// Отображение начального состояния
getLocal()
renderTasks()
