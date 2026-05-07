import { Box, Typography, Avatar, Chip } from '@mui/material';
import {
  Movie, Work, Restaurant, DirectionsCar, SwapHoriz,
  ShoppingBag, FitnessCenter, MusicNote, Bolt,
  LocalPharmacy, Brush, Home, ShoppingCart, Redeem,
  AccountBalanceWallet,
} from '@mui/icons-material';

const iconMap = {
  movie: Movie, work: Work, restaurant: Restaurant, directions_car: DirectionsCar,
  swap_horiz: SwapHoriz, shopping_bag: ShoppingBag, fitness_center: FitnessCenter,
  music_note: MusicNote, bolt: Bolt, local_pharmacy: LocalPharmacy, brush: Brush,
  home: Home, shopping_cart: ShoppingCart, redeem: Redeem,
};

const categoryColors = {
  Entretenimento: { bg: '#EDE9FE', color: '#7C3AED', darkBg: 'rgba(124,58,237,0.2)' },
  Receita: { bg: '#DCFCE7', color: '#16A34A', darkBg: 'rgba(22,163,74,0.2)' },
  Alimentação: { bg: '#FEF3C7', color: '#D97706', darkBg: 'rgba(217,119,6,0.2)' },
  Transporte: { bg: '#E0F2FE', color: '#0369A1', darkBg: 'rgba(3,105,161,0.2)' },
  Transferência: { bg: '#EFF6FF', color: '#2563EB', darkBg: 'rgba(37,99,235,0.2)' },
  Compras: { bg: '#FFF1F2', color: '#E11D48', darkBg: 'rgba(225,29,72,0.2)' },
  Saúde: { bg: '#F0FDF4', color: '#15803D', darkBg: 'rgba(21,128,61,0.2)' },
  Moradia: { bg: '#FDF4FF', color: '#9333EA', darkBg: 'rgba(147,51,234,0.2)' },
};

const statusLabels = { completed: 'Concluído', pending: 'Pendente', failed: 'Falhou' };
const statusColors = { completed: 'success', pending: 'warning', failed: 'error' };

const fmt = (v) => {
  const abs = Math.abs(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return v > 0 ? `+${abs}` : abs;
};

const fmtDate = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

export default function TransactionItem({ tx, isDark, showStatus = false }) {
  const Icon = iconMap[tx.icon] || AccountBalanceWallet;
  const catColor = categoryColors[tx.category] || categoryColors.Transferência;
  const isPositive = tx.amount > 0;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 1.5,
        px: 0.5,
        borderRadius: 2,
        transition: 'background 0.15s',
        '&:hover': { background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.04)' },
      }}
    >
      <Avatar
        sx={{
          width: 44,
          height: 44,
          background: isDark ? catColor.darkBg : catColor.bg,
          color: catColor.color,
          borderRadius: 2.5,
          flexShrink: 0,
        }}
      >
        <Icon sx={{ fontSize: 20 }} />
      </Avatar>

      <Box flex={1} minWidth={0}>
        <Typography variant="body2" fontWeight={600} color="text.primary" noWrap>
          {tx.name}
        </Typography>
        <Box display="flex" alignItems="center" gap={0.8} mt={0.2}>
          <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
            {tx.category}
          </Typography>
          {showStatus && (
            <>
              <Box sx={{ width: 3, height: 3, borderRadius: '50%', background: '#94A3B8' }} />
              <Chip
                label={statusLabels[tx.status]}
                color={statusColors[tx.status]}
                size="small"
                sx={{ height: 18, fontSize: '0.62rem', fontWeight: 600, '& .MuiChip-label': { px: 0.8 } }}
              />
            </>
          )}
        </Box>
      </Box>

      <Box textAlign="right" flexShrink={0}>
        <Typography
          variant="body2"
          fontWeight={700}
          sx={{
            color: isPositive ? '#10B981' : 'text.primary',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.82rem',
          }}
        >
          {fmt(tx.amount)}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontSize="0.68rem">
          {fmtDate(tx.date)}
        </Typography>
      </Box>
    </Box>
  );
}
