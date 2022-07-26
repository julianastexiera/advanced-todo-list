import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { AuthProvider, AuthContext } from "../../contexts/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { TasksCollection } from "/imports/db/TasksCollection";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Stack from "@mui/material/Stack";
import LogoutIcon from "@mui/icons-material/Logout";

export const Logout = () => {
  const usuario = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    console.log("CLICOU LOGOUT");
    console.log(usuario);
    usuario.logout();
  };
  
  return (
    <AuthProvider>
      <LogoutIcon color="primary" onClick={handleLogoutClick} />
    </AuthProvider>
  );
};
