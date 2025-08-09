tsParticles.load("tsparticles", {
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  background: {
    color: {
      value: "#ffffff"
    }
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
      value: "#ccc"
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
      random: true
    },
    links: {
      enable: true,
      distance: 150,
      color: "#aaa",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
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
        distance: 140,
        links: {
          opacity: 0.7
        }
      },
      push: {
        quantity: 4
      }
    }
  },
  detectRetina: true
});
