import { BrowserRouter } from "react-router-dom";
import { Box, ThemeProvider } from "@mui/material";

import IndexRoutes from "./routes/IndexRoutes";
import { AppTheme } from "./assets/styles/Themes/CustomAppTheme";
import { IoTProvider } from '../src/compoenents/IoTContext'; 
import { ButtonProvider } from '../src/compoenents/ButtonContext';
import { MapTypeProvider } from './compoenents/MapTypeContext'; 
import { MapHighlightProvider } from './compoenents/MapHighlightContext';

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <Box className="App">
      <MapHighlightProvider> 
        <ButtonProvider>  
          <IoTProvider>  
            <MapTypeProvider>  
              <BrowserRouter>
                <IndexRoutes />
              </BrowserRouter>
            </MapTypeProvider>
          </IoTProvider>
        </ButtonProvider>  
        </MapHighlightProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
