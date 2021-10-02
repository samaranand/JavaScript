const _update = document.getElementById("update");
const _logout = document.getElementById("logout");

const password = document.getElementById("password");
const password2 = document.getElementById("password2");

const _name = document.getElementById("name");
const _email = document.getElementById("email");

let _token = JSON.parse(localStorage.getItem("token"));

if (!_token) {
    location.replace("signin.html");
}

//show input error messages
function showError(input, message) {
    const formCtrl = input.parentElement;
    formCtrl.className = "form-control error";
    const small = formCtrl.querySelector("small");
    const label = formCtrl.querySelector("label");
    small.innerText = `${label.innerText} ${message}`;
}

//show success messgages
function showSuccess(input) {
    const formCtrl = input.parentElement;
    formCtrl.className = "form-control success";
}

// check email is valid or not
function checkEmail(email) {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// check required fields
function checkRequired(intputArr) {
    let f = true;
    intputArr.forEach((inp) => {
        if (inp.value.trim() === "") {
            showError(inp, "is required.");
            f = false;
        } else {
            showSuccess(inp);
        }
    });
    return f;
}

// check required length
function checkLength(inp, m, n) {
    if (inp.value.length < m) {
        showError(inp, `must be atleast ${m} charaters.`);
        return false;
    } else if (inp.value.length > n) {
        showError(inp, ` must less than ${n} charaters.`);
        return false;
    } else {
        showSuccess(inp);
        return true;
    }
}

//check password 2
function checkPassword(inp1, inp2) {
    if (inp2.value === "") {
        checkLength(inp2, 5, 20);
    } else if (inp1.value !== inp2.value) {
        showError(inp2, ` don't match.`);
    } else {
        showSuccess(inp2);
    }
}

// updating password
_update.addEventListener("click", (e) => {
    e.preventDefault();
    checkRequired([password, password2]);
    checkLength(password, 5, 20);
    checkLength(password2, 5, 20);
    checkPassword(password, password2);
    _updateDBpass(password.value);
});

const _updateDBpass = (pass) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", _token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ password: pass });

    var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch(
        "https://samar-task-manager-api.herokuapp.com/users/me",
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            alert("password change success");
            logout();
        })
        .catch((error) => console.log("error", error));
};

// logging out

_logout.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
});

const logout = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", _token);

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
    };

    fetch(
        "https://samar-task-manager-api.herokuapp.com/users/logout",
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            const f = async () => {
                _token = undefined;
                await localStorage.removeItem("token");
                location.replace("signin.html");
            };
            f();
        })
        .catch((error) => console.log("error", error));
};

const updateui = (res) => {
    _name.innerHTML = res.name;
    _email.innerHTML = res.email;
};

const ui = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", _token);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    fetch(
        "https://samar-task-manager-api.herokuapp.com/users/me",
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            const me = JSON.parse(result);
            updateui(me);
        })
        .catch((error) => {
            console.log("error", error);
        });
};

ui();
