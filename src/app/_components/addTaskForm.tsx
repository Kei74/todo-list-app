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

const AddTaskForm = () => {
  const { addTask } = useTaskContext();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setTitle("");
    setDescription("");
    setTitleError("");
    setDescriptionError("");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    if (title.trim() === "") {
      setTitleError("Title field required");
      hasError = true;
    } else {
      setTitleError("");
    }
    if (description.trim() === "") {
      setDescriptionError("Description field required");
      hasError = true;
    } else {
      setDescriptionError("");
    }

    if (hasError) return;

    const newTask = {
      id: uuidv4(), // Unique ID for the task
      title,
      description,
      completed: false,
    };
    addTask(newTask);
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <TextField
              autoFocus
              margin="dense"
              label="Task Title"
              type="text"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              error={!!titleError}
              helperText={titleError}
            />
            <TextField
              margin="dense"
              label="Task Description"
              type="text"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              error={!!descriptionError}
              helperText={descriptionError}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="submit" color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTaskForm;
