import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const EditLecture = lazy(() => import("@/Views/Academic/Lecture/EditLecture"));

const EditLectureRoutes = (
  <>
    <Route
      path="/lecturers/:id/edit"
      element={
        <Suspense>
          <EditLecture />
        </Suspense>
      }
    />
  </>
);

export default EditLectureRoutes;
