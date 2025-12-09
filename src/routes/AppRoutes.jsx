import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Register } from "../pages";
import { ROUTES } from "./index";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      {/* Thêm các route khác ở đây */}
    </Routes>
  );
};

export default AppRoutes;
