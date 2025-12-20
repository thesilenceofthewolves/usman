document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------
     tsParticles Background (safe)
  ------------------------------ */
  if (window.tsParticles) {
    tsParticles.load("tsparticles", {
      particles: {
        number: { value: 60 },
        size: { value: 2 },
        move: { speed: 1 },
        links: { enable: true, distance: 130, color: "#38bdf8" },
        color: { value: "#38bdf8" }
      }
    });
  }

  /* ------------------------------
     Category Filters
  ------------------------------ */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;

      projectCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (category === "all" || cardCategory === category) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* ------------------------------
     Modal Logic
  ------------------------------ */
  const modal = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalLinks = document.getElementById("modal-links");

  if (!modal || !modalClose || !modalImage || !modalTitle || !modalDescription || !modalLinks) {
    console.error("Modal elements not found. Check your HTML IDs.");
    return;
  }

  const projectInfo = {
    health: {
      title: "Health Projects",
      description: "A collection of healthcare analytics projects.",
      image: "Health.jpg",
      links: []
    },
    sport: {
      title: "Sport Analytics",
      description: "Performance analytics and sports insights.",
      image: "sportanalysis.jpg",
      links: []
    },
    fun: {
      title: "Fun Projects",
      description: "Creative and experimental side projects.",
      image: "fun.jpg",
      links: []
    },
    finance: {
      title: "Finance Projects",
      description:
        "Business analytics projects focused on understanding customers, forecasting performance and supporting data‑driven decision‑making.",
      image: "Finances.jpg",
      links: [],
      sections: [
        {
          title: "British Airways – Customer Insights & Lounge Demand Analysis",
          tasks: [
            {
              label: "Lounge Demand Analysis",
              file: "BritishAirways_Task1_Lounge_Demand_Analysis.pdf"
            },
            {
              label: "Customer Model",
              file: "BritishAirways_Task2_Customer_Model.pdf"
            }
          ]
        },
        {
          title: "Lloyds Banking Group – Customer Behaviour & Predictive Modelling",
          tasks: [
            {
              label: "Customer Analysis",
              file: "Lloyds_Task1_Customer_Analysis.pdf"
            },
            {
              label: "Predictive Model",
              file: "Lloyds_Task2_Predictive_Model.pdf"
            }
          ]
        },
        {
          title: "Quantium – Retail Analytics & Client Reporting",
          tasks: [
            {
              label: "Transaction Analysis",
              file: "Quantium_Task1_Transaction_Analysis.pdf"
            },
            {
              label: "Benchmark Store Analysis",
              file: "Quantium_Task2_Benchmark_Store_Analysis.pdf"
            },
            {
              label: "Client Report",
              file: "Quantium_Task3_Client_Report.pdf"
            }
          ]
        }
      ]
    }
  };

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      const key = card.dataset.project;
      const data = projectInfo[key];
      if (!data) return;

      modalImage.src = data.image;
      modalImage.alt = data.title;
      modalTitle.textContent = data.title;
      modalDescription.textContent = data.description;

      modalLinks.innerHTML = "";

      if (data.sections) {
        data.sections.forEach(section => {
          const div = document.createElement("div");
          div.classList.add("modal-section");

          const h3 = document.createElement("h3");
          h3.textContent = section.title;
          div.appendChild(h3);

          const ul = document.createElement("ul");
          section.tasks.forEach(task => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = task.file;
            a.target = "_blank";
            a.rel = "noopener";
            a.textContent = task.label;
            li.appendChild(a);
            ul.appendChild(li);
          });

          div.appendChild(ul);
          modalLinks.appendChild(div);
        });
      }

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  modalClose.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  });

  /* ------------------------------
     Footer Date
  ------------------------------ */
  const dateSpan = document.getElementById("current-date");
  if (dateSpan) {
    const now = new Date();
    dateSpan.textContent = now.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  /* ------------------------------
     Sun/Moon Toggle (Style C)
  ------------------------------ */
  const toggle = document.createElement("div");
  toggle.className = "theme-toggle";

  const sun = document.createElement("span");
  sun.textContent = "☀️";

  const moon = document.createElement("span");
  moon.textContent = "🌙";

  const knob = document.createElement("div");
  knob.className = "knob";

  toggle.appendChild(sun);
  toggle.appendChild(moon);
  toggle.appendChild(knob);
  document.body.appendChild(toggle);

  let dark = true;

  const applyTheme = () => {
    if (dark) {
      document.body.style.backgroundColor = "#050816";
      document.body.style.color = "#f5f5f5";
      knob.style.left = "4px";
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#111111";
      knob.style.left = "32px";
    }
  };

  applyTheme();

  toggle.addEventListener("click", () => {
    dark = !dark;
    applyTheme();
  });
});
