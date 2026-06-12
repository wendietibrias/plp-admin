import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const EditStudyProgram = lazy(
  () => import("@/Views/MasterData/StudyProgram/EditStudyProgram"),
);

const EditStudyProgramRoutes = (
  <>
    <Route
      path="/study-programs/:id/edit"
      element={
        <Suspense>
          <EditStudyProgram />
        </Suspense>
      }
    />
  </>
);

export default EditStudyProgramRoutes;
