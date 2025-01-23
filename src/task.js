import { getProjectById, allProjects } from "./project.js";
import { formatTaskDate, tasksInWeek, tasksInDay } from "./date.js";
import imgEdit from "./img/pen.png";
import imgDelete from "./img/delete.png";

export default class Task {
  constructor(projectId, taskId, title, detail, dueDate, priority, isDone = false) {
    this.projectId = projectId;
    this.taskId = taskId
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
    
    const sortedTasks = [...selectedProject.tasks].sort((a,b) => {

      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return dateA - dateB;
    })
    
    
    sortedTasks.forEach((task) => {
      const taskMenu = document.createElement("div");
      taskMenu.className = "task-menu";
      taskMenu.setAttribute("data-project-id", projectId);
      taskMenu.setAttribute("task-id", task.taskId);

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
              <input type="checkbox" id="task-done" class="task-done" name="task-done"  task-id="${task.taskId}"
                data-project-id="${projectId}" />
              <p class="task-title">${task.title}</p>
            </div>
            <div class="task-second-block">
              <p class="task-details" task-id="${task.taskId}" data-project-id="${projectId}">DETAILS</p>
              <p class="task-date">${formatTaskDate(task.dueDate)}</p>
              <img
                src="${imgEdit}"
                id="task-edit"
                class="button"
                alt="task-edit"
                task-id="${task.taskId}"
                data-project-id="${projectId}"
                width="20px"
              />
              <img
                src="${imgDelete}"
                id="task-delete"
                class="button"
                alt="task-delete"
                task-id="${task.taskId}"
                data-project-id="${projectId}"
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

export function displayTasksAll() {
  const tasksContainer = document.querySelector(".task-container");
  tasksContainer.innerHTML = "";

  const allTasksArray = [];

  allProjects.forEach((project) => {
    project.tasks.forEach((task) => {

      allTasksArray.push({
        ...task,
        projectId: project.id,
      });
    });
  });

  const sortedAllTasks = allTasksArray.sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();
    return dateA - dateB;
  });

  sortedAllTasks.forEach((task) => {

      const taskMenu = document.createElement("div");
      taskMenu.className = "task-menu";
      taskMenu.setAttribute("data-project-id", task.projectId);
      taskMenu.setAttribute("task-id", task.taskId);

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
              <input type="checkbox" id="task-done" class="task-done" name="task-done"  task-id="${task.taskId}"
                data-project-id="${task.projectId}" />
              <p class="task-title">${task.title}</p>
            </div>
            <div class="task-second-block">
              <p class="task-details" task-id="${task.taskId}" data-project-id="${
                task.projectId
      }">DETAILS</p>
              <p class="task-date">${formatTaskDate(task.dueDate)}</p>
              <img
                src="${imgEdit}"
                id="task-edit"
                class="button"
                alt="task-edit"
                task-id="${task.taskId}"
                data-project-id="${task.projectId}"
                width="20px"
              />
              <img
                src="${imgDelete}"
                id="task-delete"
                class="button"
                alt="task-delete"
                task-id="${task.taskId}"
                data-project-id="${task.projectId}"
                width="20px"
              />
               </div>
            `;

      tasksContainer.appendChild(taskMenu);
    });
  }

export function displayTasksInWeek() {
  const tasksContainer = document.querySelector(".task-container");
  tasksContainer.innerHTML = "";

  const allWeekTasksArray = [];

  allProjects.forEach((project) => {
    const weeklyTasks = tasksInWeek(project.tasks);

    weeklyTasks.forEach((task) => {
      allWeekTasksArray.push({
        ...task,
        projectId: project.id,
      });
    });
    });

    const sortedWeekAllTasks = allWeekTasksArray.sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return dateA - dateB;
    });

    if (sortedWeekAllTasks.length > 0) {
      sortedWeekAllTasks.forEach((task) => {
        const taskMenu = document.createElement("div");
        taskMenu.className = "task-menu";
        taskMenu.setAttribute("data-project-id", task.projectId);
        taskMenu.setAttribute("task-id", task.taskId);

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
                <input type="checkbox" id="task-done" class="task-done" name="task-done"  task-id="${task.taskId}"
                  data-project-id="${task.projectId}" />
                <p class="task-title">${task.title}</p>
              </div>
              <div class="task-second-block">
                <p class="task-details" task-id="${task.taskId}" data-project-id="${
                  task.projectId
        }">DETAILS</p>
                <p class="task-date">${formatTaskDate(task.dueDate)}</p>
                <img
                  src="${imgEdit}"
                  id="task-edit"
                  class="button"
                  alt="task-edit"
                  task-id="${task.taskId}"
                  data-project-id="${task.projectId}"
                  width="20px"
                />
                <img
                  src="${imgDelete}"
                  id="task-delete"
                  class="button"
                  alt="task-delete"
                  task-id="${task.taskId}"
                  data-project-id="${task.projectId}"
                  width="20px"
                />
                 </div>
              `;

        tasksContainer.appendChild(taskMenu);
      });
    }
  if (!tasksContainer.hasChildNodes()) {
    tasksContainer.innerHTML = "<p>No tasks available for the next week.</p>";
  }
}

export function displayTasksInDay() {
  const tasksContainer = document.querySelector(".task-container");
  tasksContainer.innerHTML = "";

  allProjects.forEach((project) => {
    const weeklyTasks = tasksInDay(project.tasks);

    if (weeklyTasks.length > 0) {
      weeklyTasks.forEach((task) => {
        const taskMenu = document.createElement("div");
        taskMenu.className = "task-menu";
        taskMenu.setAttribute("data-project-id", project.id);
        taskMenu.setAttribute("task-id", task.taskId);

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
                <input type="checkbox" id="task-done" class="task-done" name="task-done"  task-id="${task.taskId}"
                  data-project-id="${project.id}" />
                <p class="task-title">${task.title}</p>
              </div>
              <div class="task-second-block">
                <p class="task-details" task-id="${task.taskId}" data-project-id="${
          project.id
        }">DETAILS</p>
                <p class="task-date">${formatTaskDate(task.dueDate)}</p>
                <img
                  src="${imgEdit}"
                  id="task-edit"
                  class="button"
                  alt="task-edit"
                  task-id="${task.taskId}"
                  data-project-id="${project.id}"
                  width="20px"
                />
                <img
                  src="${imgDelete}"
                  id="task-delete"
                  class="button"
                  alt="task-delete"
                  task-id="${task.taskId}"
                  data-project-id="${project.id}"
                  width="20px"
                />
                 </div>
              `;

        tasksContainer.appendChild(taskMenu);
      });
    }
  });
  if (!tasksContainer.hasChildNodes()) {
    tasksContainer.innerHTML = "<p>No tasks available for today.</p>";
  }
}
