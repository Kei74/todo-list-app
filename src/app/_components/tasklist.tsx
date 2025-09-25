"use client";
import { Stack } from "@mui/material";
import React from "react";
import TaskCard from "./taskcard";
import Task from "@/types/task";
import { useTaskContext } from "../context/TaskContext";

function Tasklist() {
  const { tasks, toggleTaskCompletion, editTask, deleteTask } = useTaskContext();

  return (
    <div>
      <Stack spacing={2}>
        {tasks.map((task: Task) => (
          <TaskCard
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
            editTask={editTask}
            deleteTask={deleteTask}
            key={task.id}
          />
        ))}
      </Stack>
    </div>
  );
}

export default Tasklist;
