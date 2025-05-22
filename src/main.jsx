import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import AuthProvider from './Firebase/AuthProvider.jsx';
import Error from './Components/Error.jsx';
import Login from './Firebase/Login.jsx';
import Register from './Firebase/Register.jsx';
import Home from './Layout/Home.jsx';
import MainLayout from './Layout/MainLayout.jsx';
import RecipeDetails from './Layout/RecipeDetails.jsx';
import AllRecipes from './Layout/AllRecipes.jsx';
import AddRecipe from './Layout/AddRecipe.jsx';
import MyRecipe from './Layout/MyRecipe.jsx';
import AuthGuard from './Firebase/AuthGuard.jsx';
import EditRecipe from './Layout/EditRecipe.jsx';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "allrecipes",
        Component: AllRecipes,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "recipe/:id",
        element: <AuthGuard><RecipeDetails></RecipeDetails></AuthGuard>
      },
      {
        path: "addrecipe",
        element: <AuthGuard><AddRecipe></AddRecipe> </AuthGuard>
      },
      {
        path: "myrecipes",
        element: <AuthGuard><MyRecipe></MyRecipe> </AuthGuard>
      },
      {
        path: "edit-recipe/:id",
        element: <AuthGuard><EditRecipe></EditRecipe></AuthGuard>
      },

    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
