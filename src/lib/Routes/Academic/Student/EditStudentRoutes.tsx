import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const EditStudent = lazy(() => import("@/Views/Academic/Student/EditStudent"));

const EditStudentRoutes = (
  <>
    <Route
      path="/students/:id/edit"
      element={
        <Suspense>
          <EditStudent />
        </Suspense>
      }
    />
  </>
);

export default EditStudentRoutes;
