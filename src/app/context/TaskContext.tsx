"use client";
import Task from "@/types/task";
import React, { createContext, useContext } from "react";
import { useState } from "react";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (task: Task) => void;
  editTask: (taskId: string, newTitle: string, newDescription: string) => void;
  deleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasklist = [
  {
    id: "1",
    title: "Item 1 from Context",
    description: "This is the first item in Tasklist.",
    completed: false,
  },
  {
    id: "2",
    title: "Item 2",
    description: "This is the second item in Tasklist.",
    completed: false,
  },
  {
    id: "3",
    title: "Item 3",
    description: "This is the third item in Tasklist.",
    completed: false,
  },
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasklist);

  function addTask(newTask: Task) {
    setTasks((prevTasklist) => [...prevTasklist, newTask]);
  }

  function toggleTaskCompletion(toggledTask: Task) {
    setTasks((prevTasklist) =>
      prevTasklist.map((task) =>
        task.id === toggledTask.id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function editTask(taskId: string, newTitle: string, newDescription: string) {
    setTasks((prevTasklist) =>
      prevTasklist.map((task) =>
        task.id === taskId
          ? { ...task, title: newTitle, description: newDescription }
          : task
      )
    );
  }

  function deleteTask(taskId: string) {
    setTasks((prevTasklist) =>
      prevTasklist.filter((task) => task.id !== taskId)
    );
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTaskCompletion, editTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
