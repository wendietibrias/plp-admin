import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const StudyClass = lazy(
  () => import("@/Views/MasterData/StudyClass/StudyClass"),
);

const StudyClassRoutes = (
  <>
    <Route
      path="/study-classes"
      element={
        <Suspense>
          <StudyClass />
        </Suspense>
      }
    />
  </>
);

export default StudyClassRoutes;
