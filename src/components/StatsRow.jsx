import { Box, Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { quickStats } from '../data/mockData';

const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function StatsRow({ isDark }) {
  return (
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1.5}>
      {quickStats.map(({ label, value, trend, positive }) => (
        <Box
          key={label}
          sx={{
            background: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#EEF2FF',
            borderRadius: 3,
            p: 1.5,
            boxShadow: isDark ? 'none' : '0 2px 12px rgba(37,99,235,0.06)',
          }}
        >
          <Typography variant="caption" color="text.secondary" fontWeight={500} display="block" mb={0.5} fontSize="0.68rem">
            {label}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={800}
            color="text.primary"
            sx={{ fontFamily: '"Space Mono", monospace', fontSize: '0.78rem', lineHeight: 1.2 }}
          >
            {fmt(value)}
          </Typography>
          <Box display="flex" alignItems="center" gap={0.3} mt={0.5}>
            {positive
              ? <TrendingUp sx={{ fontSize: 12, color: '#10B981' }} />
              : <TrendingDown sx={{ fontSize: 12, color: '#EF4444' }} />}
            <Typography variant="caption" sx={{ color: positive ? '#10B981' : '#EF4444', fontWeight: 700, fontSize: '0.65rem' }}>
              {trend}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
