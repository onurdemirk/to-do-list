import { getProjectById } from "./project.js";
import { formatTaskDate, tasksInWeek, tasksInDay } from "./date.js";
import imgEdit from "./img/pen.png";
import imgDelete from "./img/delete.png";
import { getProjectsFromLocalStorage } from "./local-storage.js";

export function displayTasks(projectId) {
  const tasksContainer = document.querySelector(".task-container");
  tasksContainer.innerHTML = "";

  const selectedProject = getProjectById(projectId);

  if (selectedProject && selectedProject.tasks.length > 0) {
    const sortedTasks = [...selectedProject.tasks].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return dateA - dateB;
    });

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
              <input type="checkbox" id="task-done" class="task-done ${
                task.isDone ? "checked" : ""
              }" name="task-done"  task-id="${task.taskId}"
                data-project-id="${projectId}" ${
        task.isDone ? "checked" : ""
      } />
              <p class="task-title ${task.isDone ? "checked" : ""}">${
        task.title
      }</p>
            </div>
            <div class="task-second-block">
              <p class="task-details" task-id="${
                task.taskId
              }" data-project-id="${projectId}">DETAILS</p>
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

      if (task.isDone) {
        taskMenu.classList.add("checked");
      }

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

  const projects = getProjectsFromLocalStorage();

  projects.forEach((project) => {
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
              <input type="checkbox" id="task-done" class="task-done ${
                task.isDone ? "checked" : ""
              }" name="task-done"  task-id="${task.taskId}"
                data-project-id="${task.projectId}" ${
      task.isDone ? "checked" : ""
    } />
              <p class="task-title ${task.isDone ? "checked" : ""}">${
      task.title
    }</p>
            </div>
            <div class="task-second-block">
              <p class="task-details" task-id="${
                task.taskId
              }" data-project-id="${task.projectId}">DETAILS</p>
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

    if (task.isDone) {
      taskMenu.classList.add("checked");
    }

    tasksContainer.appendChild(taskMenu);
  });
}

export function displayTasksInWeek() {
  const tasksContainer = document.querySelector(".task-container");
  tasksContainer.innerHTML = "";

  const allWeekTasksArray = [];

  const projects = getProjectsFromLocalStorage();

  projects.forEach((project) => {
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
                <input type="checkbox" id="task-done" class="task-done ${
                  task.isDone ? "checked" : ""
                }" name="task-done"  task-id="${task.taskId}"
                  data-project-id="${task.projectId}" ${
        task.isDone ? "checked" : ""
      } />
                <p class="task-title ${task.isDone ? "checked" : ""}">${
        task.title
      }</p>
              </div>
              <div class="task-second-block">
                <p class="task-details" task-id="${
                  task.taskId
                }" data-project-id="${task.projectId}">DETAILS</p>
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

      if (task.isDone) {
        taskMenu.classList.add("checked");
      }

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

  const projects = getProjectsFromLocalStorage();

  projects.forEach((project) => {
    const dailyTasks = tasksInDay(project.tasks);

    if (dailyTasks.length > 0) {
      dailyTasks.forEach((task) => {
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
                <input type="checkbox" id="task-done" class="task-done ${
                  task.isDone ? "checked" : ""
                }" name="task-done"  task-id="${task.taskId}"
                  data-project-id="${project.id}" ${
          task.isDone ? "checked" : ""
        } />
                <p class="task-title ${task.isDone ? "checked" : ""}">${
          task.title
        }</p>
              </div>
              <div class="task-second-block">
                <p class="task-details" task-id="${
                  task.taskId
                }" data-project-id="${project.id}">DETAILS</p>
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

        if (task.isDone) {
          taskMenu.classList.add("checked");
        }

        tasksContainer.appendChild(taskMenu);
      });
    }
  });
  if (!tasksContainer.hasChildNodes()) {
    tasksContainer.innerHTML = "<p>No tasks available for today.</p>";
  }
}
