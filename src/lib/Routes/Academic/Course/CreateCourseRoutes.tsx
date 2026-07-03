import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const CreateCourse = lazy(() => import("@/Views/Academic/Course/CreateCourse"));

const CreateCourseRoutes = (
  <>
    <Route
      path="/courses/create"
      element={
        <Suspense>
          <CreateCourse />
        </Suspense>
      }
    />
  </>
);

export default CreateCourseRoutes;
