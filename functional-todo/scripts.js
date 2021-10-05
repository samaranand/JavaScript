function saveTaskData(event) {
    event.preventDefault();
    var formData = new FormData(form);
    console.log(formData.values);
}
const form = document.getElementById('task-form');
form.addEventListener('submit', saveTaskData);