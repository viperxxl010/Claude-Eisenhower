// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// App state
let tasks = [];
let currentView = 'matrix';
let editingTaskId = null;

// DOM elements
const matrixView = document.getElementById('matrixView');
const listView = document.getElementById('listView');
const viewToggle = document.getElementById('viewToggle');
const toggleText = document.getElementById('toggleText');
const toggleIcon = document.getElementById('toggleIcon');
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.querySelector('.close-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const addTaskBtns = document.querySelectorAll('.add-task-btn');
const navBtns = document.querySelectorAll('.nav-btn');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderAllViews();
    attachEventListeners();
});

// Event listeners
function attachEventListeners() {
    // Desktop view toggle
    if (viewToggle) {
        viewToggle.addEventListener('click', toggleView);
    }

    // Mobile navigation
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            switchView(view);
        });
    });

    // Add task buttons
    addTaskBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const quadrant = btn.dataset.quadrant;
            openModal(quadrant);
        });
    });

    // Modal controls
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    taskModal.addEventListener('click', (e) => {
        if (e.target === taskModal) closeModal();
    });

    // Task form submission
    taskForm.addEventListener('submit', handleTaskSubmit);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && taskModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// View switching
function toggleView() {
    currentView = currentView === 'matrix' ? 'list' : 'matrix';
    updateView();
}

function switchView(view) {
    currentView = view;
    updateView();
}

function updateView() {
    if (currentView === 'matrix') {
        matrixView.classList.add('active');
        listView.classList.remove('active');
        if (toggleText) toggleText.textContent = 'Toon Takenlijst';
        if (toggleIcon) toggleIcon.textContent = '📋';
    } else {
        matrixView.classList.remove('active');
        listView.classList.add('active');
        if (toggleText) toggleText.textContent = 'Toon Matrix';
        if (toggleIcon) toggleIcon.textContent = '▦';
    }

    // Update mobile nav
    navBtns.forEach(btn => {
        if (btn.dataset.view === currentView) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderAllViews();
}

// Modal functions
function openModal(quadrant, taskId = null) {
    editingTaskId = taskId;

    if (taskId) {
        // Edit mode
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            modalTitle.textContent = 'Taak Bewerken';
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDescription').value = task.description || '';
            document.getElementById('taskDuration').value = task.duration || '';
            document.getElementById('taskQuadrant').value = task.quadrant;
        }
    } else {
        // Add mode
        modalTitle.textContent = 'Nieuwe Taak';
        taskForm.reset();
        document.getElementById('taskQuadrant').value = quadrant;
    }

    taskModal.classList.add('active');
    document.getElementById('taskTitle').focus();
}

function closeModal() {
    taskModal.classList.remove('active');
    taskForm.reset();
    editingTaskId = null;
}

function handleTaskSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const duration = document.getElementById('taskDuration').value.trim();
    const quadrant = document.getElementById('taskQuadrant').value;

    if (!title) return;

    if (editingTaskId) {
        // Update existing task
        const taskIndex = tasks.findIndex(t => t.id === editingTaskId);
        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                title,
                description,
                duration,
                quadrant
            };
        }
    } else {
        // Create new task
        const newTask = {
            id: generateId(),
            title,
            description,
            duration,
            quadrant,
            completed: false,
            createdAt: Date.now()
        };
        tasks.push(newTask);
    }

    saveTasks();
    renderAllViews();
    closeModal();
}

// Task rendering
function renderAllViews() {
    renderMatrixView();
    renderListView();
}

function renderMatrixView() {
    const quadrants = ['q1', 'q2', 'q3', 'q4'];

    quadrants.forEach(quadrant => {
        const container = matrixView.querySelector(`.tasks-container[data-quadrant="${quadrant}"]`);
        if (!container) return;

        container.innerHTML = '';

        const quadrantTasks = tasks.filter(t => t.quadrant === quadrant);

        quadrantTasks.forEach(task => {
            const taskCard = createTaskCard(task);
            container.appendChild(taskCard);
        });
    });
}

