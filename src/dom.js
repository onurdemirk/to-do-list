import {
  displayProjects,
  addProject,
  getProjectById,
  getProjectNameById,
} from "./project.js";
import {
  displayTasks,
  displayTasksAll,
  displayTasksInWeek,
  displayTasksInDay,
} from "./task.js";
import { formatTaskDate, tasksInWeek, tasksInDay } from "./date.js";
import { home, today, week } from "./dom-side-bar.js";
import {
  saveProjectsToLocalStorage,
  getProjectsFromLocalStorage,
} from "./local-storage.js";

home();

let page = "";

const overlay = document.querySelector(".modal-overlay");
const modal = document.querySelector("#taskModal");
const addTaskButton = document.getElementById("add-task");
const priorityButtons = document.querySelectorAll(".priority-button");
const addProjectButton = document.getElementById("add-project-button");
const taskNewButton = document.querySelector(".task-new");
const projectDeleteButton = document.querySelector(".project-delete");
const closeModalButton = document.querySelector(".x");
const myProjectsContainer = document.querySelector(".my-projects");
const taskDetailsForm = document.querySelector(".taskDetailsFormModal");
const tasksContainer = document.querySelector(".task-container");
const closeTDFButton = document.querySelector(".tdf-close");
const homeButton = document.getElementById("home-button");
const weekButton = document.getElementById("week-button");
const todayButton = document.getElementById("today-button");
const projectWindow = document.querySelector(".add-project-window");
const projectName = document.getElementById("add-project-name");

let selectedProjectId = null;

function resetForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#desc").value = "";
  document.querySelector("#form-date").value = "";
  document.querySelector(".modal-form-project-name").textContent = "";
  priorityButtons.forEach((btn) => btn.classList.remove("selected"));
}

function closeModal() {
  modal.classList.remove("active");
  taskDetailsForm.classList.remove("active");
  overlay.style.display = "none";
  projectWindow.classList.remove("active");
  projectName.value = "";
  resetForm();
}

export function initializeProjects() {
  displayProjects();
}

addProjectButton.addEventListener("click", () => {
  projectWindow.classList.add("active");
  overlay.style.display = "block";
  document.getElementById("error-message").style.display = "none";

  document
    .querySelector(".add-project-form-new")
    .addEventListener("click", () => {
      if (projectName.value) {
        addProject(projectName.value.trim());
        displayProjects();

        const projects = getProjectsFromLocalStorage();
        const newProject = projects[projects.length - 1];
        selectedProjectId = newProject.id;

        taskNewButton.style.display = "block";
        projectDeleteButton.style.display = "block";

        projectDeleteButton.setAttribute("data-project-id", selectedProjectId);
        taskNewButton.setAttribute("data-project-id", selectedProjectId);

        closeModal();

        page = "projects";
        pageDirection(selectedProjectId);
      } else {
        document.getElementById("error-message").style.display = "block";
      }
    });

  document
    .querySelector(".add-project-form-cancel")
    .addEventListener("click", () => {
      closeModal();
    });
});

myProjectsContainer.addEventListener("click", (e) => {
  const clickedProject = e.target.closest(".my-projects-block");

  if (clickedProject) {
    document.querySelectorAll(".my-projects-block").forEach((projectBlock) => {
      projectBlock.style.color = "black";
      const projectNameElement = projectBlock.querySelector(".project-name");
      projectNameElement.textContent = projectNameElement.textContent.replace(
        /^#\s*/,
        ""
      );

      homeButton.style.color = "black";
      weekButton.style.color = "black";
      todayButton.style.color = "black";

      todayButton.textContent = "Today";
      homeButton.textContent = "Home";
      weekButton.textContent = "Week";
    });

    clickedProject.style.color = "rgb(111, 104, 104)";
    const projectName = clickedProject.querySelector(".project-name");

    if (!projectName.textContent.startsWith("#")) {
      projectName.textContent = `# ${projectName.textContent}`;
    }

    selectedProjectId = clickedProject.getAttribute("data-project-id");

    taskNewButton.style.display = "block";
    projectDeleteButton.style.display = "block";

    projectDeleteButton.setAttribute("data-project-id", selectedProjectId);
    taskNewButton.setAttribute("data-project-id", selectedProjectId);

    page = "projects";
    pageDirection(selectedProjectId);
  }
});

