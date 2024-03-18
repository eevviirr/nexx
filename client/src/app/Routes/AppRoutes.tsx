import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { adminRoute, authRoute, publicRoute } from "./routes.ts";
import { ReqAuth } from "./ReqAuth.tsx";
import { NotFound } from "src/pages/notFound/NotFound.tsx";
import { Layout } from "src/components/layout/Layout.tsx";
import { useAppSelector } from "src/app/hooks/useAppSelector.ts";

const AppRoutes: FC = () => {
  const isAuth = useAppSelector((state) => state.userSlice.isAuth);
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Layout />}>
        {publicRoute.map(({ Component, path }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        {authRoute.map(({ Component, path }) => (
          <Route
            key={path}
            path={path}
            element={
              <ReqAuth isAuth={isAuth}>
                <Component />
              </ReqAuth>
            }
          />
        ))}
      </Route>
      {adminRoute.map(({ Component, path }) => (
        <Route
          key={path}
          path={path}
          element={
            <ReqAuth isAuth={isAuth}>
              <Component />
            </ReqAuth>
          }
        />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export { AppRoutes };
