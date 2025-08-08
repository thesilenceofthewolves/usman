// Set current date in footer
const dateElement = document.getElementById("date");
const today = new Date();
const formatted = today.toLocaleDateString(undefined, {
  year: "numeric",
  month: "long",
  day: "numeric"
});
dateElement.textContent = formatted;
