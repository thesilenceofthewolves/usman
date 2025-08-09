tsParticles.load("tsparticles", {
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  background: {
    color: "#ffffff" // white background
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
      value: "#999999" // gray particle color
    },
    links: {
      enable: true,
      distance: 120,
      color: "#cccccc", // gray link color
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
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
