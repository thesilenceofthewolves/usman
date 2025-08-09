tsParticles.load("tsparticles", {
  background: {
    color: "#ffffff"
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        area: 800
      }
    },
    color: { value: "#999999" },
    shape: { type: "circle" },
    opacity: {
      value: 0.5
    },
    size: {
      value: 3,
      random: { enable: true, minimumValue: 1 }
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ccc",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      outModes: { default: "bounce" }
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
        distance: 120,
        links: {
          opacity: 0.5
        }
      },
      push: {
        quantity: 4
      }
    }
  },
  detectRetina: true
});
