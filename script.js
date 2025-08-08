// Auto set the current date in the footer
const date = new Date();
const formatted = date.toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
document.getElementById('date').textContent = formatted;


