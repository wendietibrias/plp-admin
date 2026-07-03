import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const Student = lazy(() => import("@/Views/Academic/Student/Student"));

const StudentRoutes = (
  <>
    <Route
      path="/students"
      element={
        <Suspense>
          <Student />
        </Suspense>
      }
    />
  </>
);

export default StudentRoutes;
