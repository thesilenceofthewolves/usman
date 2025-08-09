tsParticles.load("tsparticles", {
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  background: {
    color: {
      value: "#ffffff" // white background
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
      value: "#999999" // grey particles
    },
    links: {
      enable: true,
      distance: 150,
      color: "#999999", // grey links
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.5,
      outModes: {
        default: "bounce"
      }
    },
    size: {
      value: 3
    },
    opacity: {
      value: 0.6
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse"
      },
      onClick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 100
      },
      push: {
        quantity: 4
      }
    }
  },
  detectRetina: true
});
