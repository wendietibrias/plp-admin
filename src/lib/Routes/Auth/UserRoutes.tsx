import { lazy, Suspense } from "react";
import { Route } from "react-router";

const UserIndex = lazy(() => import("@/Views/Auth/Users/Index/UserIndex"));
const UserForm = lazy(() => import("@/Views/Auth/Users/Form/UserForm"));

const UserRoutes = (
  <Route path="/users">
    <Route
      index
      element={
        <Suspense>
          <UserIndex />
        </Suspense>
      }
    />
    <Route
      path="create"
      element={
        <Suspense>
          <UserForm />
        </Suspense>
      }
    />
    <Route
      path=":id/edit"
      element={
        <Suspense>
          <UserForm />
        </Suspense>
      }
    />
  </Route>
);

export default UserRoutes;
