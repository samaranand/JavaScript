
// mine
const _items = document.getElementById('items')
const _send = document.getElementById('send')
const _form = document.getElementById('form')
const _title = document.getElementById('title')
const _description = document.getElementById('description')
const _status = document.getElementById('status')
let _token = JSON.parse(localStorage.getItem("token"))
const _tasks = []

// itemid
let _itemId = 0

const fetchTask = async (token) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch("https://samar-task-manager-api.herokuapp.com/tasks", requestOptions)
  if(response.status !== 200){
    alert('Something went wrong')
  } else {
    const res = await response.json()
    if(res.length > 0){
      res.forEach(e => {
        e.tid = _itemId
        _tasks.push(e)
        _itemId += 1
        addtoUI(e)
      })
    }
  }
}

if(!_token){
  location.replace('signin.html')
} else {
  fetchTask(_token)
}

// material



// form 

_form.addEventListener('submit', (e)=>{
  e.preventDefault()
  const title = _title.value;
  const description = _description.value;
  const status = _status.value === "1" ? true : false
  const data = {
    title,
    description,
    status
  }
  if(!title || !description){
    alert('Title or Description can\'t be empty')
  } else {
    _form.reset()
    console.log(data)
    addtoUI(data)
    addtoDB(data)
  }
  
})



// add item to ui
const addtoUI = data =>{
  const item = `<li class="collection-item avatar" id="item-${data.tid}">
  <i class="material-icons circle green">insert_chart</i>
  <span class="title">${data.title}</span>
  <p>${data.description} <br>
     ${data.status ? "Completed" : "Not Completed"}
  </p>
  <a href="#!" class="secondary-content"><i class="material-icons dlt">close</i></a>
</li>`
_items.insertAdjacentHTML('beforeend', item)
}



const dltitemDB = async (tid)=>{
  console.log('at db')
  const _r = _tasks.filter(ob => ob.tid == tid)
  const  r = _r[0]
  var myHeaders = new Headers();
  myHeaders.append("Authorization", _token);

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(`https://samar-task-manager-api.herokuapp.com/tasks/${r._id}`, requestOptions)
  if(response.status !== 200){
    alert('SOmething went wrong')
  } else {
    console.log('deleted')
  }
}


// delete item
_items.addEventListener('click', (e)=>{
  const target = e.target;
  const classListDlt = target.className.split(' ')
  if(classListDlt.includes('dlt')){
    const node = target.parentNode.parentNode;
    const item = document.getElementById(node.id);
    _items.removeChild(item)
    const tid = node.id.split('-')[1]
    dltitemDB(tid)
        
  }
})


// block of materila JS

M.AutoInit();

document.addEventListener('DOMContentLoaded', function() {
  const _select_elems = document.querySelectorAll('select');
  M.FormSelect.init(_select_elems, {});
});




const addtoDB = async (data)=>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", _token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({"title":data.title, "description":data.description,"completed":data.status});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch("https://samar-task-manager-api.herokuapp.com/tasks", requestOptions)
  if(response.status !== 201){
    alert('SOmething went wrong')
  } else {
    console.log('Added')
  }
}

