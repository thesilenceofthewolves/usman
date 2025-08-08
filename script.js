<script src="https://cdn.jsdelivr.net/npm/tsparticles@3/tsparticles.bundle.min.js"></script>
<script src="particles.js"></script>
<script src="script.js"></script>
// Auto set the current date in the footer
const date = new Date();
const formatted = date.toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
document.getElementById('date').textContent = formatted;


