const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const swap = document.getElementById("swap");
const rate = document.getElementById("rate");

// fetch exchange rate and update the DOM
function calculate() {
  const crncyOne = currencyOne.value;
  const crncyTwo = currencyTwo.value;
  fetch(`https://api.exchangeratesapi.io/latest?base=${crncyOne}`)
    .then((res) => res.json())
    .then((data) => {
      const rates = data.rates;
      rate.innerHTML = `1 ${crncyOne} = ${rates[crncyTwo].toFixed(
        4
      )} ${crncyTwo}`;
      amountTwo.value = (amountOne.value * rates[crncyTwo]).toFixed(3);
    });
}

calculate();

currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const tmp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = tmp;
  calculate();
});
