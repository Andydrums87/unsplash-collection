import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "../src/pages/HomePage/HomePage"
import LoginPage from './pages/LoginPage'
import SignUpPage from "./pages/SignUpPage"
import './App.css'
import SearchResultPage from './pages/SearchResultsPage/SearchResultPage'
import ImageDetailsPage from './pages/ImageDetailsPage/ImageDetailsPage'
import CollectionsPage from './pages/CollectionsPage/CollectionsPage'
import SingleCollectionPage from './pages/SingleCollectionPage'
import ErrorPage from './pages/Errorpage/ErrorPage'
import VerifyEmail from './pages/VerifyEmail/VerifyEmail'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import ProtectedRoutes from './utlis/ProtectedRoutes'



function App() {


  return (
    <div className="main__body">

    <BrowserRouter>
     <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignUpPage />}/>
      <Route path="/verify-email/:id/verify/:token" element={<VerifyEmail />}/>
      <Route path="/forget-password" element={<ForgetPassword />}/>
      <Route path="/resetPassword/:token" element={<ResetPassword />}/>
      <Route path="/results" element={<SearchResultPage />}/>
      <Route path="/collection" element={<SingleCollectionPage />} />
  
      <Route path="/detail" element={
        <ProtectedRoutes>
            <ImageDetailsPage />
        </ProtectedRoutes>
      }/>

      <Route path="/collections" element={
          <ProtectedRoutes>
            <CollectionsPage />
         </ProtectedRoutes>  }/>
   
   {/* <Route element={<ProtectedRoutes />}>
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/detail" element={<ImageDetailsPage />} />
      </Route> */}
      <Route path='*' element={<ErrorPage />}/>
      </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
