console.log("script.js is running...");

/* =========================================================
   tsParticles
========================================================= */
tsParticles.load("tsparticles", {
  fpsLimit: 60,
  background: {
    color: { value: "transparent" }
  },
  particles: {
    number: { value: 70, density: { enable: true, area: 900 } },
    color: { value: "#666666" },
    shape: { type: "circle" },
    opacity: { value: 0.7 },
    size: { value: 3, random: { enable: true, minimumValue: 1 } },
    links: {
      enable: true,
      distance: 130,
      color: "#555555",
      opacity: 0.8,
      width: 1.5
    },
    move: {
      enable: true,
      speed: 1.6,
      outModes: { default: "bounce" }
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 180, links: { opacity: 1 } },
      push: { quantity: 4 }
    }
  },
  detectRetina: true
});

/* =========================================================
   Category Filters
========================================================= */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      card.style.display =
        category === "all" || cardCategory === category ? "block" : "none";
    });
  });
});

/* =========================================================
   Modal Wiring
========================================================= */
const modal = document.getElementById("project-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalLinks = document.getElementById("modal-links");
const modalClose = document.getElementById("modal-close");

/* =========================================================
   Finance Simulation Data
========================================================= */
const financeProjects = {
  "British Airways — Data Science Simulation": {
    description:
      "A data science simulation focused on understanding customer behaviour and improving lounge operations.",
    tasks: [
      {
        label: "Lounge Demand Analysis",
        file: "BritishAirways_Task1_Lounge_Demand_Analysis.pdf",
        tooltip: "Analysed lounge usage and peak demand."
      },
      {
        label: "Customer Segmentation Model",
        file: "BritishAirways_Task2_Customer_Model.pdf",
        tooltip: "Built a predictive customer segmentation model."
      }
    ]
  },

  "Lloyds Banking Group — Data Science Simulation": {
    description:
      "A simulation project centred on customer behaviour and churn prediction.",
    tasks: [
      {
        label: "Customer Analysis",
        file: "Lloyds_Task1_Customer_Analysis.pdf",
        tooltip: "Explored customer demographics and engagement."
      },
      {
        label: "Predictive Churn Model",
        file: "Lloyds_Task2_Predictive_Model.pdf",
        tooltip: "Developed a churn prediction model."
      }
    ]
  },

  "Quantium — Data Analytics Simulation": {
    description:
      "A retail analytics simulation focused on customer purchasing behaviour.",
    tasks: [
      {
        label: "Transaction Analysis",
        file: "Quantium_Task1_Transaction_Analysis.pdf",
        tooltip: "Analysed purchasing patterns."
      },
      {
        label: "Benchmark Store Analysis",
        file: "Quantium_Task2_Benchmark_Store_Analysis.pdf",
        tooltip: "Compared store performance."
      },
      {
        label: "Client Insights Report",
        file: "Quantium_Task3_Client_Report.pdf",
        tooltip: "Delivered client recommendations."
      }
    ]
  }
};

/* =========================================================
   Fun Projects
========================================================= */
const funProjects = {
  "US Baby Names Analysis": {
    description:
      "A multi-part analysis of US baby name trends, lifespans, and popularity cycles" ,
   github: "https://github.com/thesilenceofthewolves/BabyNameAnalysis",
    tasks: [
      {
        label: "Part I — Trends & Patterns",
        file: "Baby_Names_Part1.pdf",
        tooltip: "Open the notebook in GitHub"
      },
       {
        label: "Part II — Trends & Patterns",
        file: "Baby_Names_Part1.pdf",
        tooltip: "Open the notebook in GitHub"
         },
      {
        label: "Part III — Lifespan & Cycles",
        file: "https://github.com/thesilenceofthewolves/BabyNameAnalysis/blob/main/notebooks/NamesAnalysis3.ipynb",
        tooltip: "Open the notebook in GitHub"
      }
    ]
  }
};

/* =========================================================
   Modal Helpers
========================================================= */
function openModal() {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

/* =========================================================
   Simple Category Modals
========================================================= */
function openSimpleCategory(card) {
  const category = card.getAttribute("data-category");
  const imageSrc = card.querySelector("img")?.src || "";
  const titleText = card.querySelector(".overlay")?.textContent || "";

  const descriptions = {
    health: "Health data insights and clinical trends.",
    sport: "Performance metrics and sports analytics.",
    fun: "Creative analysis and exploratory projects."
  };

  modalImage.style.display = imageSrc ? "block" : "none";
  modalImage.src = imageSrc;
  modalImage.alt = titleText || "Project image";
  modalTitle.textContent = titleText || "Project";
  modalDescription.textContent = descriptions[category] || "";
  modalLinks.innerHTML = "";

  openModal();
}

/* =========================================================
   Finance Modals
========================================================= */
function openFinanceList() {
  modalImage.style.display = "none";
  modalTitle.textContent = "Finance Simulation Projects";
  modalDescription.textContent =
    "A collection of business and financial analytics simulations.";

  modalLinks.innerHTML = `
    <ul class="finance-list">
      ${Object.keys(financeProjects)
        .map((name) => `<li data-project="${name}">${name}</li>`)
        .join("")}
    </ul>
  `;

  modalLinks.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      openFinanceProject(li.getAttribute("data-project"));
    });
  });

  openModal();
}

