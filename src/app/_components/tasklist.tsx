"use client";
import {
  Button,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import TaskCard from "./taskcard";
import Task from "@/types/task";
import { useTaskContext } from "../context/TaskContext";
import TaskDialog from "./taskDialog";

function Tasklist() {
  const { tasks, toggleTaskCompletion, addTask, updateTask, deleteTask } =
    useTaskContext();

  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<"add" | "edit" | "delete">(
    "add"
  );

  function handleOpenAddDialog() {
    setCurrentTask(null);
    setDialogType("add");
    setDialogOpen(true);
  }

  function handleOpenEditDialog(task: Task) {
    setCurrentTask(task);
    setDialogType("edit");
    setDialogOpen(true);
  }

  function handleOpenDeleteDialog(task: Task) {
    setCurrentTask(task);
    setDialogType("delete");
    setDialogOpen(true);
  }

  function handleCloseDialog() {
    setDialogOpen(false);
    setCurrentTask(null);
  }

  function handleSubmit(task: Task) {
    switch (dialogType) {
      case "add":
        addTask(task);
        break;
      case "edit":
        updateTask(task);
        break;
      case "delete":
        deleteTask(task);
        break;
      default:
        break;
    }
    handleCloseDialog();
  }

  return (
    <div>
      <Stack spacing={2}>
        <Button variant="outlined" onClick={handleOpenAddDialog}>
          Add Task
        </Button>
        {tasks.map((task: Task) => (
          <TaskCard
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
            handleEditButtonClick={() => {
              handleOpenEditDialog(task);
            }}
            handleDeleteButtonClick={() => {
              handleOpenDeleteDialog(task);
            }}
            key={task.id}
          />
        ))}
      </Stack>

      <TaskDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        task={currentTask}
        dialogType={dialogType}
      />
    </div>
  );
}

export default Tasklist;
