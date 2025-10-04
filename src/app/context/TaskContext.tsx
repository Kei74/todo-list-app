"use client";
import Task from "@/types/task";
import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const seedTaskList: Task[] = [
  {
    id: "1",
    title: "Demo Task",
    description: "Demo tasks present to demonstrate functionality.",
    completed: false,
  },
  {
    id: "2",
    title: "Add Task",
    description: "Click the \"Add Task\" button to add your own task.",
    completed: false,
  },
  {
    id: "3",
    title: "Edit Task",
    description: "Click the \"Edit\" button to edit task name or description.",
    completed: false,
  },
  {
    id: "3",
    title: "Delete Task",
    description: "Click the \"Delete\" button to delete task",
    completed: true,
  },
  {
    id: "3",
    title: "MArk Task Complete",
    description: "Click the checkbox to mark task as complete",
    completed: false,
  },
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if(storedTasks)
        setTasks(JSON.parse(storedTasks));
    else
      setTasks(seedTaskList);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if(isMounted)
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks, isMounted]);

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

  function updateTask(task: Task) {
    setTasks((prevTasklist) =>
      prevTasklist.map((prevTask) =>
        prevTask.id === task.id
          ? task
          : prevTask
      )
    );
  }

  function deleteTask(task: Task) {
    setTasks((prevTasklist) =>
      prevTasklist.filter((prevTask) => prevTask.id !== task.id)
    );
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTaskCompletion, updateTask, deleteTask }}
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
