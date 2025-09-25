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
} from "@mui/material";
import React from "react";

interface TaskCardProps {
  task: Task;
  toggleTaskCompletion: (task: Task) => void;
  editTask: (taskId: string, newTitle: string, newDescription: string) => void;
  deleteTask: (taskId: string) => void;
}

const TaskCard = React.memo(function TaskCard({ task, toggleTaskCompletion, editTask, deleteTask}: TaskCardProps) {

  function handleEdit() {
    
  }

  function handleDelete() {

  }

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
          backgroundColor: task.completed? "success.light" : "grey.200",
          padding: 1,
          borderRadius: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%"
        }}>
        <Checkbox
          aria-label={`Mark ${task.title} as completed` }
          color={task.completed ? "success" : "primary"}
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task)}
        />
        </Box>
        <Box>
          <Button size="small" color="info">
            Edit
          </Button>
          <Button size="small" color="error">
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
});

export default TaskCard;
