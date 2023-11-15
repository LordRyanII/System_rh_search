import { ThemeProvider } from '@mui/material';
import { theme } from './config/theme';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './config/routes';
import { UserProvider } from './contexts/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <UserProvider>
              <AppRouter />
          </UserProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
