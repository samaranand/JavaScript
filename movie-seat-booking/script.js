const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById("count");
const price = document.getElementById("price");
const movieSelect = document.getElementById("movie");

populateUI();

//save selcted movie and price
function saveMovieData(index, value) {
  let arr = [index, value];
  localStorage.setItem("selectedMovie", JSON.stringify(arr));
}

// update total count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

  return selectedSeats.length;
}

// copy selected seats into arr
//  map through arr
//  return a new array

// update the text class
function updateCountPrice() {
  const totalSeats = updateSelectedCount();

  const ticketPrice = +movieSelect.value;
  count.innerText = totalSeats;
  price.innerText = totalSeats * ticketPrice;
}

// get data from local and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
  console.log(selectedMovie);
  if (selectedSeats.length > 0) {
    selectedSeats.forEach((e) => {
      seats[e].classList.add("selected");
    });
  }
  if (selectedMovie !== null) {
    movieSelect.selectedIndex = selectedMovie[0];
  }
  updateCountPrice();
}

// movie event listener
movieSelect.addEventListener("change", (e) => {
  saveMovieData(e.target.selectedIndex, +e.target.value);
  updateCountPrice();
});

//container event listner
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCountPrice();
  }
});
