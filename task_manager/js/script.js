// mine
const _items = document.getElementById("items");
const _send = document.getElementById("send");
const _form = document.getElementById("form");
const _title = document.getElementById("title");
const _description = document.getElementById("description");
const _status = document.getElementById("status");
let _token = JSON.parse(localStorage.getItem("token"));
const _tasks = [];

// itemid
let _itemId = 0;

const fetchTask = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    fetch("https://samar-task-manager-api.herokuapp.com/tasks", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            const res = JSON.parse(result);
            // console.log(res)
            if (res) {
                res.forEach((e) => {
                    e.tid = _itemId;
                    _tasks.push(e);
                    _itemId += 1;
                    addtoUI(e);
                });
            }
        })
        .catch((error) => console.log("error", error));
};

if (!_token) {
    location.replace("signin.html");
} else {
    fetchTask(_token);
}

// material

// form

_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = _title.value;
    const description = _description.value;
    const status = _status.value === "1" ? true : false;
    const data = {
        title,
        description,
        status,
    };
    if (!title || !description) {
        alert("Title or Description can't be empty");
    } else {
        _form.reset();
        console.log(data);
        addtoUI(data);
        addtoDB(data);
    }
});

// add item to ui
const addtoUI = (data) => {
    const item = `<li class="collection-item avatar" id="item-${data.tid}">
  <i class="material-icons circle green">insert_chart</i>
  <span class="title">${data.title}</span>
  <p>${data.description} <br>
     ${data.status ? "Completed" : "Not Completed"}
  </p>
  <a href="#!" class="secondary-content"><i class="material-icons dlt">close</i></a>
</li>`;
    _items.insertAdjacentHTML("beforeend", item);
};

const dltitemDB = (tid) => {
    console.log("at db");
    const _r = _tasks.filter((ob) => ob.tid == tid);
    const r = _r[0];
    var myHeaders = new Headers();
    myHeaders.append("Authorization", _token);

    var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
    };

    fetch(
        `https://samar-task-manager-api.herokuapp.com/tasks/${r._id}`,
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
};

// delete item
_items.addEventListener("click", (e) => {
    const target = e.target;
    const classListDlt = target.className.split(" ");
    if (classListDlt.includes("dlt")) {
        const node = target.parentNode.parentNode;
        const item = document.getElementById(node.id);
        _items.removeChild(item);
        const tid = node.id.split("-")[1];
        dltitemDB(tid);
    }
});

// block of materila JS

M.AutoInit();

document.addEventListener("DOMContentLoaded", function () {
    const _select_elems = document.querySelectorAll("select");
    M.FormSelect.init(_select_elems, {});
});

const addtoDB = (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", _token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        title: data.title,
        description: data.description,
        completed: data.status,
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("https://samar-task-manager-api.herokuapp.com/tasks", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI4NDJmZmQzNDQyYTAwMTVlNjdhYWEiLCJpYXQiOjE2MjI2ODg1Mzd9.XBUGNZ8fnEVYOk_Vd_mvrX8Z0uFiqeWtHRIViGDiUU8

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

// var raw = JSON.stringify({name:"Samar Anand", email:"ok@ok.in", password:"sam12345"});

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow',
//   dataType:'json'

// };

// fetch("http://localhost:3000/users", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
