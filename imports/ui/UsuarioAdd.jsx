import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";



export const UsuarioAdd = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [sexo, setSexo] = useState("");
  const [image, setImage] = useState("");
  const [imageStr, setImageStr] = useState("");
  

  const handleSexoChange = (e) => {
    setSexo(e.target.value);
  };

  const handleLimparSubmit = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setDataNasc("");
    setEmpresa("");
    setSexo("");
    setImage("");
    setImageStr("");
  };

  const handleChangeSexo = (e) => {
    setCheckedSexo(e.target.checked);
  };

  
  const converte = function imageUploaded(file) {
    const reader = new FileReader();
    let base64String = "";
    console.log("next");

    reader.onload = function () {
      base64String = reader.result.replace(/^data:image\/[a-z]+;base64,/,"");

      imageBase64Stringsep = base64String;
      console.log('dentro da funcao');
      console.log(base64String);
      setImageStr(base64String);
      return base64String;
    };
    reader.readAsDataURL(file);
    return base64String;
  }
  

  
  
  const handleFileChange = (e) => {
    console.log("Upload imagem");
    setImage(e.target.files[0]);
    const encodedData = btoa(image);
    console.log(image);
    console.log(encodedData);
    const strImage= converte(e.target.files[0]);
    console.log('dentro do handle');
    console.log(strImage);
  };

  const handleSalvarSubmit = (e) => {
    e.preventDefault();
    console.log(
      username +
        " " +
        password +
        " " +
        email +
        " " +
        dataNasc +
        " " +
        empresa +
        " " +
        sexo +
        " " +
        image
    );
    console.log(image);
    if (!username || !password || !email || !dataNasc || !empresa || !sexo || !imageStr) {
      console.log("Preencha todos os campos");
      return;
    }
    Meteor.call(
      "user.create",
      username,
      password,
      email,
      dataNasc,
      empresa,
      sexo, 
      imageStr
    );

    setUsername("");
    setPassword("");
    setEmail("");
    setDataNasc("");
    setSexo("");
    setEmpresa("");
    setImage("");
  };

  return (
    <div>
      <h2>Cadastrar usuário</h2>
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          id="txt-senha"
          label="Senha"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          required
          id="txt-email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="txt-data"
          label="Data nascimento"
          variant="outlined"
          value={dataNasc}
          onChange={(e) => setDataNasc(e.target.value)}
        />
        <TextField
          required
          id="txt-empresa"
          label="Empresa"
          variant="outlined"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
        />
        <TextField
          required
          id="txt-imagem"
          label="Imagem"
          type="file"
          variant="outlined"
          // value={imagem}
          onChange={handleFileChange}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 210 }}>
          <InputLabel id="demo-simple-select-standard-label">Sexo</InputLabel>
          <Select
            labelId="sexo"
            id="demo-simple-select-standard"
            value={sexo}
            onChange={handleSexoChange}
            label="Sexo"
          >
            <MenuItem value="">Sexo</MenuItem>
            <MenuItem value={"Masculino"}>Masculino</MenuItem>
            <MenuItem value={"Feminino"}>Feminino</MenuItem>
          </Select>
          <Divider />
        </FormControl>

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
