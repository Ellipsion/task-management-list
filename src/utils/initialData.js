const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Start portfolio website" },
    "task-2": { id: "task-2", content: "Interview question (vs code sidebar)" },
    "task-3": { id: "task-3", content: "Start Computer Architecture" },
    "task-4": { id: "task-4", content: "Watch rain" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Completed",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialData;
