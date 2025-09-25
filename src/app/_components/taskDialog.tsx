import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Task from "@/types/task";

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  task: Task | null;
  dialogType: "add" | "edit" | "delete";
}

const TaskDialog = ({
  open,
  onClose,
  onSubmit,
  task,
  dialogType,
}: TaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    if (task && (dialogType === "edit" || dialogType === "delete")) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task, dialogType]);

  function handleSubmit() {
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
      id: task? task.id : uuidv4(), // Unique ID for the task
      title,
      description,
      completed: false,
    };
    onSubmit(newTask);
    onClose();
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          {dialogType === "add"
            ? "Add New Task"
            : dialogType === "edit"
            ? "Edit Task"
            : "Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
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
            disabled={dialogType === "delete"}
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
            disabled={dialogType === "delete"}
          />
          {dialogType === "delete" && (
            <p>
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type="submit"
            color="primary"
          >
            {dialogType === "add"
              ? "Add Task"
              : dialogType === "edit"
              ? "Save"
              : "Delete Task"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskDialog;
