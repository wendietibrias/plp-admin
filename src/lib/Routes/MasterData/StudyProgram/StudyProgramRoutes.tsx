import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const StudyProgram = lazy(
  () => import("@/Views/MasterData/StudyProgram/StudyProgram"),
);

const StudyProgramRoutes = (
  <>
    <Route
      path="/study-programs"
      element={
        <Suspense>
          <StudyProgram />
        </Suspense>
      }
    />
  </>
);

export default StudyProgramRoutes;
