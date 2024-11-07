import { CssBaseline } from '@mui/material';
import "../assets/styles/customerMain.css";
import Projects from "../compoenents/Home/Projects";
import Statistics from "../compoenents/Home/Statistics";
import ProjectsPending from "../compoenents/Home/ProjectsPending";
import ProjectsCompleted from "../compoenents/Home/ProjectsCompleted";
import ProjectsNew from "../compoenents/Home/ProjectsNew";


const CustomerHome = () => {
 
return (
  <div >
    
      <div ><Statistics /></div>
      <h2 style={{ textAlign: 'left', fontFamily: 'Nunito, Poppins, sans-serif', marginBottom: '20px' }}>Projects</h2>
      <div ><ProjectsCompleted /></div>

      {/* <div className="header"><Projects /></div>

      <h2 style={{ textAlign: 'left', fontFamily: 'Nunito, Poppins, sans-serif', marginBottom: '10px' }}>New Estates</h2>
      <div className="header"><ProjectsNew /></div>

      <h2 style={{ textAlign: 'left', fontFamily: 'Nunito, Poppins, sans-serif', marginBottom: '10px' }}>Pending Estates</h2>
      <div className="header"><ProjectsPending /></div>

      <h2 style={{ textAlign: 'left', fontFamily: 'Nunito, Poppins, sans-serif', marginBottom: '10px' }}>Completed Estates</h2>
      <div className="header"><ProjectsCompleted /></div> */}
    </div>
);
};

export default CustomerHome;

