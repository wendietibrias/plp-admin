import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const LoginForm = lazy(() => import("@/Views/Auth/Login/LoginForm"));

const LoginRoutes = (
  <Route path="login">
    <Route
      index
      element={
        <Suspense>
          <LoginForm />
        </Suspense>
      }
    />
  </Route>
);

export default LoginRoutes;
