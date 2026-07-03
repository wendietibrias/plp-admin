import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const CreateLecture = lazy(
  () => import("@/Views/Academic/Lecture/CreateLecture"),
);

const CreateLectureRoutes = (
  <>
    <Route
      path="/lecturers/create"
      element={
        <Suspense>
          <CreateLecture />
        </Suspense>
      }
    />
  </>
);

export default CreateLectureRoutes;
