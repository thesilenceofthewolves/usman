console.log("✅ script.js loaded");

tsParticles.load("tsparticles", {
  fullScreen: { enable: true, zIndex: -1 },
  background: {
    color: "#ffffff"
  },
  particles: {
    number: {
      value: 150, // More particles!
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
      speed: 4, // Much faster
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        default: "bounce"
      }
    },
    size: {
      value: 3,
      random: { enable: true, minimumValue: 1 }
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
        distance: 150, // More dramatic repulsion
        duration: 0.4
      }
    }
  },
  detectRetina: true
});
