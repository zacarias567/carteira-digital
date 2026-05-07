import { Box, Typography } from '@mui/material';
import {
  Send, CallReceived, SwapHoriz, QrCode2,
} from '@mui/icons-material';

const actions = [
  { icon: <Send sx={{ fontSize: 22 }} />, label: 'Enviar', color: '#2563EB', bg: '#EFF6FF', key: 'enviar' },
  { icon: <CallReceived sx={{ fontSize: 22 }} />, label: 'Receber', color: '#10B981', bg: '#ECFDF5', key: 'receber' },
  { icon: <SwapHoriz sx={{ fontSize: 22 }} />, label: 'Transferir', color: '#8B5CF6', bg: '#F5F3FF', key: 'transferir' },
  { icon: <QrCode2 sx={{ fontSize: 22 }} />, label: 'Depositar', color: '#F59E0B', bg: '#FFFBEB', key: 'depositar' },
];

const darkBg = {
  '#EFF6FF': 'rgba(37,99,235,0.15)',
  '#ECFDF5': 'rgba(16,185,129,0.15)',
  '#F5F3FF': 'rgba(139,92,246,0.15)',
  '#FFFBEB': 'rgba(245,158,11,0.15)',
};

export default function QuickActions({ isDark, onAction }) {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={700} mb={1.5} color="text.primary">
        Ações rápidas
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={1.5}>
        {actions.map(({ icon, label, color, bg, key }) => (
          <Box
            key={label}
            onClick={() => onAction?.(key)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              '&:hover .action-icon': {
                transform: 'translateY(-3px)',
                boxShadow: `0 8px 20px ${color}40`,
              },
            }}
          >
            <Box
              className="action-icon"
              sx={{
                width: 52,
                height: 52,
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isDark ? darkBg[bg] : bg,
                color,
                transition: 'all 0.2s ease',
              }}
            >
              {icon}
            </Box>
            <Typography variant="caption" fontWeight={600} color="text.secondary" fontSize="0.72rem">
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
