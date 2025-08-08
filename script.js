tsParticles.load("tsparticles", {
  fullScreen: { enable: true, zIndex: -2 },
  background: { color: "transparent" },
  particles: {
    number: { value: 40, density: { enable: true, area: 800 } },
    color: { value: "#aaa" },
    links: { enable: true, distance: 150, color: "#aaa", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 0.8, random: true, outModes: "bounce" },
    shape: { type: "circle" },
    size: { value: 2 },
    opacity: { value: 0.6 }
  },
  interactivity: {
    events: { onHover: { enable: false }, onClick: { enable: false } },
    modes: {}
  }
});


// Footer date
const date = new Date();
document.getElementById('date').textContent = date.toLocaleDateString(undefined, {
  year: 'numeric', month: 'long', day: 'numeric'
});
