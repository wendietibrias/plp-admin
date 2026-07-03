import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const Lecture = lazy(() => import("@/Views/Academic/Lecture/Lecture"));

const LectureRoutes = (
  <>
    <Route
      path="/lecturers"
      element={
        <Suspense>
          <Lecture />
        </Suspense>
      }
    />
  </>
);

export default LectureRoutes;
