
    const apiUrl = 'http://localhost:3000/tasks'; 

    const taskList = document.getElementById('taskList');
    const addTaskForm = document.getElementById('addTaskForm');
    const editTaskModal = document.getElementById('editTaskModal');
    const editTaskForm = document.getElementById('editTaskForm');
    const closeModalButton = editTaskModal.querySelector('.close-button');

    // --- Fetch and Display Tasks ---
    const fetchTasks = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const tasks = await response.json();
            displayTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            taskList.innerHTML = '<li>Error loading tasks. Please check the console.</li>';
        }
    };

    const displayTasks = (tasks) => {
        taskList.innerHTML = ''; 
        if (!tasks || tasks.length === 0) {
            taskList.innerHTML = '<li>No tasks found.</li>';
            return;
        }

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.setAttribute('data-id', task._id);

            const taskDetails = document.createElement('div');
            taskDetails.classList.add('task-details');
            taskDetails.innerHTML = `
                <strong>${task.title}</strong>
                <p>${task.description}</p>
                <small>Status: ${task.status} | Due: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</small>
            `;

            const taskActions = document.createElement('div');
            taskActions.classList.add('task-actions');

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.addEventListener('click', () => openEditModal(task));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => deleteTask(task._id));

            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);

            li.appendChild(taskDetails);
            li.appendChild(taskActions);
            taskList.appendChild(li);
        });
    };

    // --- Create Task ---
    addTaskForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(addTaskForm);
        const taskData = {
            title: formData.get('title'),
            description: formData.get('description'),
            status: formData.get('status'),
            dueDate: formData.get('dueDate') || null, 
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            await response.json();  
            fetchTasks(); 
            addTaskForm.reset();
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task: ' + error.message);
        }
    });

    // --- Edit Task --- 
    const openEditModal = (task) => {
        document.getElementById('editTaskId').value = task._id;
        document.getElementById('editTitle').value = task.title;
        document.getElementById('editDescription').value = task.description;
        document.getElementById('editStatus').value = task.status;
        document.getElementById('editDueDate').value = task.dueDate ? task.dueDate.split('T')[0] : ''; // Format for date input
        editTaskModal.style.display = 'block';
    };

    closeModalButton.addEventListener('click', () => {
        editTaskModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === editTaskModal) {
            editTaskModal.style.display = 'none';
        }
    });

    editTaskForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const taskId = document.getElementById('editTaskId').value;
        const formData = new FormData(editTaskForm);
        const taskData = {
            title: formData.get('editTitle'),
            description: formData.get('editDescription'),
            status: formData.get('editStatus'),
            dueDate: formData.get('editDueDate') || null,
        };

        try {
            const response = await fetch(`${apiUrl}/${taskId}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            await response.json();
            fetchTasks(); 
            editTaskModal.style.display = 'none';
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task: ' + error.message);
        }
    });

    // --- Delete Task ---
    const deleteTask = async (taskId) => {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/${taskId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            fetchTasks(); 
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task: ' + error.message);
        }
    };

    fetchTasks();
