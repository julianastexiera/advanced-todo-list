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
import { Logout } from "./Logout";

const drawerWidth = 240;

export const Home = () => {
  const usuario = useContext(AuthContext);
  const navigate = useNavigate();
  if (!usuario) return;
  console.log("usuario", usuario);
  const { user } = usuario;
  console.log("user", user);
  const { _id, username } = user;
  console.log("userId: " + _id);
  console.log("username: " + username);

  console.log("EM HOME");
  console.log(usuario);
  // usuario.logout();
  /* const handlerCadastrada = Meteor.subscribe("tasks4", "cadastrada");
  const cadastrada = useTracker(() => TasksCollection.find({}).fetch());
  console.log(cadastrada);
  const handlerAndamento = Meteor.subscribe("tasks4", "andamento");
  const andamento = useTracker(() => TasksCollection.find({}).fetch());
  console.log(andamento);
  const handlerConcluida = Meteor.subscribe("tasks4", "concluida");
  const concluida = useTracker(() => TasksCollection.find({}).fetch());
  console.log(concluida); */

  const tasks = useTracker(() => {
    const handlerCadastrada = Meteor.subscribe("tasks2");
    if (handlerCadastrada.ready()) {
      return {
        cadastrada: TasksCollection.find({
          $and: [{ situacao: "cadastrada" }, { userId: _id }],
        }).fetch(),
        andamento: TasksCollection.find({
          $and: [{ situacao: "andamento" }, { userId: _id }],
        }).fetch(),
        concluida: TasksCollection.find({
          $and: [{ situacao: "concluida" }, { userId: _id }],
        }).fetch(),
      };
    } else {
      return {
        cadastrada: [],
        andamento: [],
        concluida: [],
      };
    }
  });
 

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
 
  return (
    <AuthProvider>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Advanced todo list
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          
          <Divider />
          <List>
            {["Home", "Perfil"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <HomeIcon color="primary" />
                    ) : (
                      <PersonIcon
                        color="primary"
                        onClick={() => navigate("/usuario")}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Stack
          component="form"
          sx={{
            width: "100%",
            alignItems: "center",
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <h1>Bem vindo {username}!</h1> 
            <Logout />
          </Box>

          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Total de tarefas cadastradas {tasks.cadastrada.length}
              </Typography>
            </CardContent>
          </Card>
          <Divider />
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Total de tarefas em andamento {tasks.andamento.length}
              </Typography>
            </CardContent>
          </Card>
          <Divider />
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Total de tarefas concluída(s) {tasks.concluida.length}
              </Typography>
            </CardContent>
          </Card>
          <Divider />
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Lista de tarefas
              </Typography>
            </CardContent>
            <CardActions>
              <AssignmentIcon
                color="primary"
                onClick={() => navigate("/tasklist")}
              />
            </CardActions>
          </Card>
          <Divider />
        </Stack>
      </Box>
    </AuthProvider>
  );
};
