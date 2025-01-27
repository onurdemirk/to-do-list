export function saveProjectsToLocalStorage(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function getProjectsFromLocalStorage() {
  const projects = localStorage.getItem("projects");
  return projects ? JSON.parse(projects) : [];
}
