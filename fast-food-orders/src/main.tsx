import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { FastFoodOrderDisplay } from './FastFoodOrderDisplay'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FastFoodOrderControls } from './FastFoodOrderControls';

const RootRedirect = () => {
  useEffect(() => {
    // Open the control window as a popup
    const popup = window.open(
      "/fastfood/control",
      "controlWindow",
      "popup=yes,width=600,height=800,left=100,top=100"
    );

    // Optional: focus the popup if it opened successfully
    if (popup) {
      popup.focus();
    }
  }, []);

  // Redirect this tab to /display
  return <Navigate to="/display" replace />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/fastfood">
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/display" element={<FastFoodOrderDisplay />} />
        <Route path="/control" element={<FastFoodOrderControls />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
