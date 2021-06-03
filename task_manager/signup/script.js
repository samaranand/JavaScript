const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

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
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// check required fields
function checkRequired(intputArr) {
  let f =  true
  intputArr.forEach((inp) => {
    if (inp.value.trim() === "") {
      showError(inp, "is required.");
      f = false
    } else {
      showSuccess(inp);
    }
  });
  return f
}

// check required length
function checkLength(inp, m, n) {
  if (inp.value.length < m) {
    showError(inp, `must be atleast ${m} charaters.`);
    return false
  } else if (inp.value.length > n) {
    showError(inp, ` must less than ${n} charaters.`);
    return false
  } else {
    showSuccess(inp);
    return true
  }
}

//check password 2
function checkPassword(inp1, inp2) {
  if (inp2.value === "") {
    return checkLength(inp2, 5, 20);
  } else if (inp1.value !== inp2.value) {
    showError(inp2, ` don't match.`);
    return false
  } else {
    showSuccess(inp2);
    return true
  }
}

//event listner
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 5, 20);
  checkPassword(password, password2);
  const data = {
    "name" : username,
    email,
    password
  }
  signupDB(data)
});



const signupDB = (data)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({"name":data.name,"email":data.email,"age":23,"password":data.password});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://samar-task-manager-api.herokuapp.com/users", requestOptions)
    .then(response => {
      if(response.status !== 201){
        return Error()
      } else {
        return response.text()
      }
    })
    .then(result => {
      // console.log(result)
      alert("sign up scuccessful")
      location.replace('signin.html')       

    })
    .catch(error => {
      console.log('error', error)
      alert("sign up failed")
    });
}