console.log("script.js is running...");

tsParticles.load("tsparticles", {
  background: { color: "#ffffff" },
  fpsLimit: 60,
  particles: {
    number: { value: 60, density: { enable: true, area: 900 } },
    color: { value: "#999999" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3, random: { enable: true, minimumValue: 1 } },
    links: { enable: true, distance: 150, color: "#cccccc", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 2, outModes: { default: "bounce" } }
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" }, resize: true },
    modes: { repulse: { distance: 100 }, push: { quantity: 4 } }
  },
  detectRetina: true
});

// Filter Buttons Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    projectCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Modal Popup Description
document.addEventListener('DOMContentLoaded', () => {
  const projectImages = document.querySelectorAll('.project-card img');

  // Create modal
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.style.display = 'none'; // hide initially

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close-button');
  closeBtn.innerHTML = '&times;';

  modalContent.appendChild(closeBtn);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Descriptions for categories
  const descriptions = {
    health: {
      title: 'Health Projects',
      description: 'Data analysis in the health category focusing on patient outcomes, healthcare trends, and clinical data.',
      imgSrc: 'Health.jpg',
      pageLink: 'health.html'
    },
    finance: {
      title: 'Finance Projects',
      description: 'Analysis of financial data including stock markets, investment trends, and economic indicators.',
      imgSrc: 'Finances.jpg',
      pageLink: 'finance.html'
    },
    sport: {
      title: 'Sport Projects',
      description: 'Insights into sports statistics, game analytics, and athlete performance metrics.',
      imgSrc: 'sportanalysis.jpg',
      pageLink: 'sport.html'
    },
    fun: {
      title: 'Fun Projects',
      description: 'Creative and experimental projects including baby name trends, games, and interactive data visualisations.',
      imgSrc: 'fun.jpg',
      pageLink: 'fun.html'
    }
  };

  function showModal(category) {
    const data = descriptions[category];
    if (!data) return;

    // Clear previous except close button
    modalContent.querySelectorAll(':not(.close-button)').forEach(e => e.remove());

    // Add new content
    const img = document.createElement('img');
    img.src = data.imgSrc;
    img.alt = data.title;
    modalContent.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = data.title;
    modalContent.appendChild(h2);

    const p = document.createElement('p');
    p.textContent = data.description;
    modalContent.appendChild(p);

    const link = document.createElement('a');
    link.href = data.pageLink;
    link.textContent = 'Go to page';
    link.classList.add('btn-go-to-page');
    modalContent.appendChild(link);

    modal.style.display = 'block';
  }

  projectImages.forEach(img => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      const category = img.closest('.project-card').getAttribute('data-category');
      showModal(category);
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
