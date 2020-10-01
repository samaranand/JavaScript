const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double-money");
const showMillionariesBtn = document.getElementById("show-millionaries");
const sortUserBtn = document.getElementById("sort-user");
const calculateWealthBtn = document.getElementById("calculate-wealth");
const main = document.getElementById("main");

// main array or data-base

data = [];

// fetch api and get data

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const user = data.results[0];
  user.name.first;
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// adding data - funtion in database

function addData(obj) {
  data.push(obj);
  updateUI();
}

// doubling evryone money

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateUI();
}

// sort the data

function sortData() {
  data.sort((a, b) => b.money - a.money);
  updateUI();
}

// show only Millionaries

function showMillionaries() {
  data = data.filter((user) => user.money > 1000000);
  updateUI();
}

function calculateWealth() {
  let wealth = data.reduce((acc, user) => (acc += user.money), 0);
  wealth = `₹${wealth}.00`;
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Money: <strong>${wealth}</strong></h3>`;
  main.appendChild(wealthEl);
}

// updaing data in UI

function updateUI(providedData = data) {
  // clearing the main UI
  main.innerHTML = ` <h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((item) => {
    const ele = document.createElement("div");
    ele.classList.add("person");
    amount = `₹${item.money}.00`;
    ele.innerHTML = `<strong>${item.name}</strong> ${amount}`;
    main.appendChild(ele);
  });
}

// function for add random user using addBtn
addUserBtn.addEventListener("click", getRandomUser);

// function for double money using doubleBtn
doubleMoneyBtn.addEventListener("click", doubleMoney);

// function for sorting using sortBtn
sortUserBtn.addEventListener("click", sortData);

// function for filtering using showMillionariesBtn
showMillionariesBtn.addEventListener("click", showMillionaries);

// function for filtering using showMillionariesBtn
calculateWealthBtn.addEventListener("click", calculateWealth);
