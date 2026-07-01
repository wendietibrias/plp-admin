import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const EditClassSchedule = lazy(
  () => import("@/Views/Academic/ClassSchedule/EditClassSchedule"),
);

const EditClassScheduleRoutes = (
  <>
    <Route
      path="/class-schedules/:id/edit"
      element={
        <Suspense>
          <EditClassSchedule />
        </Suspense>
      }
    />
  </>
);

export default EditClassScheduleRoutes;