function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = `task-card ${task.completed ? 'completed' : ''}`;
    card.draggable = true;
    card.dataset.taskId = task.id;

    const title = document.createElement('div');
    title.className = 'task-title';
    title.textContent = task.title;
    title.addEventListener('click', () => openModal(task.quadrant, task.id));

    card.appendChild(title);

    if (task.description) {
        const description = document.createElement('div');
        description.className = 'task-description';
        description.textContent = task.description;
        card.appendChild(description);
    }

    if (task.duration) {
        const duration = document.createElement('div');
        duration.className = 'task-duration';
        duration.textContent = task.duration;
        card.appendChild(duration);
    }

    // Drag events
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);

    return card;
}

function renderListView() {
    const quadrants = ['q1', 'q2', 'q3', 'q4'];

    quadrants.forEach(quadrant => {
        const container = listView.querySelector(`.list-tasks[data-quadrant="${quadrant}"]`);
        if (!container) return;

        container.innerHTML = '';

        // Sort tasks by creation time within each quadrant
        const quadrantTasks = tasks
            .filter(t => t.quadrant === quadrant)
            .sort((a, b) => a.createdAt - b.createdAt);

        quadrantTasks.forEach(task => {
            const taskItem = createListTaskItem(task);
            container.appendChild(taskItem);
        });
    });
}

function createListTaskItem(task) {
    const item = document.createElement('div');
    item.className = `list-task-item ${task.completed ? 'completed' : ''}`;
    item.dataset.taskId = task.id;

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', (e) => {
        toggleTaskCompletion(task.id, e.target.checked);
    });

    // Content container
    const content = document.createElement('div');
    content.className = 'task-content';

    const title = document.createElement('div');
    title.className = 'list-task-title';
    title.textContent = task.title;
    title.addEventListener('click', () => openModal(task.quadrant, task.id));

    content.appendChild(title);

    if (task.description) {
        const description = document.createElement('div');
        description.className = 'list-task-description';
        description.textContent = task.description;
        content.appendChild(description);
    }

    if (task.duration) {
        const duration = document.createElement('div');
        duration.className = 'list-task-duration';
        duration.textContent = task.duration;
        content.appendChild(duration);
    }

    item.appendChild(checkbox);
    item.appendChild(content);

    return item;
}

// Task completion
function toggleTaskCompletion(taskId, completed) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
        saveTasks();
        renderAllViews();
    }
}

// Drag and drop
let draggedTask = null;

function handleDragStart(e) {
    draggedTask = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');

    // Remove drag-over class from all containers
    document.querySelectorAll('.tasks-container').forEach(container => {
        container.classList.remove('drag-over');
    });
}

// Attach drag listeners to task containers
document.querySelectorAll('.tasks-container').forEach(container => {
    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('drop', handleDrop);
    container.addEventListener('dragenter', handleDragEnter);
    container.addEventListener('dragleave', handleDragLeave);
});

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (e.target.classList.contains('tasks-container')) {
        e.target.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    if (e.target.classList.contains('tasks-container')) {
        e.target.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    const container = e.target.closest('.tasks-container');
    if (!container || !draggedTask) return;

    const newQuadrant = container.dataset.quadrant;
    const taskId = draggedTask.dataset.taskId;

    // Update task quadrant
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].quadrant = newQuadrant;
        saveTasks();
        renderAllViews();
    }

    draggedTask = null;
    return false;
}

// Local storage
function saveTasks() {
    try {
        localStorage.setItem('eisenhower_tasks', JSON.stringify(tasks));
    } catch (e) {
        console.error('Error saving tasks:', e);
    }
}

function loadTasks() {
    try {
        const stored = localStorage.getItem('eisenhower_tasks');
        if (stored) {
            tasks = JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading tasks:', e);
        tasks = [];
    }
}

// Utility functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
