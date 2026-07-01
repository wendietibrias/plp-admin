import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const AcademicAdvisor = lazy(() => import("@/Views/Academic/AcademicAdvisor"));

const AcademicAdvisorRoutes = (
  <>
    <Route
      path="/academic-advisors"
      element={
        <Suspense>
          <AcademicAdvisor />
        </Suspense>
      }
    />
  </>
);

export default AcademicAdvisorRoutes;