taskNewButton.addEventListener("click", () => {
  console.log("taskNewButton clicked! selectedProjectId:", selectedProjectId);

  if (selectedProjectId) {
    modal.classList.add("active");
    overlay.style.display = "block";

    modal.setAttribute("data-project-id", selectedProjectId);
    modal.setAttribute("data-mode", "add");

    const projectName = getProjectNameById(selectedProjectId);
    document.querySelector(
      ".modal-form-project-name"
    ).textContent = `Project Name: ${projectName}`;

    page = "projects";
    pageDirection(selectedProjectId);
  } else {
    alert("Please select a project first!");
  }
});

closeModalButton.addEventListener("click", () => {
  closeModal();

  document.getElementById("add-task").textContent = "ADD TASK";
  document.querySelector(".modal-header-text").textContent =
    "# Create a new Task";
});

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

  document.getElementById("add-task").textContent = "ADD TASK";
  document.querySelector(".modal-header-text").textContent =
    "# Create a new Task";

  const mode = modal.getAttribute("data-mode");
  const projectId = modal.getAttribute("data-project-id");
  const projects = getProjectsFromLocalStorage();

  const selectedProject = projects.find((project) => project.id === projectId);
  if (!selectedProject) {
    alert("Project not found!");
    return;
  }

  if (mode === "edit") {
    const taskId = modal.getAttribute("task-id");
    const selectedTask = selectedProject.tasks.find(
      (task) => task.taskId === taskId
    );

    if (!selectedTask) {
      console.error(`Task not found for ID: ${taskId}`);
      alert("Task not found!");
      return;
    }

    selectedTask.title = document.querySelector("#title").value;

    selectedTask.detail = document.querySelector("#desc").value;
    selectedTask.dueDate = document.querySelector("#form-date").value;

    const selectedPriority = document.querySelector(
      ".priority-button.selected"
    );
    selectedTask.priority = selectedPriority
      ? selectedPriority.textContent.toLowerCase()
      : "low";

    saveProjectsToLocalStorage(projects);

    displayProjects();

    page = "projects";
    pageDirection(projectId);

    closeModal();

    modal.removeAttribute("data-mode");

    return;
  }

  const newTask = {
    projectId,
    taskId: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title,
    detail: desc,
    dueDate,
    priority: priority.replace("p-", ""), // "p-low" → "low"
    isDone: false,
  };

  selectedProject.tasks.push(newTask);

  saveProjectsToLocalStorage(projects);

  displayProjects();

  page = "projects";
  pageDirection(projectId);
  closeModal();
});

tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("task-details")) {
    const projectId = e.target.getAttribute("data-project-id");
    const taskId = e.target.getAttribute("task-id");

    const selectedProject = getProjectById(projectId);
    const selectedTask = selectedProject.tasks.find(
      (task) => task.taskId === taskId
    );
    const selectedProjectName = getProjectNameById(projectId);

    document.querySelector(".tdf-task-name").textContent = selectedTask.title;

    document.querySelector(
      ".tdf-project-name"
    ).textContent = `Project: ${selectedProjectName}`;
    document.querySelector(".tdf-priority").textContent = `Priority: ${
      selectedTask.priority.charAt(0).toUpperCase() +
      selectedTask.priority.slice(1).toLowerCase()
    }`;
    document.querySelector(
      ".tdf-due-date"
    ).textContent = `Due Date: ${formatTaskDate(selectedTask.dueDate)}`;
    document.querySelector(
      ".tdf-detail"
    ).textContent = `Details: ${selectedTask.detail}`;

    overlay.style.display = "block";
    taskDetailsForm.classList.add("active");
  } else if (e.target.id === "task-edit") {
    const projectId = e.target.getAttribute("data-project-id");
    const taskId = e.target.getAttribute("task-id");

    const projects = getProjectsFromLocalStorage();
    const project = projects.find((proj) => proj.id === projectId);
    const task = project.tasks.find((t) => t.taskId === taskId);

    const selectedProjectName = getProjectNameById(projectId);

    document.querySelector("#title").value = task.title;
    document.querySelector("#desc").value = task.detail;
    document.querySelector("#form-date").value = task.dueDate;
    document.querySelector(
      ".modal-form-project-name"
    ).textContent = `Project: ${selectedProjectName}`;
    document.querySelector(".modal-header-text").textContent = "# Edit Task";

    if (task.priority === "high") {
      document.getElementById("p-high").classList.add("selected");
    } else if (task.priority === "medium") {
      document.getElementById("p-medium").classList.add("selected");
    } else {
      document.getElementById("p-low").classList.add("selected");
    }

    document.getElementById("add-task").textContent = "EDIT TASK";

    overlay.style.display = "block";
    modal.classList.add("active");

    modal.setAttribute("data-project-id", projectId);
    modal.setAttribute("task-id", taskId);
    modal.setAttribute("data-mode", "edit");
  } else if (e.target.id === "task-delete") {
    const projectId = e.target.getAttribute("data-project-id");
    const taskId = e.target.getAttribute("task-id");

    const projects = getProjectsFromLocalStorage();
    const project = projects.find((proj) => proj.id === projectId);

    project.tasks = project.tasks.filter((task) => task.taskId !== taskId);

    saveProjectsToLocalStorage(projects);

    displayProjects();
    pageDirection(projectId);
  }
});

