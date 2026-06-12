import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const CreateStudyProgram = lazy(
  () => import("@/Views/MasterData/StudyProgram/CreateStudyProgram"),
);

const CreateStudyProgramRoutes = (
  <>
    <Route
      path="/study-programs/create"
      element={
        <Suspense>
          <CreateStudyProgram />
        </Suspense>
      }
    />
  </>
);

export default CreateStudyProgramRoutes;
