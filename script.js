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
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: "#aaaaaa"
    },
    links: {
      color: "#cccccc",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1
    },
    collisions: {
      enable: false
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      outModes: {
        default: "bounce"
      }
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 70
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      value: { min: 1, max: 3 }
    }
  },
  detectRetina: true
});
