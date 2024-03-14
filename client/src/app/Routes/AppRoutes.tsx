import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { authRoute, publicRoute } from "./routes.ts";
import { ReqAuth } from "./ReqAuth.tsx";
import { NotFound } from "src/pages/notFound/NotFound.tsx";
import { Layout } from "src/components/layout/Layout.tsx";
import { useAppSelector } from "src/app/hooks/useAppSelector.ts";
import { AnimatePresence } from "framer-motion";

const AppRoutes: FC = () => {
  const isAuth = useAppSelector((state) => state.userSlice.isAuth);
  const location = useLocation();
  return (
    <AnimatePresence>
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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export { AppRoutes };
