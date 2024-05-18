import { getAuth } from "firebase/auth";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { SignIn } from "../../pages/SignIn/SignIn";
import { Index } from "../../pages/Index/Index";

const authLoader = async () => {
  await getAuth().authStateReady();

  if (!getAuth().currentUser) {
    return redirect("/signin");
  }

  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Index,
    loader: authLoader,
  },
  {
    path: "/signin",
    Component: SignIn,
  },
]);

export const Router = (): JSX.Element => <RouterProvider router={router} />;
