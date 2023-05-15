import React, { lazy } from "react";
import { LOGIN } from "./Routes";

const Login = lazy(() => import("../container/Signin/Login"));

export const publicRoute = [
  {
    path: LOGIN,
    component: <Login />,
  },
];