closeTDFButton.addEventListener("click", () => {
  taskDetailsForm.classList.remove("active");
  overlay.style.display = "none";
});

document.querySelector(".project-delete").addEventListener("click", (e) => {
  const projectId = e.target.getAttribute("data-project-id");

  const projects = getProjectsFromLocalStorage();

  const updatedProjects = projects.filter((proj) => proj.id !== projectId);
  saveProjectsToLocalStorage(updatedProjects);

  displayProjects();

  selectedProjectId = null;
  home();
});

document.querySelector(".task-container").addEventListener("click", (e) => {
  if (e.target.classList.contains("task-done")) {
    const projectId = e.target.getAttribute("data-project-id");
    const taskId = e.target.getAttribute("task-id");

    const projects = getProjectsFromLocalStorage();
    const selectedProject = projects.find((proj) => proj.id === projectId);

    const taskMenu = e.target.closest(".task-menu");
    const taskTitle = taskMenu.querySelector(".task-title");

    const selectedTask = selectedProject.tasks.find(
      (task) => task.taskId === taskId
    );

    if (e.target.checked) {
      e.target.classList.add("checked");
      taskTitle.classList.add("checked");
      taskMenu.classList.add("checked");
      selectedTask.isDone = true;
    } else {
      e.target.classList.remove("checked");
      taskTitle.classList.remove("checked");
      taskMenu.classList.remove("checked");
      selectedTask.isDone = false;
    }

    saveProjectsToLocalStorage(projects);
    displayProjects();
  }
});

homeButton.addEventListener("click", () => {
  page = "home";
  displayProjects();
  home();
});

weekButton.addEventListener("click", () => {
  page = "week";
  displayProjects();
  week();
});

todayButton.addEventListener("click", () => {
  page = "today";
  displayProjects();
  today();
});

export function updateProjectNumbers() {
  const projects = getProjectsFromLocalStorage();

  projects.forEach((project) => {
    const taskNumberElement = document.querySelector(
      `.project-number[data-project-id="${project.id}"]`
    );

    if (taskNumberElement) {
      const incompleteTasks = project.tasks.filter((task) => !task.isDone);
      taskNumberElement.textContent = incompleteTasks.length;
    }
  });

  const allTasks = document.getElementById("home-number");
  allTasks.innerHTML = projects.reduce((count, project) => {
    return count + project.tasks.filter((task) => !task.isDone).length;
  }, 0);

  const weekTasks = document.getElementById("week-number");
  weekTasks.innerHTML = projects.reduce((count, project) => {
    const incompleteTasksInWeek = tasksInWeek(project.tasks).filter(
      (task) => !task.isDone
    );
    return count + incompleteTasksInWeek.length;
  }, 0);

  const todayTasks = document.getElementById("today-number");
  todayTasks.innerHTML = projects.reduce((count, project) => {
    const incompleteTasksInDay = tasksInDay(project.tasks).filter(
      (task) => !task.isDone
    );
    return count + incompleteTasksInDay.length;
  }, 0);
}

function pageDirection(project) {
  if (page === "home") {
    return home();
  } else if (page === "today") {
    return today();
  } else if (page === "week") {
    return week();
  } else if (page === "projects") {
    document.querySelectorAll(".my-projects-block").forEach((projectBlock) => {
      const projectNameElement = projectBlock.querySelector(".project-name");

      projectBlock.style.color = "black";
      if (projectNameElement.textContent.startsWith("#")) {
        projectNameElement.textContent = projectNameElement.textContent.replace(
          /^#\s*/,
          ""
        );
      }
    });

    const clickedProject = document.querySelector(
      `.my-projects-block[data-project-id="${project}"]`
    );

    if (clickedProject) {
      clickedProject.style.color = "rgb(111, 104, 104)";
      const projectName = clickedProject.querySelector(".project-name");

      if (!projectName.textContent.startsWith("#")) {
        projectName.textContent = `# ${projectName.textContent.trim()}`;
      }
    } else {
      console.error(`Project with ID ${project} not found in DOM!`);
    }

    updateProjectNumbers();
    displayTasks(project);
  }
}
