// app/components/TaskCard.tsx
import Task from "@/types/task";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

interface TaskCardProps {
  task: Task;
  toggleTaskCompletion: (task: Task) => void;
  handleEditButtonClick: (task: Task) => void;
  handleDeleteButtonClick: (task: Task) => void;
}

const TaskCard = React.memo(function TaskCard({ task, toggleTaskCompletion, handleEditButtonClick, handleDeleteButtonClick }: TaskCardProps) {

  return (
    <Card variant="outlined" sx={{ margin: 2, display: "flex" }}>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{
          backgroundColor: task.completed ? "success.light" : "grey.200",
          padding: 1,
          borderRadius: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%"
        }}>
          <Checkbox
            aria-label={`Mark ${task.title} as completed`}
            color={task.completed ? "success" : "primary"}
            checked={task.completed}
            onChange={() => toggleTaskCompletion(task)}
          />
        </Box>
        <Box>
          <Button size="small" color="info" onClick={() => handleEditButtonClick(task)}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={() => handleDeleteButtonClick(task)}>
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
});

export default TaskCard;
