import { Box, Typography, Paper, Divider, useTheme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import QuickActions from '../components/QuickActions';
import SpendingChart from '../components/SpendingChart';
import TransactionItem from '../components/TransactionItem';
import StatsRow from '../components/StatsRow';
import ReceberModal from '../components/ReceberModal';
import DepositarModal from '../components/DepositarModal';
import TransferirModal from '../components/TransferirModal';
import { useWallet } from '../context/WalletContext';

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { transactions } = useWallet();
  const recent = transactions.slice(0, 4);

  const [modal, setModal] = useState(null); // 'receber' | 'depositar' | 'transferir' | null

  const handleAction = (key) => {
    if (key === 'enviar' || key === 'transferir') setModal('transferir');
    else if (key === 'receber') setModal('receber');
    else if (key === 'depositar') setModal('depositar');
  };

  return (
    <Box sx={{ pb: 10 }}>
      {/* Header */}
      <Box px={2.5} pt={3} pb={2}>
        <Header />
      </Box>

      {/* Balance Card */}
      <Box px={2.5} mb={2.5}>
        <BalanceCard />
      </Box>

      {/* Stats */}
      <Box px={2.5} mb={2.5}>
        <StatsRow isDark={isDark} />
      </Box>

      {/* Quick Actions */}
      <Box px={2.5} mb={2.5}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#EEF2FF',
            boxShadow: isDark ? 'none' : '0 2px 16px rgba(37,99,235,0.06)',
          }}
        >
          <QuickActions isDark={isDark} onAction={handleAction} />
        </Paper>
      </Box>

      {/* Chart */}
      <Box px={2.5} mb={2.5}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#EEF2FF',
            boxShadow: isDark ? 'none' : '0 2px 16px rgba(37,99,235,0.06)',
          }}
        >
          <SpendingChart />
        </Paper>
      </Box>

      {/* Recent Transactions */}
      <Box px={2.5}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#EEF2FF',
            boxShadow: isDark ? 'none' : '0 2px 16px rgba(37,99,235,0.06)',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
            <Typography variant="subtitle1" fontWeight={700} color="text.primary">
              Transações recentes
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              gap={0.3}
              sx={{ cursor: 'pointer', color: 'primary.main', '&:hover': { opacity: 0.8 } }}
              onClick={() => navigate('/historico')}
            >
              <Typography variant="caption" fontWeight={700} color="primary.main">
                Ver tudo
              </Typography>
              <ArrowForward sx={{ fontSize: 14 }} />
            </Box>
          </Box>

          <Box>
            {recent.map((tx, i) => (
              <Box key={tx.id}>
                <TransactionItem tx={tx} isDark={isDark} />
                {i < recent.length - 1 && (
                  <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9' }} />
                )}
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Modals */}
      <ReceberModal open={modal === 'receber'} onClose={() => setModal(null)} />
      <DepositarModal open={modal === 'depositar'} onClose={() => setModal(null)} />
      <TransferirModal open={modal === 'transferir'} onClose={() => setModal(null)} />
    </Box>
  );
}
