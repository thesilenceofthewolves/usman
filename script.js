tsParticles.load("tsparticles", {
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        area: 1200
      }
    },
    color: {
      value: "#bbb"  // lighter grey for better contrast with white background lines
    },
    links: {
      enable: true,
      distance: 220,
      color: "#bbb",
      opacity: 0.6,
      width: 1.2
    },
    collisions: {
      enable: false
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      random: true,
      straight: false,
      outModes: "bounce"
    },
    opacity: {
      value: 0.7
    },
    shape: {
      type: "circle"
    },
    size: {
      value: 2.5
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
        distance: 150,
        links: {
          opacity: 0.8
        }
      }
    }
  }
});



