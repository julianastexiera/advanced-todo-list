import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/db/TasksCollection";
import { Task } from "./Task";
import { PaginationControlled } from "./PaginationControlled";
import { List } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Logout } from "./Logout";


//var tasks = [];
const toggleChecked = ({ _id, isChecked }) => {
  Meteor.call({ _id, isChecked });
};

const deleteTask = ({ _id }) => {
  Meteor.call("tasks.remove", _id);
};

export const TaskList = () => {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(true);
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState([]);

  const user = useTracker(() => Meteor.user());
  
  const contador = useTracker(() => {
    const handler = Meteor.subscribe("tasks3", checked, text);
    console.log("DENTRO DO USER TRACKER");
    console.log(text);

    if (handler.ready) {
      return TasksCollection.find().count();
    }
    return 0;
  });


  Meteor.call(
    "tasks.list",
    checked,
    text,
    page - 1,
    4,
    function (error, result) {
      console.log("DENTRO DO CALL");
      console.log(result);
   //   tasks =[...result];
      setTasks(result);
    console.log(tasks);
    }
  ); 

  console.log("contador");
  console.log(contador);

  const navigate = useNavigate();

  console.log("checked");
  console.log(checked);
  
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }

    return TasksCollection.find(pendingOnlyFilter).count();
  });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  const logout = () => Meteor.logout();

  const onSearchClick = (e) => {
    console.log(text);
  };

  return (
    <div>
      <h2>Tarefas cadastradas</h2>
      
      <Logout />
      <TextField
        id="txt-text"
        label="Nome da tarefa"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          console.log(text);
        }}
      />
      <SearchIcon color="primary" onClick={onSearchClick} />
      <Divider />
      Mostrar concluídas?
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <List>
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            username={user.username}
            onCheckboxClick={toggleChecked}
            onDeleteClick={deleteTask}
          />
        ))}
      </List>
      <Fab size="small" aria-label="add" onClick={() => navigate("/taskadd")}>
        <AddIcon color="primary" />
      </Fab>
      <Divider />
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination
          color="primary"
          count={Math.ceil(contador/4)}
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
};
