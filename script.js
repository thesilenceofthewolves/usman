console.log("script.js is running...");

tsParticles.load("tsparticles", {
  background: { color: "#ffffff" },
  fpsLimit: 60,
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        area: 900
      }
    },
    color: { value: "#999999" }, // light grey particles
    shape: {
      type: "circle"
    },
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
      color: "#cccccc",
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
      }
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
}).then(() => {
  console.log("✅ tsParticles initialized with interactivity");
}).catch((error) => {
  console.error("❌ tsParticles failed to load", error);
});
<script>
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
</script>
