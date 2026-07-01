import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const CreateClassSchedule = lazy(
  () => import("@/Views/Academic/ClassSchedule/CreateClassSchedule"),
);

const CreateClassScheduleRoutes = (
  <>
    <Route
      path="/class-schedules/create"
      element={
        <Suspense>
          <CreateClassSchedule />
        </Suspense>
      }
    />
  </>
);

export default CreateClassScheduleRoutes;
