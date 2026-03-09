import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const RoleIndex = lazy(() => import("@/Views/Auth/Role/Index/RoleIndex"));
const RoleDetail = lazy(() => import("@/Views/Auth/Role/Detail/RoleDetail"));
const RoleForm = lazy(() => import("@/Views/Auth/Role/Form/RoleForm"));

const RoleRoutes = (
  <Route path="/roles">
    <Route
      index
      element={
        <Suspense>
          <RoleIndex />
        </Suspense>
      }
    />
    <Route
      path="create"
      element={
        <Suspense>
          <RoleForm />
        </Suspense>
      }
    />
    <Route
      path=":id/edit"
      element={
        <Suspense>
          <RoleForm />
        </Suspense>
      }
    />
    <Route
      path=":id"
      element={
        <Suspense>
          <RoleDetail />
        </Suspense>
      }
    />
  </Route>
);

export default RoleRoutes;
