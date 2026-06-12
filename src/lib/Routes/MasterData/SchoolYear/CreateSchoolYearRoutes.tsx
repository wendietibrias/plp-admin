import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const CreateSchoolYear = lazy(
  () => import("@/Views/MasterData/SchoolYear/CreateSchoolYear"),
);

const CreateSchoolYearRoutes = (
  <>
    <Route
      path="/school-years/create"
      element={
        <Suspense>
          <CreateSchoolYear />
        </Suspense>
      }
    />
  </>
);

export default CreateSchoolYearRoutes;
