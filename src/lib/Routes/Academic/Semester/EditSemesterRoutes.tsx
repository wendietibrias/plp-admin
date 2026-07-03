import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const EditSemester = lazy(
  () => import("@/Views/Academic/Semester/EditSemester"),
);

const EditSemesterRoutes = (
  <>
    <Route
      path="/semesters/:id/edit"
      element={
        <Suspense>
          <EditSemester />
        </Suspense>
      }
    />
  </>
);

export default EditSemesterRoutes;
