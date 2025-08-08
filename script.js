// Initialize tsparticles with a visible and interactive config
tsParticles.load("tsparticles", {
  fullScreen: { enable: false },
  background: { color: "#ffffff" },
  particles: {
    number: {
      value: 80,
      density: { enable: true, area: 800 }
    },
    color: { value: "#007BFF" },
    shape: { type: "circle" },
    opacity: { value: 0.6 },
    size: { value: 3, random: { enable: true, minimumValue: 1 } },
    links: {
      enable: true,
      distance: 120,
      color: "#007BFF",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      outModes: { default: "bounce" }
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.6 } },
      push: { quantity: 4 }
    }
  },
  detectRetina: true
});
