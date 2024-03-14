import { AppRoutes } from "src/app/Routes/AppRoutes";
import { useAppDispatch } from "./app/hooks/useAppDispatch";
import { getUser } from "./app/store/slices/userSlice";

function App() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(getUser());
  }
  return <AppRoutes />;
}

export default App;
