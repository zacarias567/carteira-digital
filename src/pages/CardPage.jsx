import { Box, Typography, Paper, useTheme } from '@mui/material';
import { CreditCard, Lock, Contactless } from '@mui/icons-material';
import { user, balance } from '../data/mockData';

const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function CardPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ pb: 10, pt: 3, px: 2.5 }}>
      <Typography variant="h6" fontWeight={700} color="text.primary" mb={3}>
        Meu Cartão
      </Typography>

      {/* Virtual card */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #1D4ED8 100%)',
          borderRadius: 4,
          p: 3,
          color: '#fff',
          mb: 3,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(15,23,42,0.5)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -50,
            right: -30,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Box sx={{ background: 'rgba(255,255,255,0.15)', borderRadius: 2, p: 0.8 }}>
            <CreditCard />
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Contactless sx={{ fontSize: 20, opacity: 0.7 }} />
            <Typography variant="caption" fontWeight={700} sx={{ letterSpacing: 2 }}>NFC</Typography>
          </Box>
        </Box>
        <Typography sx={{ fontFamily: '"Space Mono", monospace', letterSpacing: 4, fontSize: '1.1rem', mb: 3 }}>
          {user.cardNumber}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', fontSize: '0.65rem', mb: 0.3 }}>TITULAR</Typography>
            <Typography variant="body2" fontWeight={700}>{user.name.toUpperCase()}</Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', fontSize: '0.65rem', mb: 0.3 }}>VALIDADE</Typography>
            <Typography variant="body2" fontWeight={700}>12/28</Typography>
          </Box>
          <Typography fontWeight={900} sx={{ letterSpacing: 1, color: '#60A5FA', fontSize: '1.1rem' }}>
            VISA
          </Typography>
        </Box>
      </Box>

      {/* Limit info */}
      <Paper elevation={0} sx={{ p: 2.5, border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#EEF2FF', mb: 2 }}>
        <Typography variant="subtitle2" fontWeight={700} mb={2}>Limite do cartão</Typography>
        {[
          { label: 'Limite total', value: 15000, color: '#2563EB' },
          { label: 'Utilizado', value: 3210.75, color: '#EF4444' },
          { label: 'Disponível', value: 11789.25, color: '#10B981' },
        ].map(({ label, value, color }) => (
          <Box key={label} display="flex" justifyContent="space-between" mb={1.5}>
            <Typography variant="body2" color="text.secondary">{label}</Typography>
            <Typography variant="body2" fontWeight={700} sx={{ color, fontFamily: '"Space Mono", monospace', fontSize: '0.82rem' }}>
              {fmt(value)}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Paper elevation={0} sx={{ p: 2.5, border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.07)' : '#EEF2FF' }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box sx={{ background: isDark ? 'rgba(37,99,235,0.2)' : '#EFF6FF', borderRadius: 2, p: 1.2, color: '#2563EB' }}>
            <Lock sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={600}>Cartão virtual ativo</Typography>
            <Typography variant="caption" color="text.secondary">Protegido com criptografia 256-bit</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
