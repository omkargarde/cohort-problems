import { saveTask } from "./test";
import type { Task } from "./types";

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null) return;
  const id = new Date();
  const newTask: Task = {
    id: id.toDateString(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  addListItem(newTask);
  input.value = "";
});
function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");
  const lastUpdated = document.createElement("span");
  item.id = task.id;
  deleteButton.innerText = "Delete";
  deleteButton.onclick = removeTask;
  editButton.innerText = "Edit";
  editButton.onclick = editTask;

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTask(tasks);
  });

  lastUpdated.innerText = formatDate(task.createdAt);

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  label.append(
    checkbox,
    task.title,
    " ",
    lastUpdated,
    deleteButton,
    editButton
  );
  item.append(label);
  list?.append(item);
  saveTask(tasks);
}

function loadTasks(): Task[] {
  const taskJson = localStorage.getItem("TASKS");
  return taskJson ? JSON.parse(taskJson) : [];
}

function removeTask(e: Event) {
  const target = e.target as HTMLButtonElement;
  const id = target.parentElement?.parentElement?.id;
  if (id == null) return;
  document.getElementById(id)?.remove();
  const deleteTaskIndex = tasks.findIndex((task) => task.id === id);
  if (deleteTaskIndex !== -1) {
    tasks.splice(deleteTaskIndex, 1);
  }
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function editTask(e: Event) {
  const target = e.target as HTMLButtonElement;
  const id = target.parentElement?.parentElement?.id;
  if (!id) return;
  const TaskToBeEditedIndex = tasks.findIndex((task) => task.id === id);
  if (TaskToBeEditedIndex === -1) return;
  const inputValue = window.prompt("Enter new task", undefined);
  if (!inputValue) {
    console.error("Input value is empty");
    return;
  }
  const editedTask = {
    ...tasks[TaskToBeEditedIndex],
    title: inputValue,
    createdAt: new Date(),
  };
  tasks.splice(TaskToBeEditedIndex, 1, editedTask);

  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");
  const lastUpdated = document.createElement("span");

  deleteButton.innerText = "Delete";
  deleteButton.onclick = removeTask;
  editButton.innerText = "Edit";
  editButton.onclick = editTask;

  item.id = editedTask.id;
  checkbox.type = "checkbox";
  checkbox.checked = editedTask.completed;

  lastUpdated.innerText = formatDate(tasks[TaskToBeEditedIndex].createdAt);

  label.append(
    checkbox,
    editedTask.title,
    " ",
    lastUpdated,
    deleteButton,
    " ",
    editButton
  );

  item.append(label);
  document.getElementById(id)?.replaceChildren(item);
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function formatDate(date: Date): string {
  if (!(date instanceof Date)) {
    return "Invalid date type"; // Or throw an error, log, etc.
  }

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    year: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });

  return dateFormatter.format(date);
}
