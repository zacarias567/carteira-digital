import { createTheme } from '@mui/material/styles';

const baseTypography = {
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  h1: { fontWeight: 800 },
  h2: { fontWeight: 800 },
  h3: { fontWeight: 700 },
  h4: { fontWeight: 700 },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  button: { fontWeight: 600, textTransform: 'none', letterSpacing: 0 },
};

const baseComponents = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 14,
        padding: '10px 22px',
        fontSize: '0.875rem',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: { borderRadius: 20 },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: { borderRadius: 20 },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2563EB', light: '#3B82F6', dark: '#1D4ED8', contrastText: '#fff' },
    secondary: { main: '#06B6D4', light: '#22D3EE', dark: '#0891B2' },
    success: { main: '#10B981' },
    error: { main: '#EF4444' },
    warning: { main: '#F59E0B' },
    background: { default: '#F0F4FF', paper: '#FFFFFF' },
    text: { primary: '#0F172A', secondary: '#64748B' },
  },
  typography: baseTypography,
  components: {
    ...baseComponents,
    MuiBottomNavigation: {
      styleOverrides: {
        root: { borderRadius: '20px 20px 0 0', borderTop: '1px solid #E2E8F0' },
      },
    },
  },
  shape: { borderRadius: 12 },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3B82F6', light: '#60A5FA', dark: '#2563EB', contrastText: '#fff' },
    secondary: { main: '#22D3EE', light: '#67E8F9', dark: '#06B6D4' },
    success: { main: '#34D399' },
    error: { main: '#F87171' },
    warning: { main: '#FBBF24' },
    background: { default: '#070B14', paper: '#0F172A' },
    text: { primary: '#F1F5F9', secondary: '#94A3B8' },
  },
  typography: baseTypography,
  components: {
    ...baseComponents,
    MuiBottomNavigation: {
      styleOverrides: {
        root: { background: '#0F172A', borderRadius: '20px 20px 0 0', borderTop: '1px solid #1E293B' },
      },
    },
  },
  shape: { borderRadius: 12 },
});
