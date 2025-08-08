tsParticles.load("tsparticles", {
  background: {
    color: {
      value: "#ffffff"
    }
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      }
    }
  },
  particles: {
    color: {
      value: "#999"
    },
    links: {
      color: "#999",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: false
    },
    move: {
      direction: "none",
      enable: true,
      outModes: "bounce",
      random: false,
      speed: 1.5,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.4
    },
    shape: {
      type: "circle"
    },
    size: {
      value: { min: 1, max: 4 }
    }
  },
  detectRetina: true
});




