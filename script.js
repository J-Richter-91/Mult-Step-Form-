const nameInput = document.getElementById("name");
let nextBtn = document.querySelectorAll(".next-btn");
let prevBtn = document.querySelectorAll(".back-btn");
let formSteps = document.querySelectorAll(".form-step");
const formInputs = document.querySelectorAll(".form-step1 form input")
let progressStepActive = document.querySelectorAll(".progress-step-circle");
const requiredInput = document.querySelector(".required-input");
const error = document.querySelector(".error");
let plans = document.querySelectorAll(".card-wrapper");
let currentStep = 0;
let progressStep = 0;
let planObject = {
  name: null,
  price: null,
  type: null
}


const addOnCheckboxes = document.querySelectorAll(".add-on-card input[type=checkbox]")
const selectedAddOns =[];






//Will Cycle to the next form

nextBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep < 5 && validateForm()){
        formSteps[currentStep].style.display = "none";
        progressStepActive[currentStep].classList.remove("progress-step-number-active");
        progressStepActive[currentStep].classList.add("progress-step-number");
        currentStep++;
        formSteps[currentStep].style.display = "flex";
        progressStepActive[currentStep].classList.add("progress-step-number-active");
        addTotal();
}});
});

//Previous form
prevBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        formSteps[currentStep].style.display = "none";
        progressStepActive[currentStep].classList.remove("progress-step-number-active");
        progressStepActive[currentStep].classList.add("progress-step-number");
        currentStep--;
        formSteps[currentStep].style.display = "flex";
        progressStepActive[currentStep].classList.add("progress-step-number-active");
    });
});


//Validate Form
function validateForm() {
  let valid = true;
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const planOptions = document.querySelectorAll(".card-wrapper");
  const errorMessages = document.querySelectorAll(".error");
  
  for (let i = 0; i < formInputs.length; i++) {
    if (!formInputs[i].value) {
      valid = false;
      if (errorMessages[i]) {
        errorMessages[i].style.display = "block";
      }
    } else {
      if (errorMessages[i]) {
        errorMessages[i].style.display = "none";
      }
    }
  }

  // Check if email is valid using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput && !emailRegex.test(emailInput.value)) {
    valid = false;
      emailInput.nextElementSibling.style.display = "block";
  } else {
      emailInput.nextElementSibling.style.display = "none";
  }

  // Check if phone number is valid using a regular expression
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; // Assuming a valid phone number consists of 10 digits
  if (phoneInput && !phoneRegex.test(phoneInput.value)) {
    valid = false;
      phoneInput.nextElementSibling.style.display = "block";
  } else {
      phoneInput.nextElementSibling.style.display = "none";
  }

  // Check if a plan is selected
  if (currentStep === 1) {
    let planSelected = false;
    planOptions.forEach((option) => {
      if (option.classList.contains("selected")) {
        planSelected = true;
      }
    });
    if (!planSelected) {
      valid = false;
      const planError = document.querySelector(".form-step2 .plan-error");
      if (planError) {
        planError.style.display = "block";
      }
    }
  }

  return valid;

  
}


//Switcher changes the plan and add on prices from monthly to yearly
const switcher = document.querySelector("#slider-check");
const planYearlyPrice = [90, 120, 150];
const planMonthlyPrice = [9, 12, 15];
const addOnYearly = [10, 20, 20];
const addOnMonthly = [1, 2, 3];
const planPrices = document.querySelectorAll(".card-price");
const addOnPrice = document.querySelectorAll(".add-on-cost-per-month");


/*Switches the price on plans and add on services when checked*/
switcher.addEventListener("click", () => {
  if (switcher.checked) {
    planPrices.forEach((price, index) => {
      price.innerHTML = `$${planYearlyPrice[index]}/yr`;
      
    });

    addOnPrice.forEach((price,index) => {
      price.innerHTML = `$${addOnYearly[index]}/yr`;
    })
  } else {
    planPrices.forEach((price, index) => {
      price.innerHTML = `$${planMonthlyPrice[index]}/mo`;
      
    });
    addOnPrice.forEach((price,index) => {
      price.innerHTML = `$${addOnMonthly[index]}/mo`;
    })
  }
  
});





//This stores the title and price of the selected plan into variables
plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    plans.forEach((plan) => {
      plan.classList.remove("selected");
    });
    plan.classList.add("selected");
    const planName = plan.querySelector(".card-title").innerText;
    const planPrice = plan.querySelector(".card-price").innerText;
    planObject.name = planName;
    planObject.price = planPrice;
    displayFinal();
  });
});


//Add on services

addOnCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (event) => {
    const selectedAddOn = event.target.parentElement;
    const addOnTitle = selectedAddOn.querySelector('.add-on-title').innerText;
    const addOnCostPerMonth = selectedAddOn.querySelector('.add-on-cost-per-month').innerText;

    if (event.target.checked) {
      selectedAddOns.push({ title: addOnTitle, costPerMonth: addOnCostPerMonth });
      ;
    } else {
      const index = selectedAddOns.findIndex((addOn) => addOn.title === addOnTitle);
      if (index > -1) {
        selectedAddOns.splice(index, 1);
        ;
      }
    }

   showAddon();
   
  });
});

//Display final totals
let planSelected = document.querySelector(".plan-selected");
let selectedPlanPrice = document.querySelector(".plan-price");
function displayFinal(){
  
  planSelected.innerText = planObject.name;
  selectedPlanPrice.innerText = planObject.price;
  
}


function showAddon(){
// Assuming you have an HTML element to display the add-ons
const addOnsContainer = document.querySelector(".add-ons");

// Clear existing add-ons
addOnsContainer.innerHTML = "";

// Update with selected add-ons
selectedAddOns.forEach((addOn) => {
  // Create a new add-on container element
  const addOnContainer = document.createElement("div");
  addOnContainer.classList.add("add-on-container");

  // Create the add-on title element
  const titleElement = document.createElement("p");
  titleElement.classList.add("add-on-services-selected");
  titleElement.innerText = addOn.title;

  // Create the add-on price element
  const priceElement = document.createElement("span");
  priceElement.classList.add("add-on-service-price");
  priceElement.innerText = addOn.costPerMonth;

  // Append the title and price elements to the add-on container
  addOnContainer.appendChild(titleElement);
  addOnContainer.appendChild(priceElement);

  // Append the add-on container to the add-ons container
  addOnsContainer.appendChild(addOnContainer);
});

};

//add the total

function addTotal() {
  total = 0;
  const billingCycle = switcher.checked ? "yr" : "mo";

  selectedAddOns.forEach((addOn) => {
    total += parseFloat(addOn.costPerMonth.replace(/[^0-9.-]+/g, ""));
    console.log(parseFloat(addOn.costPerMonth.replace(/[^0-9.-]+/g, "")))
  });

  total += parseFloat(planObject.price.replace(/[^0-9.-]+/g, ""));

  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = `$${total}/${billingCycle}`;
}









  


