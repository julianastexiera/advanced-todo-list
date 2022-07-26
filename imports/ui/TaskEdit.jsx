import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/db/TasksCollection";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Logout } from "./Logout";

export const TaskEdit = () => {
  const { taskId } = useParams();

  //const tasks = useTracker(() => TasksCollection.find().fetch());

  const tasks = useTracker(() => {
    const handler = Meteor.subscribe("tasks2");
    console.log("DENTRO DO USER TRACKER");
    
    if (handler.ready) {
      
        return TasksCollection.find().fetch();
      }
    
      return [];
    
    
  });

  const task = tasks.find((x) => {
    return x._id == taskId;
  });

  console.log('TASK');
  console.log(task);
  

  

  const [text, setText] = useState(task.text);
  const [descricao, setDescricao] = useState(task.descricao);
  const [data, setData] = useState(task.createAt);
  const [situacao, setSituacao] = useState(task.situacao);
  const [isPessoal, setIsPessoal] = useState(task.isPessoal);
  const [checkedEdite, setCheckedEdite] = useState(false);
  
  console.log("Text: " + text);
  console.log("Descricao: " + descricao);
  console.log("Data:" + task.createAt);
  console.log("Situacao: " + situacao);
  console.log("Pessoal: " + isPessoal);
  
  const handleChange = (event) => {
    setSituacao(event.target.value);
  };

  const handleChangePessoal = (event) => {
    setIsPessoal(event.target.checked);
  };

  const handleChangeEdite = (event) => {
    setCheckedEdite(event.target.checked);
  };

  const handleCancelarSubmit = (e) => {
    e.preventDefault();
    console.log("clicou cancelar");
  };

   const handleSalvarSubmit = (e) => {
    e.preventDefault();

    if (!text || !descricao) return;
    Meteor.call("tasks.update", taskId, text, descricao, situacao, isPessoal);
    console.log("clicou salvar");
    console.log(count++);
    console.log("pessoal");
    console.log(isPessoal);

    setCheckedEdite(false);
  }; 

  return (
    <div>
      <h2>Editar tarefa: </h2>
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
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          disabled={!checkedEdite}
        />
        <TextField
          id="txt-descricao"
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          variant="outlined"
          disabled={!checkedEdite}
        />
        <TextField
          required
          id="txt-data"
          label="Data"
          variant="outlined"
          disabled={!checkedEdite}
        />
        <div>
          Pessoal
          <Switch
            checked={isPessoal}
            onChange={handleChangePessoal}
            inputProps={{ "aria-label": "controlled" }}
            disabled={!checkedEdite}
          />
        </div>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Situação
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={situacao}
            onChange={handleChange}
          >
            <FormControlLabel
              value="cadastrada"
              control={<Radio />}
              label="Cadastrada"
              disabled={!checkedEdite}
            />
            <FormControlLabel
              value="andamento"
              control={<Radio />}
              label="Em andamento"
              disabled={!checkedEdite || situacao === "concluida"}
            />
            <FormControlLabel
              value="concluida"
              control={<Radio />}
              label="Concluída"
              disabled={!checkedEdite || situacao === "cadastrada"}
            />
          </RadioGroup>
        </FormControl>

        <Stack spacing={3} direction="row">
          <div>
            Visualizar
            <Switch
              checked={checkedEdite}
              onChange={handleChangeEdite}
              inputProps={{ "aria-label": "controlled" }}
            />
            Editar
          </div>

           <Button variant="contained" size="small" onClick={handleSalvarSubmit}>
            Salvar
          </Button> 

          <Button
            variant="contained"
            size="small"
            onClick={handleCancelarSubmit}
          >
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};
