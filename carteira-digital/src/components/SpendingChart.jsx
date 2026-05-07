import { Box, Typography, useTheme } from '@mui/material';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { chartData } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{
      background: 'rgba(15,23,42,0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 2,
      p: 1.5,
      color: '#fff',
    }}>
      <Typography variant="caption" fontWeight={700} display="block" mb={0.5}>{label}</Typography>
      {payload.map(p => (
        <Typography key={p.name} variant="caption" display="block" sx={{ color: p.color }}>
          {p.name === 'receita' ? 'Receita' : 'Despesa'}: R$ {p.value.toLocaleString('pt-BR')}
        </Typography>
      ))}
    </Box>
  );
};

export default function SpendingChart() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          Movimentação
        </Typography>
        <Box display="flex" gap={2}>
          {[
            { color: '#2563EB', label: 'Receita' },
            { color: '#F87171', label: 'Despesa' },
          ].map(({ color, label }) => (
            <Box key={label} display="flex" alignItems="center" gap={0.5}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="receitaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="despesaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F87171" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F87171" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1E293B' : '#EEF2FF'} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: isDark ? '#64748B' : '#94A3B8', fontFamily: 'Plus Jakarta Sans' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: isDark ? '#64748B' : '#94A3B8', fontFamily: 'Plus Jakarta Sans' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="receita" stroke="#2563EB" strokeWidth={2.5} fill="url(#receitaGrad)" dot={false} />
            <Area type="monotone" dataKey="despesa" stroke="#F87171" strokeWidth={2.5} fill="url(#despesaGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
