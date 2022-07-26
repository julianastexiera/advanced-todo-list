import React, { useState, useContext } from "react";
import { Accounts } from "meteor/accounts-base";
import { AuthProvider, AuthContext } from "../../contexts/AuthContext";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/db/TasksCollection";
import { Task } from "./Task";
import { getTableFooterUtilityClass, List } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Logout } from "./Logout";

export const UsuarioPage = () => {
  const usuario = useContext(AuthContext);
  const [foto, setFoto] = useState("");
 /*  const user = useTracker(() => {
    const handler = Meteor.subscribe("userData");
    if (handler.ready()) {
      return Meteor.users.findOne({ _id: Meteor.userId() });
    }
    return {};
  }); */
  console.log("UsuarioPage");
  console.log('USUARIO');
  console.log(usuario);
  const {user} = usuario;
  console.log('USER');
  console.log(user);
  const { emails, profile, username} = user;

  console.log(emails);
  console.log(profile);
  console.log(username);
  const {datanasc, empresa, sexo, image} = profile;
  
  
/* function Base64ToImage(image, callback) {
    var img = new Image();
    img.onload = function() {
        callback(img);
    };
    img.src = image;
}
Base64ToImage(image, function(img) {
     document.getElementById('main').appendChild(img);
    var log = "w=" + img.width + " h=" + img.height;
    document.getElementById('log').value = log; 
    console.log(img);
    //setFoto(img);
}); */

//const preview = `data:image/png;base64,${image}`;
const preview = 'data:image/png;base64,' + image;
console.log('PREVIEW');
console.log(preview);
//setFoto(preview);

  const navigate = useNavigate();

  return (
    <AuthProvider>
      <div>
        <h2>Suas informações</h2>
        <Logout/>
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
          <Avatar alt={username} src={preview} style={{ height: 90, width: 90 }} />

          <TextField id="txt-nome" label="Nome" value={username} />
          <TextField id="txt-email" label="Email" value={emails[0].address} />
          <TextField id="txt-data" label="Data nascimento" value={datanasc} />
          <TextField id="txt-empresa" label="Empresa" value={empresa} />
          <TextField id="txt-sexo" label="Sexo" value={sexo} />

          <Stack spacing={3} direction="row">
            <ArrowBackIcon color="primary" onClick={() => navigate("/")} />
          </Stack>
        </Stack>
      </div>
    </AuthProvider>
  );
};
