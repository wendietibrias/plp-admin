import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const ClassSchedule = lazy(
  () => import("@/Views/Academic/ClassSchedule/ClassSchedule"),
);

const ClassScheduleRoutes = (
  <>
    <Route
      path="/class-schedules"
      element={
        <Suspense>
          <ClassSchedule />
        </Suspense>
      }
    />
  </>
);

export default ClassScheduleRoutes;
