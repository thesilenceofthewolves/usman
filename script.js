console.log("✅ script.js is running")

// ---------------------
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
      "A collection of commercial analytics projects across airlines, banking and retail, focusing on forecasting, customer behaviour and data-driven decisions.",
    sections: [
      {
        heading: "British Airways – Customer Insights & Lounge Demand Analysis",
        projectDescription:
          "Analysed lounge demand patterns and built a customer model to understand usage, segment passengers and support capacity planning.",
        items: [
          {
            label: "Lounge Demand Analysis",
            file: "BritishAirways_Lounge_Demand_Analysis.pdf",
            tooltip:
              "Analysed lounge usage data to forecast demand and identify capacity bottlenecks."
          },
          {
            label: "Customer Model",
            file: "BritishAirways_Customer_Model.pdf",
            tooltip:
              "Built a customer segmentation model to understand behaviour and identify high-value passenger groups."
          }
        ]
      },
      {
        heading: "Lloyds Banking Group – Customer Behaviour & Predictive Modelling",
        projectDescription:
          "Explored customer behaviour patterns and developed a predictive model to support product targeting and retention strategy.",
        items: [
          {
            label: "Customer Analysis",
            file: "Lloyds_Customer_Analysis.pdf",
            tooltip:
              "Investigated customer trends and behaviours to highlight retention risks and growth opportunities."
          },
          {
            label: "Predictive Model",
            file: "Lloyds_Predictive_Model.pdf",
            tooltip:
              "Developed a model to predict customer product uptake and support data-driven decision-making."
          }
        ]
      },
      {
        heading: "Quantium – Retail Analytics & Client Reporting",
        projectDescription:
          "Used transaction data to understand customer purchasing behaviour, benchmark store performance and deliver insights in a client-ready report.",
        items: [
          {
            label: "Transaction Analysis",
            file: "Quantium_Transaction_Analysis.pdf",
            tooltip:
              "Analysed transaction-level data to uncover purchasing patterns and customer segments."
          },
          {
            label: "Benchmark Store Analysis",
            file: "Quantium_Benchmark_Store_Analysis.pdf",
            tooltip:
              "Compared store performance against benchmarks to identify under- and over-performing locations."
          },
          {
            label: "Client Report",
            file: "Quantium_Client_Report.pdf",
            tooltip:
              "Summarised key insights and recommendations in a concise, client-facing report."
          }
        ]
      }
    ]
  };

  function openModal(card) {
    const projectType = card.getAttribute("data-project");
    const img = card.querySelector("img");

    // show modal
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    // image
    if (img) {
      modalImage.src = img.src;
      modalImage.alt = img.alt || "";
    } else {
      modalImage.src = "";
      modalImage.alt = "";
    }

    // reset content
    modalTitle.textContent = "";
    modalDescription.textContent = "";
    modalLinks.innerHTML = "";

    if (projectType === "finance") {
      // intro at top of links area
      const intro = document.createElement("div");
      intro.classList.add("finance-intro");

      const introTitle = document.createElement("h2");
      introTitle.textContent = financeProjects.title;
      intro.appendChild(introTitle);

      const introDesc = document.createElement("p");
      introDesc.textContent = financeProjects.description;
      intro.appendChild(introDesc);

      modalLinks.appendChild(intro);

      // optional: keep main title minimal
      modalTitle.textContent = "Finance Projects";
      modalDescription.textContent = "";

      financeProjects.sections.forEach((section) => {
        const sectionEl = document.createElement("div");
        sectionEl.classList.add("modal-section");

        const h3 = document.createElement("h3");
        h3.textContent = section.heading;
        sectionEl.appendChild(h3);

        if (section.projectDescription) {
          const p = document.createElement("p");
          p.textContent = section.projectDescription;
          sectionEl.appendChild(p);
        }

        const ul = document.createElement("ul");
        section.items.forEach((item) => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.href = item.file;  // make sure filenames match your actual PDFs
          link.target = "_blank";
          link.rel = "noopener";
          link.textContent = item.label;
          if (item.tooltip) {
            link.title = item.tooltip;  // hover tooltip
          }
          li.appendChild(link);
          ul.appendChild(li);
        });

        sectionEl.appendChild(ul);
        modalLinks.appendChild(sectionEl);
      });
    } else if (projectType === "health") {
      modalTitle.textContent = "Health Analytics Projects";
      modalDescription.textContent =
        "Exploratory and predictive work focused on healthcare data, clinical trends and patient outcomes. More detailed case studies will be added soon.";
    } else if (projectType === "sport") {
      modalTitle.textContent = "Sport Analytics Projects";
      modalDescription.textContent =
        "Data-driven analysis of performance metrics, game outcomes and sports strategy across sports like American football and rugby.";
    } else if (projectType === "fun") {
      modalTitle.textContent = "Fun & Experimental Projects";
      modalDescription.textContent =
        "Personal experiments, creative analyses and playful data explorations built for curiosity and learning.";
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

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

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
  if (window.tsParticles) {
    tsParticles.load("tsparticles", {
      background: {
        color: {
          value: "#050816",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 2,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#8888ff",
          distance: 120,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        collisions: {
          enable: false,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 60,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 4 },
        },
      },
      detectRetina: true,
    });
  }
});
