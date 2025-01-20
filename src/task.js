import { getProjectById } from "./project.js";
import imgEdit from "./img/pen.png";
import imgDelete from "./img/delete.png";

export default class Task {
  constructor(projectId, title, detail, dueDate, priority, isDone = false) {
    this.projectId = projectId;
    this.title = title;
    this.detail = detail;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isDone = isDone;
  }
}


export function displayTasks(projectId) {
  const tasksContainer = document.querySelector(".task-container");
  tasksContainer.innerHTML = "";

  const selectedProject = getProjectById(projectId);

  if (selectedProject && selectedProject.tasks.length > 0) {
    
    selectedProject.tasks.forEach((task) => { 
      const taskMenu = document.createElement("div");
      taskMenu.className = "task-menu";

      let priorityColor = "gray";
      if (task.priority === "high") {
        priorityColor = "red";
      } else if (task.priority === "medium") {
        priorityColor = "orange";
      } else if (task.priority === "low") {
        priorityColor = "green";
      }

      taskMenu.style.borderLeft = `5px solid ${priorityColor}`;

      taskMenu.innerHTML = `<div class="task-first-block">
              <input type="checkbox" id="task-done" name="task-done" />
              <p>${task.title}</p>
            </div>
            <div class="task-second-block">
              <p class="task-details">DETAILS</p>
              <p class="task-date">${task.dueDate}</p>
              <img
                src="${imgEdit}"
                id="task-edit"
                class="button"
                alt="task-edit"
                width="20px"
              />
              <img
                src="${imgDelete}"
                id="task-delete"
                class="button"
                alt="task-delete"
                width="20px"
              />
               </div>
            `;

      tasksContainer.appendChild(taskMenu);
    });
  } else {
    tasksContainer.innerHTML = "<p>There is no task for this project.</p>";
  }
}
