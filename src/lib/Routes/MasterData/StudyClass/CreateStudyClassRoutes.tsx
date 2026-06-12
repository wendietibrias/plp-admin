import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const CreateStudyClass = lazy(
  () => import("@/Views/MasterData/StudyClass/CreateStudyClass"),
);

const CreateStudyClassRoutes = (
  <>
    <Route
      path="/study-classes/create"
      element={
        <Suspense>
          <CreateStudyClass />
        </Suspense>
      }
    />
  </>
);

export default CreateStudyClassRoutes;
