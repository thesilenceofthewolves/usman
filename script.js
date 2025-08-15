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

// addition of new line for button
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

/* === Category Summary Cards === */
.category-summary-card {
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 700px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.category-summary-img {
  max-width: 200px;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 6px;
}

.category-summary-card h3 {
  font-size: 1.8rem;
  margin-bottom: 0.25rem;
}

.category-summary-card .subtitle {
  font-style: italic;
  color: #666;
  margin-bottom: 1rem;
}

.category-summary-card p {
  line-height: 1.6;
  color: #444;
  margin-bottom: 1rem;
}

.btn-go-to-page {
  display: inline-block;
  margin: 1rem 0;
  padding: 0.6rem 1.2rem;
  background-color: #a37c52;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-go-to-page:hover {
  background-color: #7a5a3c;
}



