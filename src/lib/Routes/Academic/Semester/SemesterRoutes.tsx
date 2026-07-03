import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const Semester = lazy(() => import("@/Views/Academic/Semester/Semester"));

const SemesterRoutes = (
  <>
    <Route
      path="/semesters"
      element={
        <Suspense>
          <Semester />
        </Suspense>
      }
    />
  </>
);

export default SemesterRoutes;
