import pencilImg from "./img/pen.png";
import trashImg from "./img/delete.png";

const MAX_CHAR_LIMIT = 20;

export function setupDOM() {
  const addButton = document.getElementById("add-button");
  const projectCont = document.getElementById("project-container");

  addButton.addEventListener("click", () => {
    const newElement = document.createElement("div");

    newElement.innerHTML = `
  <div class="new-project">
  <div>
  <p class="new-project-title">New Project</p>
  </div>
  <div>
  <img class="edit-button button" src="${pencilImg}" alt="edit-button" width="17px">
  <img class="delete-button button" src="${trashImg}" alt="delete-button" width="17px">
  </div>
  </div>
`;

    projectCont.appendChild(newElement);
  });

  projectCont.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-button")) {
      const projectTitle = e.target
        .closest(".new-project")
        .querySelector(".new-project-title");
      projectTitle.contentEditable = true;

      projectTitle.focus();

      projectTitle.addEventListener("blur", () => {
        projectTitle.contentEditable = false;
      });

      projectTitle.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          projectTitle.contentEditable = false;
        }
      });

      projectTitle.addEventListener("input", () => {
        const currentLength = projectTitle.textContent.length;
        if (currentLength > MAX_CHAR_LIMIT) {
          projectTitle.textContent = projectTitle.textContent.substring(
            0,
            MAX_CHAR_LIMIT
          );
        }
      });
    } else if (e.target.classList.contains("delete-button")) {
      e.target.closest(".new-project").remove();
    }
  });
}
