// Mevcut görevleri listeleme fonksiyonu
function listCurrentTasks() {
    fetch('todos.json')
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = ''; // Önceki listeyi temizle
            data.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.task;

                // Delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function() {
                    deleteTask(task.task);
                };

                // Edit button
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.onclick = function() {
                    editTask(task.task);
                };

                // Butonları li elementine ekle
                li.appendChild(deleteButton);
                li.appendChild(editButton);

                taskList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

window.onload = listCurrentTasks;

// Yeni görev ekleme fonksiyonu
// Yeni görev ekleme fonksiyonu
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskValue = taskInput.value.trim();
    if (taskValue !== "") {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.textContent = taskValue;

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteTask(taskValue);
        };

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            editTask(taskValue);
        };

        // Butonları li elementine ekle
        li.appendChild(deleteButton);
        li.appendChild(editButton);

        taskList.appendChild(li);

        // Yeni görevi json dosyasına eklemek için fetch isteği
        fetch('http://localhost/TodoApi.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: taskValue }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Görev eklenme işlemi başarılı oldu
            })
            .catch(error => console.error('Error:', error));

        taskInput.value = ""; // Görev ekledikten sonra input alanını temizle
    } else {
        alert("Lütfen geçerli bir görev girin!");
    }
}

// Görevi silme fonksiyonu
function deleteTask(task) {
    fetch('http://localhost/TodoApi.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: task }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            listCurrentTasks(); // Görev silindikten sonra görevleri listele
        })
        .catch(error => console.error('Error:', error));
}

// Görevi düzenleme fonksiyonu
function editTask(task) {
    var newTask = prompt("Yeni görev girin", task);
    if (newTask !== null && newTask.trim() !== "") {
        fetch('http://localhost/TodoApi.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldTask: task, newTask: newTask }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                listCurrentTasks(); // Görev güncellendikten sonra görevleri listele
            })
            .catch(error => console.error('Error:', error));
    }
}
