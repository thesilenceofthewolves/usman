// ===============================
//   PROJECT DATA
// ===============================

const projects = {
  britishAirways: {
    title: "British Airways – Customer Insights & Lounge Demand Analysis",
    description:
      "Analysed lounge demand patterns and built a customer model to understand usage, segment passengers and support capacity planning.",
    tasks: [
      {
        label: "Lounge Demand Analysis",
        file: "BritishAirways_Task1_Lounge_Demand_Analysis.pdf",
        tooltip: "Analysed lounge usage data to forecast demand and identify capacity bottlenecks."
      },
      {
        label: "Customer Model",
        file: "BritishAirways_Task2_Customer_Model.pdf",
        tooltip: "Developed a customer segmentation model to understand passenger behaviour."
      }
    ]
  },

  lloyds: {
    title: "Lloyds Banking Group – Customer Behaviour & Predictive Modelling",
    description:
      "Explored customer behaviour patterns and developed a predictive model to support product targeting and retention strategy.",
    tasks: [
      {
        label: "Customer Analysis",
        file: "Lloyds_Task1_Customer_Analysis.pdf",
        tooltip: "Analysed customer behaviour patterns to identify key drivers of engagement."
      },
      {
        label: "Predictive Model",
        file: "Lloyds_Task2_Predictive_Model.pdf",
        tooltip: "Built a predictive model to support customer retention and product targeting."
      }
    ]
  },

  quantium: {
    title: "Quantium – Retail Analytics & Client Reporting",
    description:
      "Used transaction data to understand customer purchasing behaviour, benchmark store performance and deliver insights in a client-ready report.",
    tasks: [
      {
        label: "Transaction Analysis",
        file: "Quantium_Task1_Transaction_Analysis.pdf",
        tooltip: "Analysed transaction-level data to uncover purchasing patterns."
      },
      {
        label: "Benchmark Store Analysis",
        file: "Quantium_Task2_Benchmark_Store_Analysis.pdf",
        tooltip: "Benchmarked store performance using customer and sales metrics."
      },
      {
        label: "Client Report",
        file: "Quantium_Task3_Client_Report.pdf",
        tooltip: "Delivered insights in a structured, client-ready report."
      }
    ]
  }
};

// ===============================
//   MODAL LOGIC
// ===============================

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTasks = document.getElementById("modalTasks");
const closeModal = document.getElementById("closeModal");

// Open modal when clicking a project card
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const projectKey = card.getAttribute("data-project");
    const project = projects[projectKey];

    if (project) {
      modalTitle.textContent = project.title;
      modalDescription.textContent = project.description;

      modalTasks.innerHTML = "";
      project.tasks.forEach(task => {
        const li = document.createElement("li");

        const link = document.createElement("a");
        link.href = task.file;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = task.label;
        link.title = task.tooltip;

        li.appendChild(link);
        modalTasks.appendChild(li);
      });

      modal.style.display = "block";
    }
  });
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside content
window.addEventListener("click", event => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
