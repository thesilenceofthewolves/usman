tsParticles.load("tsparticles", {
  fullScreen: { enable: true, zIndex: -2 },
  background: { color: "transparent" },
  particles: {
    number: { value: 40, density: { enable: true, area: 800 } },
    color: { value: "#ffffff" },       // white dots
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",                // white lines
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      random: true,
      outModes: "bounce"
    },
    shape: { type: "circle" },
    size: { value: 2 },
    opacity: { value: 0.6 }
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab"    // when mouse hovers, lines move toward mouse
      },
      onClick: {
        enable: false
      }
    },
    modes: {
      grab: {
        distance: 200,
        links: { opacity: 0.7 }
      }
    }
  },
  detectRetina: true
});

