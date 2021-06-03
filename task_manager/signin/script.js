const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const signup = document.getElementById("signup");
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
  let p=true
  intputArr.forEach((inp) => {
    if (inp.value.trim() === "") {
      showError(inp, "is required.");
      p=false
    } else {
      showSuccess(inp);
    }
  });
  return p
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


//event listner
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // localStorage.setItem("token", JSON.stringify("arr"))
  const t1 = checkRequired([email, password]);
  const t2 = checkLength(password, 5, 20);
  const data = {
    "email" : email.value,
    "password": password.value
  }
  // console.log(data)
  if(t1 && t2){
    // console.log('going')
    loginme(data)
  }
});



const loginme = async (data)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  console.log('here')
  var raw = JSON.stringify({"email":data.email,"password":data.password});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch("https://samar-task-manager-api.herokuapp.com/users/login", requestOptions)
  if(response.status !== 200){
    alert('Invalid login')
  } else {
    const res = await response.json()
    const token = 'Bearer ' + res.token
    await localStorage.setItem("token", JSON.stringify(token))
    location.replace("index.html")
  }
}

signup.addEventListener('click', e=>{
  e.preventDefault()
  location.replace("signup.html")
})


