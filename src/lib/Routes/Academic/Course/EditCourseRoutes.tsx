import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const EditCourse = lazy(() => import("@/Views/Academic/Course/EditCourse"));

const EditCourseRoutes = (
  <>
    <Route
      path="/courses/:id/edit"
      element={
        <Suspense>
          <EditCourse />
        </Suspense>
      }
    />
  </>
);

export default EditCourseRoutes;
