tsParticles.load("tsparticles", {
  background: {
    color: "#000000",
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        area: 900
      }
    },
    color: { value: "#00e5ff" },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
      }
    },
    size: {
      value: 3,
      random: { enable: true, minimumValue: 1 }
    },
    links: {
      enable: true,
      distance: 150,
      color: "#00e5ff",
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
      },
      attract: {
        enable: false,
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
