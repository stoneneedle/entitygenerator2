// React
import './App.css';
import { useState } from "react";

// Context API & App Data
import { AppContext } from "./AppContext";
import appDataJsonfile from './data/appdata.json';

// Entity Generator Engine
import { EntityGenerator } from "./scripts/entities";

// MUI
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from "@mui/material";

// Components
import MiniDrawer from "./components/MiniDrawer";


function App() {

  const eg = new EntityGenerator(appDataJsonfile.entityGeneratorObjects);
  appDataJsonfile.entityObjects = eg.entityObjects;

  const [appData, setAppData] = useState(appDataJsonfile);
  const [mode] = useState("dark");

  console.log(appData);

  const jgTheme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#793fb5',
      },
      secondary: {
        main: '#e8e522',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 740,
        md: 900,
        lg: 1200,
        xl: 1536,
      }
    }
  });

  return (
    <AppContext.Provider value={{ appData, setAppData }}>
      <ThemeProvider theme={jgTheme}>
        <CssBaseline />
        <MiniDrawer />
      </ThemeProvider>
    </AppContext.Provider>
    );

}

export default App;
