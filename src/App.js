import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import Movie from './component/Movie/Movie'
import Tv from './component/Tv/Tv'
import People from './component/People/People'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Logout from './component/Logout/Logout'
import Main from './component/Main/index'
import Detailes from './component/Detailes/Detailes'
import DetailesTv from './component/Detailes/DetailesTv'
import DetailesPeople from './component/Detailes/DetailesPeople'
export default function App() {
  let routers = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <Main /> },
        { path: "home", element: <Home /> },
        { path: "movie", element: <Movie /> },
        { path: "tv", element: <Tv /> },
        { path: "people", element: <People /> },
        { path: "logout", element: <Logout /> },
        { path: "movie/detailes/:id", element: <Detailes /> },
        { path: "tv/detailes/:id", element: <DetailesTv /> },
        { path: "people/detailes/:id", element: <DetailesPeople /> },
      ]
    },
    { path: 'login', element: <Login /> },
    { path: "register", element: <Register /> },
  ])
  return <>
    <RouterProvider router={routers}></RouterProvider>
  </>
}
