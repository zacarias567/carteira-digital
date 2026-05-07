import { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider, useAppTheme } from './theme/ThemeContext';
import { WalletProvider } from './context/WalletContext';
import { lightTheme, darkTheme } from './theme/theme';
import AppRoutes from './routes/AppRoutes';
import BottomNav from './components/BottomNav';

function AppShell() {
  const { isDark } = useAppTheme();
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: theme.palette.background.default,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 430, position: 'relative', minHeight: '100vh' }}>
          <AppRoutes />
          <BottomNav />
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </WalletProvider>
    </ThemeProvider>
  );
}
