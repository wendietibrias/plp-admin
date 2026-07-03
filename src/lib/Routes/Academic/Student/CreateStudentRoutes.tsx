import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const CreateStudent = lazy(
  () => import("@/Views/Academic/Student/CreateStudent"),
);

const CreateStudentRoutes = (
  <>
    <Route
      path="/students/create"
      element={
        <Suspense>
          <CreateStudent />
        </Suspense>
      }
    />
  </>
);

export default CreateStudentRoutes;
