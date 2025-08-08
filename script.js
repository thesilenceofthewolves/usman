tsParticles.load("tsparticles", {
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        area: 1000
      }
    },
    color: {
      value: "#999"
    },
    links: {
      enable: true,
      distance: 200,
      color: "#999",
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: false
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      outModes: "bounce"
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
        distance: 140,
        links: {
          opacity: 0.7
        }
      }
    }
  }
});
