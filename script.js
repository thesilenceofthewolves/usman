// ----------------------
// Date in footer
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const dateSpan = document.getElementById("current-date");
  if (dateSpan) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    dateSpan.textContent = new Date().toLocaleDateString(undefined, options);
  }
});

// ----------------------
// Portfolio filtering
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (category === "all" || cardCategory === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

// ----------------------
// Modal logic
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("project-modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalLinks = document.getElementById("modal-links");
  const closeButton = document.getElementById("modal-close");
  const projectCards = document.querySelectorAll(".project-card");

  if (!modal || !modalImage || !modalTitle || !modalDescription || !modalLinks) return;

  const financeProjects = {
    title: "Business & Finance Analytics",
    description:
      "A set of analytics projects across airlines, banking and retail, showcasing forecasting, modelling and commercial insight.",
    imageAlt: "Finance data project",
    sections: [
      {
        heading: "British Airways",
        items: [
          {
            label: "British Airways Model",
            file: "BritishAirwayModel.pdf",
          },
          {
            label: "British Airways Lounges Analysis",
            file: "BritishAirwayLounges.pdf",
          },
        ],
      },
      {
        heading: "Lloyds Banking Group",
        items: [
          {
            label: "Lloyds Analysis",
            file: "LlyodAnalysis.pdf",
          },
          {
            label: "Lloyds Model",
            file: "LlyodModel.pdf",
          },
        ],
      },
      {
        heading: "Quantium Analytics",
        items: [
          {
            label: "Quantium Project",
            file: "quantium.pdf",
          },
          {
            label: "Quantium Store Insights",
            file: "quantiumstore.pdf",
          },
        ],
      },
    ],
  };

  function openModal(card) {
    const projectType = card.getAttribute("data-project");
    const img = card.querySelector("img");

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    if (img) {
      modalImage.src = img.src;
      modalImage.alt = img.alt || "";
    } else {
      modalImage.src = "";
      modalImage.alt = "";
    }

    modalLinks.innerHTML = "";

    if (projectType === "finance") {
      modalTitle.textContent = financeProjects.title;
      modalDescription.textContent = financeProjects.description;

      financeProjects.sections.forEach((section) => {
        const sectionEl = document.createElement("div");
        sectionEl.classList.add("modal-section");

        const h3 = document.createElement("h3");
        h3.textContent = section.heading;
        sectionEl.appendChild(h3);

        const ul = document.createElement("ul");
        section.items.forEach((item) => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.href = item.file; // PDFs live in the same folder as index.html
          link.target = "_blank";
          link.rel = "noopener";
          link.textContent = item.label;
          li.appendChild(link);
          ul.appendChild(li);
        });

        sectionEl.appendChild(ul);
        modalLinks.appendChild(sectionEl);
      });
    } else if (projectType === "health") {
      modalTitle.textContent = "Health Analytics Projects";
      modalDescription.textContent =
        "Exploratory and predictive work focused on healthcare data, clinical trends and patient outcomes. Content coming soon.";
    } else if (projectType === "sport") {
      modalTitle.textContent = "Sport Analytics Projects";
      modalDescription.textContent =
        "Data-driven analysis of performance metrics, game outcomes and sports strategy. Content coming soon.";
    } else if (projectType === "fun") {
      modalTitle.textContent = "Fun & Experimental Projects";
      modalDescription.textContent =
        "Personal experiments, creative analyses and playful data explorations. Content coming soon.";
    } else {
      modalTitle.textContent = "Project Details";
      modalDescription.textContent = card.getAttribute("data-description") || "";
    }
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  projectCards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
});

// ----------------------
// tsParticles config
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    tsParticles.load("tsparticles", {
      background: { color: { value: "#050816" } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
          resize: true,
        },
        modes: {
          push: { quantity: 2 },
          repulse: { distance: 100, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        links: {
          color: "#8888ff",
          distance: 120,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          outModes: { default: "bounce" },
        },
        number: {
          density: { enable: true, area: 800 },
          value: 60,
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 4 } },
      },
      detectRetina: true,
    });
  }, 150);
});
/* DARK / LIGHT MODE TOGGLE */
const toggle = document.createElement("div");
toggle.className = "theme-toggle";
toggle.innerHTML = `
  <span>☀️</span>
  <span>🌙</span>
  <div class="knob"></div>
`;
document.body.appendChild(toggle);

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
