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
        Component: RecipeDetails,
      },
      {
        path: "addrecipe",
        Component: AddRecipe,
      },
      {
        path: "myrecipes",
        Component: MyRecipe,
      },
      // Private Routes
      // {
      //   Component: PrivateRoute, // This will wrap the private routes
      //   children: [
      //     {
      //       path: "addrecipe",
      //       Component: AddRecipe,
      //     },
      //     {
      //       path: "my-recipes",
      //       Component: MyRecipes,
      //     },
      //   ],
      // },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
