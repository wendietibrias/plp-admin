import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const CourseAttendance = lazy(
  () => import("@/Views/Academic/CourseAttendance"),
);

const CourseAttendanceRoutes = (
  <>
    <Route
      path="/course-attendances"
      element={
        <Suspense>
          <CourseAttendance />
        </Suspense>
      }
    />
  </>
);

export default CourseAttendanceRoutes;
