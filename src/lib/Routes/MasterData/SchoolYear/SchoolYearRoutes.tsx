import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const SchoolYear = lazy(
  () => import("@/Views/MasterData/SchoolYear/SchoolYear"),
);

const SchoolYearRoutes = (
  <>
    <Route
      path="/school-years"
      element={
        <Suspense>
          <SchoolYear />
        </Suspense>
      }
    />
  </>
);

export default SchoolYearRoutes;
