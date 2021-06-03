console.log('task manager app in progress')

const me = {
  token : undefined
}

const close = document.querySelector('.list-item')


close.addEventListener('click', (e)=>{
  console.log(e.target.parentNode)
})



















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