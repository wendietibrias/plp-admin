import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const Dashboard = lazy(() => import("@/Views/Dashboard/Dashboard"));

export const AdminRoutes = (
  <>
    <Route
      path="/"
      element={
        <Suspense>
          <Dashboard />
        </Suspense>
      }
    />
  </>
);
