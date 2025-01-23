import {
  format,
  addDays,
  startOfDay,
  endOfDay,
  parseISO,
  isWithinInterval,
} from "date-fns";

export function formatTaskDate(dateString) {
  const parsedDate = format(new Date(dateString), "dd MMM yyyy");
  return parsedDate;
}

export function tasksInWeek(tasks) {
  const today = new Date();
  const oneWeekLater = addDays(new Date(), 7);

  return tasks.filter((task) => {
    const taskDate = parseISO(task.dueDate);
    return isWithinInterval(taskDate, { start: today, end: oneWeekLater });
  });
}

export function tasksInDay(tasks) {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());
  
    return tasks.filter((task) => {
      const taskDate = parseISO(task.dueDate);
      return isWithinInterval(taskDate, { start: todayStart, end: todayEnd });
    });
  }
