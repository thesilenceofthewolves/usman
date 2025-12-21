console.log("script.js is running...");

/* ----------------------
   tsParticles
------------------------- */
tsParticles.load("tsparticles", {
  fpsLimit: 60,
  particles: {
    number: { value: 70, density: { enable: true, area: 900 } },
    color: { value: "#999999" },
    shape: { type: "circle" },
    opacity: { value: 0.7 },
    size: { value: 3, random: { enable: true, minimumValue: 1 } },
    links: { enable: true, distance: 130, color: "#888888", opacity: 0.8, width: 1.5 },
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
   Filter Buttons
------------------------- */
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

/* ----------------------
   Modal System
------------------------- */
const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-button");

/* ✅ Finance Simulation Projects */
const financeProjects = {
  "British Airways — Data Science Simulation": {
    description:
      "A data science simulation focused on understanding customer behaviour and improving lounge operations. The project involved analysing customer datasets, identifying usage patterns, and building insights to support operational decision‑making.",
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
      "A simulation project centred on customer behaviour, financial product usage, and churn prediction. The goal was to analyse customer data, identify risk factors, and build a model to support retention strategies.",
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
      "A retail analytics simulation focused on customer purchasing behaviour and store performance. The project involved analysing transaction data, identifying trends, and preparing insights for a client presentation.",
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

/* ✅ Open category modal */
function openCategory(category) {
  modal.classList.add("show");

  if (category === "finance") {
    showFinanceList();
  } else {
    showSimpleCategory(category);
  }
}

/* ✅ Simple categories */
function showSimpleCategory(category) {
  const titles = {
    health: "Health Projects",
    sport: "Sport Projects",
    fun: "Fun Projects"
  };

  const descriptions = {
    health: "Health data insights and clinical trends.",
    sport: "Performance metrics and sports statistics.",
    fun: "Creative fun analysis, games & trends."
  };

  modalBody.innerHTML = `
    <h2>${titles[category]}</h2>
    <p>${descriptions[category]}</p>
  `;
}

/* ✅ Finance list view */
function showFinanceList() {
  modalBody.innerHTML = `
    <h2>Finance Simulation Projects</h2>
    <ul class="finance-list">
      ${Object.keys(financeProjects)
        .map(name => `<li onclick="openFinanceProject('${name}')">${name}</li>`)
        .join("")}
    </ul>
  `;
}

/* ✅ Finance project view */
window.openFinanceProject = function(name) {
  const project = financeProjects[name];

  modalBody.innerHTML = `
    <span class="back-button" onclick="showFinanceList()">← Back to Finance Projects</span>
    <h2>${name}</h2>
    <p>${project.description}</p>

    <h3>Tasks</h3>
    <ul class="task-list">
      ${project.tasks
        .map(
          t => `
        <li>
          <a href="${t.file}" target="_blank" data-tooltip="${t.tooltip}">
            ${t.label}
          </a>
        </li>`
        )
        .join("")}
    </ul>
  `;
};

/* ✅ Click handlers for project cards */
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const category = card.getAttribute("data-category");
    openCategory(category);
  });
});

/* ✅ Close modal */
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("show");
});

/* ----------------------
   Dark / Light Mode Toggle
------------------------- */
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
