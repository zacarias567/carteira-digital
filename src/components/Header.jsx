import { Box, Typography, Avatar, IconButton, Badge, useTheme } from '@mui/material';
import { Notifications, DarkMode, LightMode } from '@mui/icons-material';
import { useAppTheme } from '../theme/ThemeContext';
import { user } from '../data/mockData';

export default function Header() {
  const { isDark, toggle } = useAppTheme();
  const theme = useTheme();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center" gap={1.5}>
        <Avatar
          sx={{
            width: 42,
            height: 42,
            background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
            fontWeight: 800,
            fontSize: '0.9rem',
          }}
        >
          {user.avatar}
        </Avatar>
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight={500} display="block" lineHeight={1.2}>
            {greeting} 👋
          </Typography>
          <Typography variant="subtitle2" fontWeight={700} color="text.primary" lineHeight={1.3}>
            {user.firstName}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" gap={0.5}>
        <IconButton onClick={toggle} size="small" sx={{ color: 'text.secondary' }}>
          {isDark ? <LightMode sx={{ fontSize: 20 }} /> : <DarkMode sx={{ fontSize: 20 }} />}
        </IconButton>
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', minWidth: 16, height: 16 } }}>
            <Notifications sx={{ fontSize: 20 }} />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
}
