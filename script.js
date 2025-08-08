tsParticles.load("tsparticles", {
  fullScreen: {
    enable: false,
    zIndex: -1
  },
  background: {
    color: "#000000"  // black background for particles layer
  },
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        area: 800
      }
    },
    color: {
      value: "#00ffff"  // cyan particles to match theme
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5,
      random: true
    },
    size: {
      value: { min: 1, max: 4 }
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      outModes: {
        default: "bounce"
      }
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse"
      }
    },
    modes: {
      repulse: {
        distance: 100
      }
    }
  }
});