function openFinanceProject(name) {
  const project = financeProjects[name];
  if (!project) return;

  modalImage.style.display = "none";
  modalTitle.textContent = name;
  modalDescription.textContent = project.description;

  modalLinks.innerHTML = `
    <span class="back-button" id="finance-back">← Back</span>
    <h3>Tasks</h3>
    <ul class="task-list">
      ${project.tasks
        .map(
          (t) => `
        <li>
          <a href="${t.file}" target="_blank" title="${t.tooltip}">
            ${t.label}
          </a>
        </li>`
        )
        .join("")}
    </ul>
  `;

  document
    .getElementById("finance-back")
    .addEventListener("click", openFinanceList);

  openModal();
}

/* =========================================================
   Fun Modals
========================================================= */
function openFunList() {
  modalImage.style.display = "none";
  modalTitle.textContent = "Fun Projects";
  modalDescription.textContent =
    "Creative and exploratory data projects.";

  modalLinks.innerHTML = `
    <ul class="fun-list">
      ${Object.keys(funProjects)
        .map((name) => `<li data-project="${name}">${name}</li>`)
        .join("")}
    </ul>
  `;

  modalLinks.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      openFunProject(li.getAttribute("data-project"));
    });
  });

  openModal();
}

function openFunProject(name) {
  const project = funProjects[name];
  if (!project) return;

  modalImage.style.display = "none";
  modalTitle.textContent = name;
  modalDescription.textContent = project.description;
   
/* link to get to github */
   
 let githubButton = "";
if (project.github) {
  githubButton = `
    <li>
      <a href="${project.github}" target="_blank" title="Open the project on GitHub">
        <u>Full project description and Tasks</u>
      </a>
    </li>
  `;
}
  
  modalLinks.innerHTML = ` 
  <span class="back-button" id="fun-back">← Back</span> 
  <h3>Tasks</h3>
  <ul class="task-list">
  ${githubButton} 
  ${project.tasks
    .map( (t) => ` 
    <li> 
    <a href="${t.file}" target="_blank" title="${t.tooltip}">
    ${t.label} </a> 
    </li>`
        ) 
    .join("")}
    </ul>
    `;

  document
    .getElementById("fun-back")
    .addEventListener("click", openFunList);

  openModal();
}

/* =========================================================
   Card Wiring  ✅ FIX HERE
========================================================= */
projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.getAttribute("data-category");

    if (category === "finance") {
      openFinanceList();
    } else if (category === "fun") {
      openFunList(); // 
    } else {
      openSimpleCategory(card);
    }
  });
});

/* =========================================================
   Modal Close Events
========================================================= */
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

/* =========================================================
   Light / Dark Theme Toggle
========================================================= */
const toggle = document.createElement("div");
toggle.className = "theme-toggle";
toggle.innerHTML = `
  <span>☀️</span>
  <span>🌙</span>
  <div class="knob"></div>
`;

document.body.appendChild(toggle);
document.body.classList.add("dark");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
