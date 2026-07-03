import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const CreateStudentCourse = lazy(
  () => import("@/Views/Academic/StudentCourse/CreateStudentCourse"),
);

const CreateStudentCourseRoutes = (
  <>
    <Route
      path="/student-courses/create"
      element={
        <Suspense>
          <CreateStudentCourse />
        </Suspense>
      }
    />
  </>
);

export default CreateStudentCourseRoutes;
