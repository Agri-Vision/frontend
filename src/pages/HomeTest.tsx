import { CssBaseline } from '@mui/material';
import "../assets/styles/customerMain.css";
import Projects from "../compoenents/Home/Projects";


const HomeTest = () => {
 
return (
  <div className="grid-container">
      <CssBaseline />
      <h2 style={{ textAlign: 'left', fontFamily: 'Nunito, Poppins, sans-serif', marginBottom: '20px' }}>Estates</h2>
      <div className="header"><Projects /></div>
    </div>
);
};

export default HomeTest;

