const NEWS_API_KEY = 'OtefWbDiwDrGL8T8f88vc60LDULhrhjpbk7HWeaB_FdMNERg'; // Replace with your API key
const NEWS_API_URL = `https://api.currentsapi.services/v1/latest-news?apiKey=${NEWS_API_KEY}`;
const TIPS_API_URL = 'https://api.adviceslip.com/advice'; // Example API for study tips

// Function to fetch and display news
const requestNews = async () => {
    try {
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.news.length === 0) {
            document.getElementById('news-container').innerHTML = '<p>No news available.</p>';
            return;
        }
        let newsHtml = '';
        data.news.forEach(article => {
            newsHtml += `
                <div class="news-item">
                    <h4><a href="${article.url}" target="_blank">${article.title}</a></h4>
                    <p>${article.description || 'No description available'}</p>
                </div>
            `;
        });
        document.getElementById('news-container').innerHTML = newsHtml;
    } catch (err) {
        console.error('Error fetching news:', err);
        document.getElementById('news-container').innerHTML = `<p>Error fetching news: ${err.message}</p>`;
    }
};

// Function to fetch and display study tips
const requestTips = async () => {
    try {
        const response = await fetch(TIPS_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.slip) {
            document.getElementById('tips-container').innerHTML = '<p>No tips available.</p>';
            return;
        }
        const tip = data.slip.advice;
        document.getElementById('tips-container').innerHTML = `<p>${tip}</p>`;
    } catch (err) {
        console.error('Error fetching tips:', err);
        document.getElementById('tips-container').innerHTML = `<p>Error fetching tips: ${err.message}</p>`;
    }
};

// Function to handle adding tasks to the to-do list
const handleTodo = () => {
    const input = document.getElementById('todo-input');
    const task = input.value.trim();
    if (task === '') return;

    const listItem = document.createElement('div');
    listItem.classList.add('task-row');

    const text = document.createElement('input');
    text.type = 'text';
    text.placeholder = 'Please enter task';
    text.value = task;

    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'X';
    btnDelete.addEventListener('click', () => {
        listItem.remove();
        saveTasks();
    });

    listItem.appendChild(text);
    listItem.appendChild(btnDelete);
    document.getElementById('toDoContainer').appendChild(listItem);

    input.value = ''; // Clear the input field
    saveTasks(); // Save the task list
};

// Function to save tasks to local storage
const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll('#toDoContainer .task-row').forEach(row => {
        const task = row.querySelector('input[type="text"]').value;
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to load tasks from local storage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => {
        const listItem = document.createElement('div');
        listItem.classList.add('task-row');

        const text = document.createElement('input');
        text.type = 'text';
        text.placeholder = 'Please enter task';
        text.value = task;

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'X';
        btnDelete.addEventListener('click', () => {
            listItem.remove();
            saveTasks();
        });

        listItem.appendChild(text);
        listItem.appendChild(btnDelete);
        document.getElementById('toDoContainer').appendChild(listItem);
    });
};

// Initialize the extension with data on page load
document.addEventListener("DOMContentLoaded", () => {
    requestNews(); // Fetch news on load
    requestTips(); // Fetch study tips on load
    loadTasks(); // Load tasks on load
});

// Add event listeners
document.getElementById('add-todo').addEventListener('click', handleTodo);
