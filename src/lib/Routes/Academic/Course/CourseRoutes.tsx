import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const Course = lazy(() => import("@/Views/Academic/Course/Course"));

const CourseRoutes = (
  <>
    <Route
      path="/courses"
      element={
        <Suspense>
          <Course />
        </Suspense>
      }
    />
  </>
);

export default CourseRoutes;
