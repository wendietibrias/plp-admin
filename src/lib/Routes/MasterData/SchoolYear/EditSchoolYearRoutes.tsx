import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const EditSchoolYear = lazy(
  () => import("@/Views/MasterData/SchoolYear/EditSchoolYear"),
);

const EditSchoolYearRoutes = (
  <>
    <Route
      path="/school-years/:id/edit"
      element={
        <Suspense>
          <EditSchoolYear />
        </Suspense>
      }
    />
  </>
);

export default EditSchoolYearRoutes;
