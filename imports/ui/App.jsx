import React from "react";
import { AppRoutes } from "./AppRoutes.jsx";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from "react-router-dom";



export const App = () => {

  return (
    <div>
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Advanced todo list
              </Typography>
              
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      <AppRoutes />
    </div>
  );
};
