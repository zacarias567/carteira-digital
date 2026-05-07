import { useState } from 'react';
import {
  Box, Typography, Paper, Divider, Chip, IconButton, useTheme, InputBase,
} from '@mui/material';
import { ArrowBack, Search, FilterList } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import TransactionItem from '../components/TransactionItem';
import { useWallet } from '../context/WalletContext';
import { useAppTheme } from '../theme/ThemeContext';

const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const filters = ['Todos', 'Receitas', 'Despesas', 'Pendentes'];

export default function History() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { toggle } = useAppTheme();
  const { transactions, balance: walletBalance } = useWallet();
  const [active, setActive] = useState('Todos');
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(tx => {
    const matchSearch = tx.name.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (active === 'Receitas') return tx.amount > 0;
    if (active === 'Despesas') return tx.amount < 0;
    if (active === 'Pendentes') return tx.status === 'pending';
    return true;
  });

  // Group by date
  const grouped = filtered.reduce((acc, tx) => {
    const key = tx.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(tx);
    return acc;
  }, {});

  const fmtDate = (d) =>
    new Date(d + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });

  return (
    <Box sx={{ pb: 10 }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 60%, #0891B2 100%)',
          pt: 3, pb: 3, px: 2.5,
        }}
      >
        <Box display="flex" alignItems="center" gap={1} mb={2.5}>
          <IconButton onClick={() => navigate('/')} size="small" sx={{ color: '#fff', background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
            <ArrowBack sx={{ fontSize: 18 }} />
          </IconButton>
          <Typography variant="h6" fontWeight={700} color="#fff" flex={1}>
            Histórico
          </Typography>
        </Box>

        {/* Summary */}
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          {[
            { label: 'Total recebido', value: transactions.filter(t => t.amount > 0).reduce((a,t) => a+t.amount, 0), positive: true },
            { label: 'Total gasto', value: Math.abs(transactions.filter(t => t.amount < 0).reduce((a,t) => a+t.amount, 0)), positive: false },
          ].map(({ label, value, positive }) => (
            <Box key={label} sx={{ background: 'rgba(255,255,255,0.12)', borderRadius: 2.5, p: 1.5 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'block', mb: 0.3, fontSize: '0.68rem' }}>
                {label}
              </Typography>
              <Typography variant="body1" fontWeight={800} sx={{ color: positive ? '#34D399' : '#F87171', fontFamily: '"Space Mono", monospace', fontSize: '0.95rem' }}>
                {fmt(value)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box px={2.5} mt={2.5}>
        {/* Search */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            background: isDark ? 'rgba(255,255,255,0.06)' : '#fff',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0',
            borderRadius: 3,
            px: 2,
            py: 0.5,
            mb: 2,
            boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <Search sx={{ color: 'text.secondary', fontSize: 18 }} />
          <InputBase
            placeholder="Buscar transação..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            fullWidth
            sx={{ fontSize: '0.875rem', fontFamily: 'Plus Jakarta Sans', '& input': { py: 0.8 } }}
          />
        </Box>

        {/* Filters */}
        <Box display="flex" gap={1} mb={2.5} sx={{ overflowX: 'auto', pb: 0.5, '&::-webkit-scrollbar': { display: 'none' } }}>
          {filters.map(f => (
            <Chip
              key={f}
              label={f}
              onClick={() => setActive(f)}
              variant={active === f ? 'filled' : 'outlined'}
              color={active === f ? 'primary' : 'default'}
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: '0.75rem',
                flexShrink: 0,
                ...(active !== f && { borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E2E8F0' }),
              }}
            />
          ))}
        </Box>

        {/* Transactions grouped by date */}
        {Object.keys(grouped).length === 0 ? (
          <Box textAlign="center" py={6}>
            <Typography color="text.secondary" variant="body2">Nenhuma transação encontrada.</Typography>
          </Box>
        ) : (
          Object.entries(grouped).map(([date, txs]) => (
            <Box key={date} mb={2}>
              <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
                sx={{ textTransform: 'capitalize', fontSize: '0.72rem', letterSpacing: 0.5 }}
              >
                {fmtDate(date)}
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  mt: 1,
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#EEF2FF',
                  boxShadow: isDark ? 'none' : '0 2px 12px rgba(37,99,235,0.05)',
                  overflow: 'hidden',
                }}
              >
                {txs.map((tx, i) => (
                  <Box key={tx.id} px={2}>
                    <TransactionItem tx={tx} isDark={isDark} showStatus />
                    {i < txs.length - 1 && (
                      <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9' }} />
                    )}
                  </Box>
                ))}
              </Paper>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
