import { formatTaskDate, tasksInWeek, tasksInDay } from "./date.js";

export default class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.id = `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.tasks = [];
  }
}

export const allProjects = [];


const project1 = new Project("Software");
const project2 = new Project("Language");
const project3 = new Project("Gym");

allProjects.push(project1, project2, project3);


allProjects[0].tasks.push({
  projectId: allProjects[0].id,
  taskId :"task001",
  title: "Learn Javascript",
  detail: "OOP",
  dueDate: "2025-01-31",
  priority: "high",
  isDone: false,
});

allProjects[1].tasks.push({
  projectId: allProjects[1].id,
  title: "Study English",
  taskId :"task002",
  detail: "Read Essays.",
  dueDate: "2025-02-15",
  priority: "medium",
  isDone: false,
});

allProjects[1].tasks.push({
  projectId: allProjects[1].id,
  taskId : "task003",
  title: "Study German",
  detail: "Check the future tense.",
  dueDate: "2025-01-30",
  priority: "low",
  isDone: false,
});


export function getProjectById(projectId) {
  return allProjects.find((project) => project.id === projectId);
}

export function getProjectNameById(projectId) {
  const project = getProjectById(projectId);
  return project ? project.projectName : null;
}

export function displayProjects() {
  const projectContainer = document.querySelector(".my-projects");
  projectContainer.innerHTML = "";

  allProjects.forEach((project) => {
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

    const allTasks = document.getElementById("home-number");
    allTasks.innerHTML = allProjects.reduce((count, project) => {
      return count + project.tasks.filter((task) => !task.isDone).length;
    }, 0);

    const weekTasks = document.getElementById("week-number");
    weekTasks.innerHTML = allProjects.reduce((count, project) => {
      const incompleteTasksInWeek = tasksInWeek(project.tasks).filter((task) => !task.isDone);
      return count + incompleteTasksInWeek.length;  
    }, 0);

    const todayTasks = document.getElementById("today-number");
    todayTasks.innerHTML = allProjects.reduce((count, project) => {
      const incompleteTasksInDay = tasksInDay(project.tasks).filter((task) => !task.isDone);
      return count + incompleteTasksInDay.length;  
    }, 0);

    taskNumber.className = "project-number";
    taskNumber.setAttribute("data-project-id", project.id); 

    projectBlock.appendChild(projectName);
    projectBlock.appendChild(taskNumber);

    projectContainer.appendChild(projectBlock);
  });
}

export function addProject(name) {
  if (!name) return;

  const newProject = new Project(name);
  allProjects.push(newProject);
}

