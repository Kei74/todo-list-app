import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  TextField,
} from "@mui/material";
import Task from "@/types/task";
import TaskDialog from "./taskDialog";

const AddTaskButton = () => {
  const { addTask } = useTaskContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleOpenDialog() {
    setDialogOpen(true);
  }

  function handleCloseDialog() {
    setDialogOpen(false);
  }

  function handleAdd (task: Task) {
    addTask(task);
    handleCloseDialog();;
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpenDialog}>
        Add Task
      </Button>
      <TaskDialog
      open={dialogOpen}
      onClose={handleCloseDialog}
      onSubmit={handleAdd}
      task={null}
      dialogType="add"
      />
    </>
  );
};

export default AddTaskButton;
