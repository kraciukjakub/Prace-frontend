const employees = [
  "Employee 1",
  "Employee 2",
  "Employee 3",
  "Employee 4",
  "Employee 5",
  "Employee 6",
  "Employeed 7",
  "Employee 8",
  "Employee 9",
  "Employee 10",
];

function spinWheel() {
  const wheel = document.getElementById("wheel");
  const spinButton = document.getElementById("spinButton");
  const items = document.getElementById("items");
  const pointer = document.getElementById("pointer");

  // Disable spin button during spinning
  spinButton.disabled = true;

  // Generate a random index from the employees array
  const randomIndex = Math.floor(Math.random() * employees.length);

  // Calculate the rotation angle
  const angle = randomIndex * (360 / employees.length) + 720; // Spin at least two full circles

  // Apply the rotation animation
  wheel.style.transform = `rotate(${angle}deg)`;

  // Calculate the selected item index after the animation finishes
  const selectedItemIndex =
    Math.floor(angle / (360 / employees.length)) % employees.length;

  // Wait for the animation to finish (4 seconds) and display the selected employee
  setTimeout(() => {
    alert("Selected Employee: " + employees[selectedItemIndex]);
    spinButton.disabled = false; // Enable the spin button
  }, 4000);
}

// Create the wheel items dynamically
const items = document.getElementById("items");

for (let i = 0; i < employees.length; i++) {
  const listItem = document.createElement("li");
  listItem.textContent = employees[i];
  items.appendChild(listItem);
}
