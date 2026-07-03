import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const EditStudentCourse = lazy(
  () => import("@/Views/Academic/StudentCourse/EditStudentCourse"),
);

const EditStudentCourseRoutes = (
  <>
    <Route
      path="/student-courses/:id/edit"
      element={
        <Suspense>
          <EditStudentCourse />
        </Suspense>
      }
    />
  </>
);

export default EditStudentCourseRoutes;
