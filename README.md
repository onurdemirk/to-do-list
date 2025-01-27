# To-Do List App

This is a fully functional **To-Do List Application** where users can create projects, manage tasks, and organize their schedules effectively. Tasks can be categorized based on priority and due dates, providing a streamlined experience for productivity. The app also persists data using `localStorage`, ensuring tasks are saved even after the browser is closed.

## Live Demo
You can access the live version of the app here:  
[To-Do List App](https://onurdemirk.github.io/to-do-list/)

---

## Features

### Projects
- Create new projects to group related tasks.
- View all projects in the sidebar.
- Delete projects along with all associated tasks.

### Tasks
- Add tasks to specific projects.
- Each task includes:
  - **Title**
  - **Description**
  - **Due Date**
  - **Priority** (Low, Medium, High)
- Tasks can be:
  - Edited to update details.
  - Deleted if no longer needed.
  - Marked as complete using checkboxes.

### Filters
- **Home:** View all tasks from all projects.
- **Today:** Display tasks due today.
- **Week:** Show tasks due in the upcoming week.

### Data Persistence
- Tasks and projects are saved in the browser's `localStorage`.
- Demo projects are automatically added when the app is first loaded, ensuring a seamless start.

---

## Technologies Used

### Frontend
- **HTML**: For structuring the app layout and modals.
- **CSS**: Custom styles and layout, including grid and flexbox.
- **JavaScript**: Handles task creation, editing, and filtering logic.

### Libraries/Tools
- **date-fns**: For date formatting and filtering tasks by day or week.
- **LocalStorage API**: To save and retrieve user data.

---

## How to Use

1. **Start a New Project**  
   - Click the "+" button in the sidebar to create a new project.  
   - Enter the project name and save it.

2. **Add a Task**  
   - Select a project from the sidebar.  
   - Click the "New Task" button to open the task creation modal.  
   - Fill in the task details and save.

3. **Filter Tasks**  
   - Use the `Home`, `Today`, or `Week` buttons in the sidebar to filter tasks.  

4. **Edit or Delete Tasks**  
   - Click the "Details" button on a task to view/edit its information.  
   - Use the edit (pen icon) or delete (trash icon) buttons to modify or remove tasks.

5. **Mark as Complete**  
   - Check the box next to a task to mark it as done.  
