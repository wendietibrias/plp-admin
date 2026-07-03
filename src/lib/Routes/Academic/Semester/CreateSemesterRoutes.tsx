import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const CreateSemester = lazy(
  () => import("@/Views/Academic/Semester/CreateSemester"),
);

const CreateSemesterRoutes = (
  <>
    <Route
      path="/semesters/create"
      element={
        <Suspense>
          <CreateSemester />
        </Suspense>
      }
    />
  </>
);

export default CreateSemesterRoutes;
