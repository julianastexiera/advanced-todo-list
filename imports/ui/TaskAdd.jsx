import React, { useState, useContext } from "react";
import {  AuthContext } from "../../contexts/AuthContext";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import { Logout } from "./Logout";


export const TaskAdd = () => {
  const [text, setText] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isPessoal, setIsPessoal] = useState(false);

  const usuario = useContext(AuthContext);

  console.log("usuario", usuario);
  const { user } = usuario;
  console.log("user", user);
  const { username } = user;
  console.log(username);
  const { _id } = user;
  console.log("userId: " + _id);

  const handleChangePessoal = (event) => {
    setIsPessoal(event.target.checked);
  };

  const handleLimparSubmit = (e) => {
    e.preventDefault();
    setText("");
    setDescricao("");
  };

  const handleSalvarSubmit = (e) => {
    e.preventDefault();

    
    if (!text || !descricao) return;
    console.log('SALVANDO...');
    console.log(text + ' '+ descricao + ' ' + isPessoal + ' '+ username);
    Meteor.call("tasks.insert", text, descricao, isPessoal, username);
    setText("");
    setDescricao("");
    setIsPessoal(false);
  };

  return (
    <div>
      <h1>Cadastrar tarefa</h1>
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
        <TextField
          required
          id="txt-nome"
          label="Nome"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <TextField
          required
          id="txt-descricao"
          label="Descrição"
          variant="outlined"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <div>
            Pessoal
            <Switch
              checked={isPessoal}
              onChange={handleChangePessoal}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        <Stack spacing={3} direction="row">
          <Button variant="contained" size="small" onClick={handleSalvarSubmit}>
            Salvar
          </Button>
          <Button variant="contained" size="small" onClick={handleLimparSubmit}>
            Limpar
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};
