import React from "react";
import { useNavigate } from "react-router-dom";
import { List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const Task = ({ task, username, onCheckboxClick, onDeleteClick }) => {
  const navigate = useNavigate();

  const isEditable = task.username === username;

  return (
    <List>
      <Card sx={{ minWidth: 275 }}>
        <ListItem
          secondaryAction={
            <IconButton
              color="primary"
              edge="end"
              aria-label="delete"
              onClick={() => onDeleteClick(task)}
              disabled={!isEditable}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemIcon>
            <IconButton
              color="primary"
              edge="start"
              aria-label="edit"
              onClick={() => navigate("/taskedit/" + task._id)}
              disabled={!isEditable}
            >
              <EditIcon />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary={task.text} secondary={task.username} />
        </ListItem>
      </Card>
    </List>
  );
};
