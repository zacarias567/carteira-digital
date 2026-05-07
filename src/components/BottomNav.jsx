import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, History, CreditCard, Person } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { label: 'Início', icon: <Home />, path: '/' },
  { label: 'Histórico', icon: <History />, path: '/historico' },
  { label: 'Cartão', icon: <CreditCard />, path: '/cartao' },
  { label: 'Perfil', icon: <Person />, path: '/perfil' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const value = tabs.findIndex(t => t.path === pathname);

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        zIndex: 100,
        borderTop: '1px solid',
        borderColor: 'divider',
        borderRadius: '20px 20px 0 0',
        overflow: 'hidden',
      }}
    >
      <BottomNavigation
        value={value === -1 ? 0 : value}
        onChange={(_, newVal) => navigate(tabs[newVal].path)}
        sx={{ height: 64 }}
      >
        {tabs.map(({ label, icon }) => (
          <BottomNavigationAction
            key={label}
            label={label}
            icon={icon}
            sx={{
              minWidth: 0,
              fontSize: '0.65rem',
              '& .MuiBottomNavigationAction-label': { fontSize: '0.65rem', fontFamily: 'Plus Jakarta Sans', fontWeight: 600 },
              '&.Mui-selected': { color: 'primary.main' },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
