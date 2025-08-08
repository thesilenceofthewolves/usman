tsParticles.load("tsparticles", {
  fullScreen: { enable: true, zIndex: -2 },
  background: { color: "transparent" },
particles: {
    number: { value: 60, density: { enable: true, area: 800 } },
    color: { value: "#BBBBBB" },
    links: { enable: true, distance: 150, color: "#BBBBBB", opacity: 0.3, width: 1 },
    move: { enable: true, speed: 0.5, random: true, outModes: "bounce" },
    shape: { type: "circle" },
    size: { value: 2 },
    opacity: { value: 0.6 }
},
interactivity: {
events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: false }
},
modes: {
      grab: { distance: 150, links: { opacity: 0.5 } }
}
},
detectRetina: true
});

const date = new Date();
document.getElementById('date').textContent = date.toLocaleDateString(undefined, {
  year: 'numeric', month: 'long', day: 'numeric'
});






