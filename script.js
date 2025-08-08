tsParticles.load("tsparticles", {
  fullScreen: {
    enable: false,
    zIndex: -1
  },
  background: {
    color: "#000000"
  },
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        area: 800
      }
    },
    color: {
      value: "#00ffff"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5,
      random: false
    },
    size: {
      value: 3,
      random: { enable: true, minimumValue: 1 }
    },
    links: {
      enable: true,
      distance: 150,
      color: "#00ffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        default: "bounce"
      }
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab"
      },
      onClick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 180,
        links: {
          opacity: 0.6
        }
      },
      push: {
        quantity: 4
      }
    }
  },
  detectRetina: true
});
