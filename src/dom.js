import { displayProjects, addProject, allProjects } from "./project.js";
import { displayTasks } from "./task.js";


const overlay = document.querySelector(".modal-overlay");
const modal = document.querySelector("#taskModal");
const addTaskButton = document.getElementById("add-task");
const priorityButtons = document.querySelectorAll(".priority-button");
const addProjectButton = document.getElementById("add-project-button");
const taskNewButton = document.querySelector(".task-new");
const closeModalButton = document.querySelector(".x");
const myProjectsContainer = document.querySelector(".my-projects");

let selectedProjectId = null;

export function initializeProjects() {
  displayProjects();
}

addProjectButton.addEventListener("click", () => {
  const projectName = prompt("Please add new project name:");

  if (projectName) {
    addProject(projectName);
    displayProjects();
  }
});

myProjectsContainer.addEventListener("click", (e) => {
  const clickedProject = e.target.closest(".my-projects-block");

  if (clickedProject) {
    document.querySelectorAll(".my-projects-block").forEach((projectBlock) => {
      projectBlock.style.color = "black";
    });

    clickedProject.style.color = "rgb(111, 104, 104)";

    selectedProjectId = clickedProject.getAttribute("data-id");

    displayTasks(selectedProjectId);
    taskNewButton.style.display = "block";
    document.querySelector(".task-delete").style.display = "block";
  }
});

taskNewButton.addEventListener("click", () => {
  if (selectedProjectId) {
    modal.classList.add("active");
    overlay.style.display = "block";
  } else {
    alert("Please select a project first!");
  }
});

function closeModal() {
  modal.classList.remove("active");
  overlay.style.display = "none";
  resetForm();
}

closeModalButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("priority-button")) {
    priorityButtons.forEach((btn) => btn.classList.remove("selected"));
    e.target.classList.add("selected");
  }
});

addTaskButton.addEventListener("click", () => {
  const title = document.querySelector("#title").value.trim();
  const desc = document.querySelector("#desc").value.trim();
  const dueDate = document.querySelector("#form-date").value;
  const priority =
    document.querySelector(".priority-button.selected")?.id || "p-low";

  if (!title || !desc || !dueDate) {
    alert("Please fill all the blanks!");
    return;
  }

  const newTask = {
    projectId: selectedProjectId,
    title,
    detail: desc,
    dueDate,
    priority: priority.replace("p-", ""), // "p-low" → "low"
    isDone: false,
  };

  const project = allProjects.find((proj) => proj.id === selectedProjectId);
  if (!project) {
    alert("Project not found!");
    return;
  }

  project.tasks.push(newTask);
  displayTasks(selectedProjectId);
  closeModal();
});

function resetForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#desc").value = "";
  document.querySelector("#form-date").value = "";
  priorityButtons.forEach((btn) => btn.classList.remove("selected"));
}
