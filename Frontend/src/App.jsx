import LandingPage from "./vendorDashboard/components/pages/LandingPage";
import "./App.css";
import { Routes,Route } from "react-router-dom";
import NotFound from "./vendorDashboard/components/forms/NotFound";


const App = () => {
  return (
    <div>  
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>    
      
    </div>
    
  )
}

export default App