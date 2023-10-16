// script.js

document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const statusDropdown = document.getElementById('statusDropdown');
    const taskList = document.getElementById('taskList');

    // Fetch tasks from the server and display them on page load
    fetch('/')
        .then(response => response.json())
        .then(tasks => tasks.forEach(addTask));

    // Event listener for form submission
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTaskOnServer(taskInput.value, statusDropdown.value)
            .then(() => {
                addTask({ text: taskInput.value, status: statusDropdown.value });
                taskInput.value = '';
            });
    });

    taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addTaskOnServer(taskInput.value, statusDropdown.value)
        .then(response => {
            console.log('Server Response:', response);
            addTask({ text: taskInput.value, status: statusDropdown.value });
            taskInput.value = '';
        })
        .catch(error => console.error('Error adding task:', error));
});

    // Function to add a new task
    function addTask(task) {
        // Create list item
        const listItem = document.createElement('li');
        listItem.innerText = `${task.text} - ${task.status}`;

        // Append list item to the task list
        taskList.appendChild(listItem);
    }

    // Function to add a task on the server
    function addTaskOnServer(taskText, taskStatus) {
    const url = '/add_task';
    const data = {
        task_text: encodeURIComponent(taskText),
        task_status: encodeURIComponent(taskStatus),
    };

    console.log('Sending data to server:', data);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // adjust Content-Type if needed
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error in server request:', error);
        throw error;
});
}
