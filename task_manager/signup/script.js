const form = document.getElementById("form");
const username = document.getElementById("name");
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
  let f = true
  f = checkRequired([username, email, password, password2]) && f;
  f = checkLength(username, 3, 15) && f;
  f = checkLength(password, 5, 20) && f;
  f = checkPassword(password, password2) && f;
  const data = {
    "name" : username.value,
    "email": email.value,
    "password":password.value
  }
  if(f===true){
    console.log('i m here')
    signupDB(data)
  }
});


const showErr = async ()=>{
  alert('Something went wrong')
  await localStorage.removeItem("token")
  location.replace('signin.html')
}



const signupDB = async (data)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({"name":data.name,"email":data.email,"age":23,"password":data.password});
  console.log(raw)
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await  fetch("https://samar-task-manager-api.herokuapp.com/users", requestOptions)
  if(response.status !== 201){
    console.log('i m err')
    alert('Something went wrong')
    throw Error('error happende')
  } else {
    // const responseJSON = await response.json()
    console.log('my self samar')
    alert('Signup Successful')
    location.replace('signin.html')       

  }
}