import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AuthProvider from "./context/AuthContext.jsx";
import { ThemeProvider} from "@mui/material";
import muiTheme from "./theme/muiTheme";
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
     <ThemeProvider theme={muiTheme}>
       
        <App />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
)
