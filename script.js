tsParticles.load("tsparticles", {
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  background: {
    color: "#ffffff"
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
      value: "#999999"
    },
    links: {
      enable: true,
      distance: 120,
      color: "#cccccc",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      outModes: {
        default: "bounce"
      }
    },
    size: {
      value: 3
    },
    opacity: {
      value: 0.5
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 100
      }
    }
  },
  detectRetina: true
});
