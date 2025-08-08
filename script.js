// Initialize particles
tsParticles.load("tsparticles", {
  fullScreen: {
    enable: true,
    zIndex: -2
  },
  background: {
    color: {
      value: "transparent"
    }
  },
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        area: 1000
      }
    },
    color: {
      value: "#ffffff"
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    collisions: {
      enable: false
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        default: "bounce"
      }
    },
    opacity: {
      value: 0.6
    },
    shape: {
      type: "circle"
    },
    size: {
      value: 2
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab"
      }
    },
    modes: {
      grab: {
        distance: 120,
        links: {
          opacity: 0.6
        }
      }
    }
  }
});

// Set date in footer
const date = new Date();
const formatted = date.toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
document.getElementById('date').textContent = formatted;




