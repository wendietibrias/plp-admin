import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const StudentCourse = lazy(
  () => import("@/Views/Academic/StudentCourse/StudentCourse"),
);

const StudentCourseRoutes = (
  <>
    <Route
      path="/student-courses"
      element={
        <Suspense>
          <StudentCourse />
        </Suspense>
      }
    />
  </>
);

export default StudentCourseRoutes;
