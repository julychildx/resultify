import React, { useState, useEffect } from 'react'

import { Route, Routes, Navigate, Outlet } from "react-router"
import { Router } from "../router"

// pages
import Dashboard from "./Dashbaord"
import ResultList from "./ResultList"
import Result from "./Result"
import Generator from "./Generator"

import BootstrapTables from "./BootstrapTables"
import Signin from "./Signin"
import Signup from "./Signup"
import ForgotPassword from "./ForgotPassword"
import ResetPassword from "./ResetPassword"
import Lock from "./Lock"
import NotFoundPage from "./NotFound"
import ServerError from "./ServerError"

// components
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Preloader from "../components/Preloader"


const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Preloader show={ loaded ? false : true } />
      <Outlet />
    </>
  )
}

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible)

  const toggleSettings = () => {
    setShowSettings(!showSettings)
    localStorage.setItem('settingsVisible', !showSettings)
  }

  return (
    <>
      <Preloader show={ loaded ? false : true } />
      <Sidebar />

      <main className="content">
        <Navbar />
        <Outlet />
        <Footer toggleSettings={ toggleSettings } showSettings={ showSettings } />
      </main>
    </>
  )
}

export default () => (
  <Routes>

    {/* pages */ }
    <Route path='*' element={ <NotFoundPage /> } />
    <Route path="/examples" element={ <RouteWithLoader /> } >
      <Route path={ Router.Signin.path } element={ <Signin /> } />
      <Route path={ Router.Signup.path } element={ <Signup /> } />
      <Route path={ Router.ForgotPassword.path } element={ <ForgotPassword /> } />
      <Route path={ Router.ResetPassword.path } element={ <ResetPassword /> } />
      <Route path={ Router.Lock.path } element={ <Lock /> } />
      <Route path={ Router.ServerError.path } element={ <ServerError /> } />
    </Route>

    <Route path="/" element={ <RouteWithSidebar /> } >
      <Route path={ Router.Dashboard.path } element={ <Dashboard /> } />
      <Route path={ Router.Generator.path } element={ <Generator /> } />
      <Route path={ Router.ResultList.path } element={ <ResultList /> } />
      <Route path={ Router.Result.path } element={ <Result /> } />
      <Route path={ Router.BootstrapTables.path } element={ <BootstrapTables /> } />
    </Route>
  </Routes >
)
