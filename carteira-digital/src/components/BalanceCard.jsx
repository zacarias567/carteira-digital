import { Box, Typography, Chip } from '@mui/material';
import { CreditCard, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { user, balance as initialBalance } from '../data/mockData';
import { useWallet } from '../context/WalletContext';

const fmt = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function BalanceCard() {
  const [visible, setVisible] = useState(true);
  const { balance } = useWallet();

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 40%, #0891B2 100%)',
        borderRadius: 4,
        p: 3,
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(37,99,235,0.45)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -60,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -80,
          right: 40,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        },
      }}
    >
      {/* Top Row */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="caption" sx={{ opacity: 0.7, letterSpacing: 2, textTransform: 'uppercase', fontSize: '0.7rem' }}>
            Saldo disponível
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mt={0.5}>
            <Typography variant="h4" fontWeight={800} sx={{ fontFamily: '"Space Mono", monospace', letterSpacing: -1 }}>
              {visible ? fmt(balance) : 'R$ ••••••'}
            </Typography>
            <Box
              onClick={() => setVisible(v => !v)}
              sx={{ cursor: 'pointer', opacity: 0.8, '&:hover': { opacity: 1 }, display: 'flex' }}
            >
              {visible ? <Visibility sx={{ fontSize: 18 }} /> : <VisibilityOff sx={{ fontSize: 18 }} />}
            </Box>
          </Box>
        </Box>
        <Box sx={{ background: 'rgba(255,255,255,0.15)', borderRadius: 3, p: 1.2, backdropFilter: 'blur(10px)' }}>
          <CreditCard sx={{ fontSize: 24 }} />
        </Box>
      </Box>

      {/* Stats Row */}
      <Box display="flex" gap={2} mb={3}>
        {[
          { label: 'Entradas', value: initialBalance.income, color: '#34D399' },
          { label: 'Saídas', value: initialBalance.expense, color: '#F87171' },
        ].map(({ label, value, color }) => (
          <Box
            key={label}
            sx={{
              flex: 1,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 2.5,
              p: 1.5,
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mb: 0.3, fontSize: '0.68rem' }}>
              {label}
            </Typography>
            <Typography variant="body2" fontWeight={700} sx={{ color, fontFamily: '"Space Mono", monospace', fontSize: '0.85rem' }}>
              {visible ? fmt(value) : '••••••'}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Card Footer */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontFamily: '"Space Mono", monospace', letterSpacing: 2, fontSize: '0.8rem', opacity: 0.85 }}>
          {user.cardNumber}
        </Typography>
        <Chip
          label={user.cardBrand}
          size="small"
          sx={{
            background: 'rgba(255,255,255,0.2)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: 1,
            height: 24,
          }}
        />
      </Box>
    </Box>
  );
}
