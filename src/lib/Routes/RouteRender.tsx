import ErrorBoundary from "@/Components/ErrorBoundaries";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "antd";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { AdminRoutes } from "./AdminRoutes";
import RoleRoutes from "./Auth/RoleRoutes";
import UserRoutes from "./Auth/UserRoutes";
import LoginRoutes from "./LoginRoutes";
import SchoolYearRoutes from "./MasterData/SchoolYear/SchoolYearRoutes";
import CreateSchoolYearRoutes from "./MasterData/SchoolYear/CreateSchoolYearRoutes";
import EditSchoolYearRoutes from "./MasterData/SchoolYear/EditSchoolYearRoutes";
import StudyClassRoutes from "./MasterData/StudyClass/StudyClassRoutes";
import CreateStudyClassRoutes from "./MasterData/StudyClass/CreateStudyClassRoutes";
import EditStudyClassRoutes from "./MasterData/StudyClass/EditStudyClassRoutes";
import StudyProgramRoutes from "./MasterData/StudyProgram/StudyProgramRoutes";
import CreateStudyProgramRoutes from "./MasterData/StudyProgram/CreateStudyProgramRoutes";
import EditStudyProgramRoutes from "./MasterData/StudyProgram/EditStudyProgramRoutes";

const AuthLayout = lazy(() => import("@/Layouts/AuthLayout"));

const RouteRender = () => {
  const navigate = useNavigate();

  return (
    <ErrorBoundary
      fallback={
        <>
          <h1>Terjadi Kesalahan </h1>
          <Button onClick={() => navigate("/")}>Kembali</Button>
        </>
      }
    >
      <AnimatePresence mode="wait">
        <Suspense>
          <Routes>
            <Route element={<AdminLayout />}>
              <>{AdminRoutes}</>
              <>{UserRoutes}</>
              <>{RoleRoutes}</>
              <>{SchoolYearRoutes}</>
              <>{CreateSchoolYearRoutes}</>
              <>{EditSchoolYearRoutes}</>
              <>{StudyClassRoutes}</>
              <>{CreateStudyClassRoutes}</>
              <>{EditStudyClassRoutes}</>
              <>{StudyProgramRoutes}</>
              <>{CreateStudyProgramRoutes}</>
              <>{EditStudyProgramRoutes}</>
              <Route
                path="*"
                element={
                  <Suspense fallback={<></>}>
                    <div>
                      <span>
                        Empty Page{" "}
                        <Link to={"/"} className={"underline text-white"}>
                          Back to Home
                        </Link>
                      </span>
                    </div>
                  </Suspense>
                }
              />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              {LoginRoutes}
            </Route>
            <Route
              path="*"
              element={
                <Suspense fallback={<></>}>
                  <div>
                    <span>
                      Empty Page{" "}
                      <Link to={"/"} className={"underline text-white"}>
                        Back to Home
                      </Link>
                    </span>
                  </div>
                </Suspense>
              }
            />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </ErrorBoundary>
  );
};

export default RouteRender;
