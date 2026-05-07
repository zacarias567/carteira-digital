import { Box, Typography, Avatar, Paper, Switch, Divider, useTheme } from '@mui/material';
import {
  Person, Security, Notifications, Help, Logout,
  DarkMode, ChevronRight,
} from '@mui/icons-material';
import { useAppTheme } from '../theme/ThemeContext';
import { user, balance } from '../data/mockData';

const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function Profile() {
  const { isDark, toggle } = useAppTheme();
  const theme = useTheme();

  const menuItems = [
    { icon: <Person />, label: 'Dados pessoais', color: '#2563EB' },
    { icon: <Security />, label: 'Segurança', color: '#8B5CF6' },
    { icon: <Notifications />, label: 'Notificações', color: '#F59E0B' },
    { icon: <Help />, label: 'Ajuda e suporte', color: '#10B981' },
  ];

  return (
    <Box sx={{ pb: 10, pt: 3, px: 2.5 }}>
      {/* Profile header */}
      <Box textAlign="center" mb={3}>
        <Avatar
          sx={{
            width: 72,
            height: 72,
            background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
            fontWeight: 800,
            fontSize: '1.5rem',
            mx: 'auto',
            mb: 1.5,
            boxShadow: '0 8px 24px rgba(37,99,235,0.4)',
          }}
        >
          {user.avatar}
        </Avatar>
        <Typography variant="h6" fontWeight={700} color="text.primary">{user.name}</Typography>
        <Typography variant="body2" color="text.secondary">{user.email}</Typography>
      </Box>

      {/* Balance summary */}
      <Paper elevation={0} sx={{ p: 2.5, border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#EEF2FF', mb: 2.5, background: isDark ? 'rgba(37,99,235,0.1)' : '#EFF6FF' }}>
        <Typography variant="caption" color="primary.main" fontWeight={700} display="block" mb={1.5}>
          RESUMO DA CONTA
        </Typography>
        <Box display="flex" justifyContent="space-around">
          {[
            { label: 'Saldo', value: balance.available },
            { label: 'Economias', value: balance.saved },
          ].map(({ label, value }) => (
            <Box key={label} textAlign="center">
              <Typography variant="body2" fontWeight={800} color="text.primary" sx={{ fontFamily: '"Space Mono", monospace', fontSize: '0.9rem' }}>
                {fmt(value)}
              </Typography>
              <Typography variant="caption" color="text.secondary">{label}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Menu */}
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#EEF2FF', overflow: 'hidden', mb: 2 }}>
        {menuItems.map(({ icon, label, color }, i) => (
          <Box key={label}>
            <Box
              display="flex"
              alignItems="center"
              gap={1.5}
              px={2.5}
              py={1.8}
              sx={{ cursor: 'pointer', '&:hover': { background: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF' } }}
            >
              <Box sx={{ color, display: 'flex' }}>
                {icon}
              </Box>
              <Typography variant="body2" fontWeight={600} flex={1} color="text.primary">
                {label}
              </Typography>
              <ChevronRight sx={{ color: 'text.secondary', fontSize: 18 }} />
            </Box>
            {i < menuItems.length - 1 && <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9' }} />}
          </Box>
        ))}
      </Paper>

      {/* Dark mode toggle */}
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#EEF2FF', mb: 2 }}>
        <Box display="flex" alignItems="center" gap={1.5} px={2.5} py={1.8}>
          <DarkMode sx={{ color: '#64748B' }} />
          <Typography variant="body2" fontWeight={600} flex={1} color="text.primary">
            Modo escuro
          </Typography>
          <Switch checked={isDark} onChange={toggle} size="small" color="primary" />
        </Box>
      </Paper>

      {/* Logout */}
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#FEE2E2', background: isDark ? 'rgba(239,68,68,0.08)' : '#FFF5F5' }}>
        <Box display="flex" alignItems="center" gap={1.5} px={2.5} py={1.8} sx={{ cursor: 'pointer' }}>
          <Logout sx={{ color: '#EF4444' }} />
          <Typography variant="body2" fontWeight={600} color="error.main">
            Sair da conta
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
