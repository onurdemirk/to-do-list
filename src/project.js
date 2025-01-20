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
  title: "Learn Javascript",
  detail: "OOP",
  dueDate: "2025-01-31",
  priority: "high",
  isDone: false,
});

allProjects[1].tasks.push({
  projectId: allProjects[1].id,
  title: "Study English",
  detail: "Read Essays.",
  dueDate: "2025-02-15",
  priority: "medium",
  isDone: true,
});

allProjects[1].tasks.push({
  projectId: allProjects[1].id,
  title: "Study German",
  detail: "Check the future tense.",
  dueDate: "2025-01-30",
  priority: "low",
  isDone: true,
});

// TEST 

export function getProjectById(projectId) {
  return allProjects.find((project) => project.id === projectId);
}

export function displayProjects() {
  const projectContainer = document.querySelector(".my-projects");
  projectContainer.innerHTML = "";

  allProjects.forEach((project) => {
    const projectBlock = document.createElement("div");
    projectBlock.className = "my-projects-block";
    projectBlock.setAttribute("data-id", project.id); 

    const projectName = document.createElement("p");
    projectName.textContent = `${project.projectName}`;
    projectName.className = "project-name";

    const taskNumber = document.createElement("p");
    taskNumber.textContent = project.tasks.length;
    taskNumber.className = "project-number";

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

