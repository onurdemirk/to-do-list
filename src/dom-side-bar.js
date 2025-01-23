import { displayTasks, displayTasksAll, displayTasksInWeek, displayTasksInDay } from "./task.js";

const homeButton = document.getElementById("home-button");
const weekButton = document.getElementById("week-button");
const todayButton = document.getElementById("today-button");
const taskNewButton = document.querySelector(".task-new");
const myProjectsContainer = document.querySelector(".my-projects");

export function home() {
    displayTasksAll();
    taskNewButton.style.display = "none";
    document.querySelector(".project-delete").style.display = "none";
    homeButton.textContent = "# Home";
    todayButton.textContent = "Today";
    weekButton.textContent = "Week";
    homeButton.style.color = "rgb(107, 105, 105";
    weekButton.style.color = "black";
    todayButton.style.color = "black";
    myProjectsContainer.querySelectorAll(".my-projects-block").forEach((projectBlock) => {
      projectBlock.style.color = "black";
      const projectNameElement = projectBlock.querySelector(".project-name");
      projectNameElement.textContent = projectNameElement.textContent.replace(/^#\s*/, "");
    });
    

  };
  
  export function today() {
    displayTasksInDay();
    taskNewButton.style.display = "none";
    document.querySelector(".project-delete").style.display = "none";
    todayButton.textContent = "# Today";
    homeButton.textContent = "Home";
    weekButton.textContent = "Week";
    homeButton.style.color = "black";
    weekButton.style.color = "black";
    todayButton.style.color = "rgb(107, 105, 105";
    myProjectsContainer.querySelectorAll(".my-projects-block").forEach((projectBlock) => {
      projectBlock.style.color = "black";
      const projectNameElement = projectBlock.querySelector(".project-name");
      projectNameElement.textContent = projectNameElement.textContent.replace(/^#\s*/, "");
    });
  };
  
  export function week() {
    displayTasksInWeek();
    taskNewButton.style.display = "none";
    document.querySelector(".project-delete").style.display = "none";
    todayButton.textContent = "Today";
    homeButton.textContent = "Home";
    weekButton.textContent = "# Week";
    homeButton.style.color = "black";
    weekButton.style.color = "rgb(107, 105, 105";
    todayButton.style.color = "black";
    myProjectsContainer.querySelectorAll(".my-projects-block").forEach((projectBlock) => {
      projectBlock.style.color = "black";
      const projectNameElement = projectBlock.querySelector(".project-name");
      projectNameElement.textContent = projectNameElement.textContent.replace(/^#\s*/, "");
    });
  };

  