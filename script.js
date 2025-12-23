console.log("script.js is running...");

/* ----------------------
   tsParticles
------------------------- */
tsParticles.load("tsparticles", {
  fpsLimit: 60,
  background: { color: { value: "transparent" } },
  particles: {
    number: { value: 70, density: { enable: true, area: 900 } },
    color: { value: "#666666" },
    shape: { type: "circle" },
    opacity: { value: 0.7 },
    size: { value: 3, random: { enable: true, minimumValue: 1 } },
    links: { enable: true, distance: 130, color: "#555555", opacity: 0.8, width: 1.5 },
    move: { enable: true, speed: 1.6, outModes: { default: "bounce" } }
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

/* ----------------------
   Category filters
------------------------- */
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

/* ----------------------
   Modal wiring
------------------------- */
const modal = document.getElementById("project-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalLinks = document.getElementById("modal-links");
const modalClose = document.getElementById("modal-close");

/* ----------------------
   Modal Helpers
------------------------- */
function openModal() {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

/* ----------------------
   Finance Projects
------------------------- */
const financeProjects = {
  "British Airways — Data Science Simulation": {
    description:
      "A data science simulation focused on understanding customer behaviour and improving lounge operations.",
    tasks: [
      {
        label: "Lounge Demand Analysis",
        file: "BritishAirways_Task1_Lounge_Demand_Analysis.pdf",
        tooltip: "Analysed lounge usage, peak times, and demand patterns."
      },
      {
        label: "Customer Segmentation Model",
        file: "BritishAirways_Task2_Customer_Model.pdf",
        tooltip: "Built a predictive model to segment customers."
      }
    ]
  },

  "Lloyds Banking Group — Data Science Simulation": {
    description:
      "A simulation project centred on customer behaviour, financial product usage, and churn prediction.",
    tasks: [
      {
        label: "Customer Analysis",
        file: "Lloyds_Task1_Customer_Analysis.pdf",
        tooltip: "Explored demographics, spending behaviour, and engagement."
      },
      {
        label: "Predictive Churn Model",
        file: "Lloyds_Task2_Predictive_Model.pdf",
        tooltip: "Developed a machine learning model to predict churn."
      }
    ]
  },

  "Quantium — Data Analytics Simulation": {
    description:
      "A retail analytics simulation focused on customer purchasing behaviour and store performance.",
    tasks: [
      {
        label: "Transaction Analysis",
        file: "Quantium_Task1_Transaction_Analysis.pdf",
        tooltip: "Investigated purchasing patterns and product performance."
      },
      {
        label: "Benchmark Store Analysis",
        file: "Quantium_Task2_Benchmark_Store_Analysis.pdf",
        tooltip: "Compared store performance against benchmarks."
      },
      {
        label: "Client Insights Report",
        file: "Quantium_Task3_Client_Report.pdf",
        tooltip: "Delivered insights and recommendations."
      }
    ]
  }
};

/* ----------------------
   FUN Projects (Baby Names etc.)
------------------------- */
const funProjects = {
  "US Baby Names Analysis": {
    description:
      "A two-part analytical project exploring over a century of US baby name data. Part I focuses on long-term popularity trends, gender patterns, and cultural naming shifts. Part II provides a deeper analysis of name lifespans, examining rise-and-fall cycles, generational peaks, and long-term behavioural patterns across the dataset.",
    tasks: [
      {
        label: "Full Project PDF",
        file: "Baby_Names_Analysis.pdf",
        tooltip: "Download the complete analysis report."
      }
    ]
  }
};

/* ----------------------
   Finance List
------------------------- */
function openFinanceList() {
  openModal();

  modalImage.style.display = "none";
  modalTitle.textContent = "Finance Simulation Projects";
  modalDescription.textContent =
    "A collection of simulation projects with real companies.";

  modalLinks.innerHTML = `
    <ul class="finance-list" style="list-style:none; padding-left:0;">
      ${Object.keys(financeProjects)
        .map(
          (name) => `
        <li data-project="${name}" style="cursor:pointer; padding:8px 0; color:#ccc;">
          ${name}
        </li>`
        )
        .join("")}
    </ul>
  `;

  modalLinks.querySelectorAll("li[data-project]").forEach((li) => {
    li.addEventListener("click", () =>
      openFinanceProject(li.getAttribute("data-project"))
    );
  });
}

/* ----------------------
   Finance Project View
------------------------- */
function openFinanceProject(name) {
  const project = financeProjects[name];
  if (!project) return;

  openModal();

  modalImage.style.display = "none";
  modalTitle.textContent = name;
  modalDescription.textContent = project.description;

  modalLinks.innerHTML = `
    <span class="back-button" id="finance-back">← Back to Finance Projects</span>
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

  document.getElementById("finance-back").addEventListener("click", openFinanceList);
}

/* ----------------------
   FUN List (MATCHES FINANCE)
------------------------- */
function openFunList() {
  openModal();

  modalImage.style.display = "none";
  modalTitle.textContent = "Fun Projects";
  modalDescription.textContent =
    "A collection of creative and exploratory data projects.";

  modalLinks.innerHTML = `
    <ul class="fun-list" style="list-style:none; padding-left:0;">
      ${Object.keys(funProjects)
        .map(
          (name) => `
        <li data-project="${name}" style="cursor:pointer; padding:8px 0; color:#ccc;">
          ${name}
        </li>`
        )
        .join("")}
    </ul>
  `;

  modalLinks.querySelectorAll("li[data-project]").forEach((li) => {
    li.addEventListener("click", () =>
      openFunProject(li.getAttribute("data-project"))
    );
  });
}

/* ----------------------
   FUN Project View (MATCHES FINANCE)
------------------------- */
function openFunProject(name) {
  const project = funProjects[name];
  if (!project) return;

  openModal();

  modalImage.style.display = "none";
  modalTitle.textContent = name;
  modalDescription.textContent = project.description;

  modalLinks.innerHTML = `
    <span class="back-button" id="fun-back">← Back to Fun Projects</span>
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

  document.getElementById("fun-back").addEventListener("click", openFunList);
}

/* ----------------------
   Simple Categories (Health, Sport)
------------------------- */
function openSimpleCategory(card) {
  openModal();

  const imageSrc = card.querySelector("img")?.src || "";
  const titleText = card.querySelector(".overlay")?.textContent || "";
  const description = card.getAttribute("data-description") || "";

  modalImage.style.display = imageSrc ? "block" : "none";
  modalImage.src = imageSrc;
  modalImage.alt = titleText;

  modalTitle.textContent = titleText;
  modalDescription.textContent = description;
  modalLinks.innerHTML = "";
}

/* ----------------------
   Card Click Handler
------------------------- */
projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.getAttribute("data-category");

    if (category === "finance") {
      openFinanceList();
    } else if (category === "fun") {
      openFunList();
    } else {
      openSimpleCategory(card);
    }
  });
});

/* ----------------------
   Close Modal
------------------------- */
modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

/* ----------------------
   Light / Dark Toggle
------------------------- */
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
