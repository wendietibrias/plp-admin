import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const EditStudyClass = lazy(
  () => import("@/Views/MasterData/StudyClass/EditStudyClass"),
);

const EditStudyClassRoutes = (
  <>
    <Route
      path="/study-classes/:id/edit"
      element={
        <Suspense>
          <EditStudyClass />
        </Suspense>
      }
    />
  </>
);

export default EditStudyClassRoutes;
