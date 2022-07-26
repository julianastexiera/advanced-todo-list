import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const LoginPage = () => {
  const { authenticaded, login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSalvarSubmit = (e) => {
    e.preventDefault();
    console.log("Submite", { username, password });
    login(username, password);
    Meteor.loginWithPassword(username, password);
  };

  return (
    <div>
      <h1>Entre no Advanced todo list</h1>
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
          id="txt-username"
          label="Nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          id="txt-password"
          type="password"
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Stack spacing={3} direction="row">
          <Button variant="contained" size="small" onClick={handleSalvarSubmit}>
            Entrar
          </Button>
        </Stack>
        <Link to="/cadastrarusuario">Cadastrar</Link>
      </Stack>
    </div>
  );
};
