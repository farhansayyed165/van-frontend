import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from "react-cookie";
import AuthProvider from './context/AuthProvider';
import { createContext } from "react";
import RequireAuth from './components/RequireAuth';
import RefreshToken from './components/RefreshToken';
import PersistentLogin from "./components/PersistentLogin"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"
import Vans, { loader as vansLoader } from "./pages/Vans/Vans"
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail"
import Dashboard, { loader as dashboardLoader } from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans"
import HostVanDetail, { loader as hostVanDetailLoader } from "./pages/Host/HostVanDetail"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPricing from "./pages/Host/HostVanPricing"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import NotFound from "./pages/NotFound"
import Login from "./pages/LoginPage"
import Signup from './pages/Signup';
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
import Error from "./components/Error"
import { requireAuth } from "./utils"
import "./index.css"
import PromiseProvider from './components/PromiseProvider';
import VanPurchase, {loader as vanPurchaseLoader} from './pages/Vans/VanPurchase';
// import "../server"

export const UserContext = createContext()

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} title="About Page" />
    <Route
      path="login"
      element={<Login />}

    />
    <Route
      path='signup'
      element={<Signup />}
    />
    <Route
      path="vans"
      element={<Vans />}
      errorElement={<Error />}
      loader={vansLoader}
    >
      {/* <Route 
      path=':id'
      element={<VanDetail/>}>

      </Route> */}
    </Route>
    <Route
      path="vans/:id"
      element={<VanDetail />}
      errorElement={<Error />}
      loader={vanDetailLoader}
    >
        <Route 
        path='purchase'
        element={<VanPurchase/>}
        errorElement={<Error/>}
        loader={vanPurchaseLoader}></Route>
    </Route>
    <Route element={<RefreshToken />} path='/refresh'>

    </Route>


    <Route element={<PersistentLogin />}>

      <Route element={<RequireAuth />}>

        <Route element={<PromiseProvider />}>


          <Route path="host" element={<HostLayout />}>
            <Route
              index
              element={<Dashboard />}
              loader={dashboardLoader}
            />
            <Route
              path="income"
              element={<Income />}
            // loader={async ({ request }) => {const auth = await requireAuth(request); return auth}}
            />
            <Route
              path="reviews"
              element={<Reviews />}
            // loader={async ({ request }) => {const auth = await requireAuth(request); return auth}}
            />
            <Route
              path="vans"
              element={<HostVans />}
              errorElement={<Error />}
              loader={hostVansLoader}
            />
            <Route
              path="vans/:id"
              element={<HostVanDetail />}
              errorElement={<Error />}
              loader={hostVanDetailLoader}
            >
              <Route
                index
                element={<HostVanInfo />}
              // loader={async ({ request }) => await requireAuth(request)}
              />
              <Route
                path="pricing"
                element={<HostVanPricing />}
              // loader={async ({ request }) => await requireAuth(request)}
              />
              <Route
                path="photos"
                element={<HostVanPhotos />}
              // loader={async ({ request }) => await requireAuth(request)}
              />
            </Route>
          </Route>
          <Route>

          </Route>
        </Route>
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Route>
))

function App() {

  return (
    <CookiesProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CookiesProvider>
  )
}
// <UserContext.Provider value={{name:"",email:"", avatar:"", about:""}}>

{/* </UserContext.Provider> */ }
ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);