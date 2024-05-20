document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("inputName").value;
  const weight = parseFloat(document.getElementById("inputWeight").value);
  const height = parseFloat(document.getElementById("inputHeight").value);

  if (!name || isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    displayPopup("Please enter valid values for name, weight, and height.");
    return;
  }

  const bmi = calculateBMI(weight, height);
  const weightCategory = getWeightCategory(bmi);

  const popupContent = `
    <h2>${name}, your BMI is ${bmi.toFixed(2)}</h2>
    <p>Weight Category: ${weightCategory}</p>
    <button id="gotItButton">Got it</button>
  `;

  displayPopup(popupContent);
});

function calculateBMI(weight, height) {
  const heightMeters = height / 100;
  return weight / Math.pow(heightMeters, 2);
}

function getWeightCategory(bmi) {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal weight';
  } else if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

function displayPopup(content) {
  const popupContainer = document.getElementById("popupContainer");
  const popupCard = document.createElement("div");
  popupCard.classList.add("popup-card");
  popupCard.innerHTML = content;
  popupContainer.innerHTML = '';
  popupContainer.appendChild(popupCard);
  popupContainer.style.display = "flex";
  document.body.classList.add("blur");

  document.getElementById("gotItButton").addEventListener("click", () => {
    popupContainer.style.display = "none";
    document.body.classList.remove("blur");
  });
}
