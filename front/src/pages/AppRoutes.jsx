import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import DatosPage from "./DatosPage";
import Inicio from "./inicio";
import LoginPage from "./LoginPage";
import NodoPage from "./NodoPage";
import ProtectedRoute from "./ProtectedRoute";
import SensorForm from "./SensorForm";
import SensorList from "./SensorList";
import Example from "./TestPage";
import BateriaPage from "./BateriaPage";
import LogoutConfirmationPage from "./LogoutConfirmationPage";
import RegisterPage from "./RegisterPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Inicio />} />
        <Route path="list-sensor" element={<SensorList />} />
        <Route path="datos-view" element={<DatosPage />} />
        <Route
          path="create-sensor"
          element={
            <ProtectedRoute>
              <SensorForm />
            </ProtectedRoute>
          }
        />
        <Route path="sensor/:id" element={<NodoPage />} />
        <Route path="bateria-page" element={<BateriaPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="testpage" element={<Example />} />
        <Route path="/confirm-logout" element={<LogoutConfirmationPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
