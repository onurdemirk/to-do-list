import { formatTaskDate, tasksInWeek, tasksInDay } from "./date.js";
import {
  saveProjectsToLocalStorage,
  getProjectsFromLocalStorage,
} from "./local-storage.js";

export default class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.id = `project-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    this.tasks = [];
  }
}
const DEMO_PROJECT_IDS = [
  "demo-project-software",
  "demo-project-language",
  "demo-project-gym",
];

const storedProjects = getProjectsFromLocalStorage();

if (!storedProjects.some((project) => DEMO_PROJECT_IDS.includes(project.id))) {
  const demoProjects = [
    {
      id: "demo-project-software",
      projectName: "Software",
      tasks: [
        {
          projectId: "demo-project-software",
          taskId: "task001",
          title: "Learn Javascript",
          detail: "OOP",
          dueDate: "2025-01-31",
          priority: "high",
          isDone: false,
        },
      ],
    },
    {
      id: "demo-project-language",
      projectName: "Language",
      tasks: [
        {
          projectId: "demo-project-language",
          taskId: "task002",
          title: "Study English",
          detail: "Read Essays.",
          dueDate: "2025-02-15",
          priority: "medium",
          isDone: false,
        },
        {
          projectId: "demo-project-language",
          taskId: "task003",
          title: "Study German",
          detail: "Check the future tense.",
          dueDate: "2025-01-30",
          priority: "low",
          isDone: true,
        },
      ],
    },
    {
      id: "demo-project-gym",
      projectName: "Gym",
      tasks: [],
    },
  ];

  const updatedProjects = [...storedProjects, ...demoProjects];
  saveProjectsToLocalStorage(updatedProjects);
}

export function getProjectById(projectId) {
  const projects = getProjectsFromLocalStorage();

  return projects.find((project) => project.id === projectId);
}

export function getProjectNameById(projectId) {
  const project = getProjectById(projectId);
  return project ? project.projectName : null;
}

export function displayProjects() {
  const projects = getProjectsFromLocalStorage();

  const projectContainer = document.querySelector(".my-projects");
  projectContainer.innerHTML = "";

  projects.forEach((project) => {
    const projectBlock = document.createElement("div");
    projectBlock.className = "my-projects-block";
    projectBlock.setAttribute("data-project-id", project.id);

    const projectName = document.createElement("p");
    projectName.textContent = `${project.projectName}`;
    projectName.className = "project-name";
    projectName.setAttribute("data-project-id", project.id);

    const taskNumber = document.createElement("p");

    const incompleteTasks = project.tasks.filter((task) => !task.isDone);
    taskNumber.textContent = incompleteTasks.length;

    const allTasksCount = projects.reduce((count, project) => {
      return count + project.tasks.filter((task) => !task.isDone).length;
    }, 0);

    const weekTasksCount = projects.reduce((count, project) => {
      const incompleteTasksInWeek = tasksInWeek(project.tasks).filter(
        (task) => !task.isDone
      );
      return count + incompleteTasksInWeek.length;
    }, 0);

    const todayTasksCount = projects.reduce((count, project) => {
      const incompleteTasksInDay = tasksInDay(project.tasks).filter(
        (task) => !task.isDone
      );
      return count + incompleteTasksInDay.length;
    }, 0);

    document.getElementById("home-number").innerHTML = allTasksCount;
    document.getElementById("week-number").innerHTML = weekTasksCount;
    document.getElementById("today-number").innerHTML = todayTasksCount;

    taskNumber.className = "project-number";
    taskNumber.setAttribute("data-project-id", project.id);

    projectBlock.appendChild(projectName);
    projectBlock.appendChild(taskNumber);

    projectContainer.appendChild(projectBlock);
  });
}

export function addProject(name) {
  if (!name) return;

  const projects = getProjectsFromLocalStorage();
  const newProject = new Project(name);
  projects.push(newProject);
  saveProjectsToLocalStorage(projects);
}
