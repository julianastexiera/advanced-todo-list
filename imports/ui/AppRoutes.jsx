import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { LoginPage } from "./LoginPage";
import { Home } from "./Home";
import { TaskList } from "./TaskList";
import { TaskAdd } from "./TaskAdd";
import { TaskEdit } from "./TaskEdit";
import { UsuarioPage } from "./UsuarioPage";
import { UsuarioAdd} from "./UsuarioAdd";


import { AuthProvider } from "../../contexts/AuthContext";

export const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/tasklist" element={<TaskList />} />
          <Route exact path="/taskadd" element={<TaskAdd />} />

          <Route path="taskedit" element={<TaskEdit />}>
            <Route path=":taskId" element={<TaskEdit />} />
          </Route>
          <Route exact path="/cadastrarusuario" element={<UsuarioAdd />} />
          <Route exact path="/usuario" element={<UsuarioPage />} />
         
          <Route exact path="/" element={<Home />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};
