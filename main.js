const bill = document.getElementById("bill");
const tips = document.querySelectorAll(".tips p");
const customInput = document.getElementById("custom");
const numOfPeople = document.getElementById("numOfPeople");
const errorMessage = document.getElementById("errorMsg");
const tipAmount = document.getElementById("tipAmount");
const total = document.getElementById("total");
const button = document.getElementById("btn");

// create an array to store the values
const values = [5, 10, 15, 25, 50];
let storedValue;

//Loop through the Ptags and assign an event listener
tips.forEach((tip, index) => {
  tip.addEventListener("click", () => {
    tip.style.backgroundColor = "#26c0ab";
    tip.style.color = "#00494d";

    storedValue = values[index];
    // console.log(`Selected values: ${storedValue}`);
  });
});

//Event listener to display results
numOfPeople.addEventListener("input", (e) => {
  const inputValue = e.target.value;

  const billInputValue = parseFloat(bill.value);
  const numOfPeopleValue = parseInt(numOfPeople.value);
  const customValue = parseInt(customInput.value);

  //function to calculate tip amount
  function calculateTipAmount(billInputValue, numOfPeopleValue, customValue) {
    let tipValue;
    if (storedValue) {
      tipValue = storedValue;
    } else {
      tipValue = customValue;
    }

    //Calculate the tip amount
    const totalTipAmount = (billInputValue * tipValue) / 100;

    //calculate the total amount per head
    const tipPerPerson = totalTipAmount / numOfPeopleValue;
    // console.log(tipPerPerson);
    // console.log(tipValue);
    return tipPerPerson;
  }

  const tipResult = calculateTipAmount(
    billInputValue,
    numOfPeopleValue,
    customValue
  );

  //function to calculate total amount
  function calculateTotal(billInputValue, numOfPeopleValue) {
    const totalAmount = billInputValue / numOfPeopleValue + tipResult;
    // console.log(totalAmount);
    return totalAmount;
  }
  const totalResult = calculateTotal(billInputValue, numOfPeopleValue);

  //   Validate input value
  if (inputValue <= 0) {
    numOfPeople.style.border = "2px solid #ff7a7a";
    errorMessage.style.display = "block";

    setTimeout(() => {
      numOfPeople.style.border = "none";
      errorMessage.style.display = "none";
    }, 2000);
  } else {
    tipAmount.textContent = `$${tipResult.toFixed(2)}`;
    total.textContent = `$${totalResult.toFixed(2)}`;
    button.style.backgroundColor = "#26c0ab";
  }
});

button.addEventListener("click", () => {
  bill.value = "";
  customInput.value = "";
  numOfPeople.value = "";
  tipAmount.textContent = "$0.00";
  total.textContent = "$0.00";

  tips.forEach((tip) => {
    tip.style.backgroundColor = "#00494d";
    tip.style.color = "#fff";
  });
});
