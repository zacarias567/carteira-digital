import {
  Dialog, DialogContent, Box, Typography, IconButton,
  TextField, Button, Divider, Slide, ToggleButton, ToggleButtonGroup,
  useTheme,
} from '@mui/material';
import {
  Close, Check, AccountBalance, Pix,
} from '@mui/icons-material';
import { useState, forwardRef } from 'react';
import { useWallet } from '../context/WalletContext';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fmt = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const QUICK_VALUES = [50, 100, 200, 500, 1000];

export default function DepositarModal({ open, onClose }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { depositar } = useWallet();

  const [valor, setValor] = useState('');
  const [metodo, setMetodo] = useState('Pix');
  const [step, setStep] = useState('form'); // 'form' | 'confirm' | 'success'

  const valorNum = parseFloat(valor.replace(',', '.')) || 0;
  const valid = valorNum >= 1;

  const handleQuick = (v) => setValor(String(v).replace('.', ','));

  const handleConfirmar = () => {
    if (!valid) return;
    setStep('confirm');
  };

  const handleDepositar = () => {
    depositar({ valor: valorNum, metodo });
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setValor('');
    setMetodo('Pix');
    onClose();
  };

  const borderColor = isDark ? 'rgba(255,255,255,0.07)' : '#EEF2FF';
  const accent = '#2563EB';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: '24px 24px 0 0',
          position: 'fixed',
          bottom: 0,
          m: 0,
          width: '100%',
          maxWidth: 430,
          background: isDark ? '#0F172A' : '#fff',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Handle */}
        <Box display="flex" justifyContent="center" pt={1.5} pb={0.5}>
          <Box sx={{ width: 40, height: 4, borderRadius: 2, background: isDark ? 'rgba(255,255,255,0.15)' : '#E2E8F0' }} />
        </Box>

        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" px={3} py={2}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box sx={{ width: 38, height: 38, borderRadius: 2.5, background: isDark ? 'rgba(37,99,235,0.15)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AccountBalance sx={{ color: accent, fontSize: 20 }} />
            </Box>
            <Typography fontWeight={700} fontSize="1.05rem" color="text.primary">Depositar dinheiro</Typography>
          </Box>
          <IconButton onClick={handleClose} size="small" sx={{ color: 'text.secondary' }}>
            <Close fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor }} />

        {step === 'form' && (
          <Box px={3} py={3}>
            {/* Método */}
            <Typography variant="body2" fontWeight={600} color="text.secondary" mb={1.5}>
              Método de depósito
            </Typography>
            <ToggleButtonGroup
              value={metodo}
              exclusive
              onChange={(_, v) => v && setMetodo(v)}
              fullWidth
              sx={{ mb: 3, gap: 1 }}
            >
              {[
                { value: 'Pix', label: 'Pix', color: '#10B981' },
                { value: 'Boleto', label: 'Boleto', color: '#F59E0B' },
                { value: 'TED', label: 'TED', color: accent },
              ].map(({ value, label, color }) => (
                <ToggleButton
                  key={value}
                  value={value}
                  sx={{
                    flex: 1,
                    borderRadius: '12px !important',
                    border: '1.5px solid !important',
                    borderColor: `${metodo === value ? color : (isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0')} !important`,
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    color: metodo === value ? color : 'text.secondary',
                    background: metodo === value ? (isDark ? `${color}18` : `${color}12`) : 'transparent',
                    '&:hover': { background: `${color}10` },
                    py: 1.2,
                  }}
                >
                  {label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            {/* Valor */}
            <Typography variant="body2" fontWeight={600} color="text.secondary" mb={1}>
              Valor
            </Typography>
            <TextField
              fullWidth
              placeholder="R$ 0,00"
              value={valor}
              onChange={(e) => setValor(e.target.value.replace(/[^0-9,\.]/g, ''))}
              InputProps={{
                startAdornment: (
                  <Typography color="text.secondary" fontWeight={700} mr={0.5}>R$</Typography>
                ),
                sx: {
                  fontFamily: '"Space Mono", monospace',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  borderRadius: 3,
                  background: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF',
                },
              }}
              sx={{ mb: 2 }}
            />

            {/* Quick values */}
            <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
              {QUICK_VALUES.map((v) => (
                <Button
                  key={v}
                  size="small"
                  variant="outlined"
                  onClick={() => handleQuick(v)}
                  sx={{
                    borderRadius: 2.5,
                    fontFamily: '"Space Mono", monospace',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    borderColor: isDark ? 'rgba(255,255,255,0.12)' : '#E2E8F0',
                    color: 'text.secondary',
                    py: 0.5,
                    px: 1.5,
                    '&:hover': { borderColor: accent, color: accent },
                  }}
                >
                  +R${v}
                </Button>
              ))}
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              disabled={!valid}
              onClick={handleConfirmar}
              sx={{ borderRadius: 3, py: 1.5, fontWeight: 700 }}
            >
              Continuar
            </Button>
          </Box>
        )}

        {step === 'confirm' && (
          <Box px={3} py={3}>
            <Box
              sx={{
                background: isDark ? 'rgba(37,99,235,0.08)' : '#F0F4FF',
                border: '1px solid',
                borderColor: isDark ? 'rgba(37,99,235,0.2)' : '#BFDBFE',
                borderRadius: 3,
                p: 2.5,
                mb: 3,
              }}
            >
              <Typography variant="caption" color={accent} fontWeight={700} letterSpacing={0.5} sx={{ textTransform: 'uppercase', fontSize: '0.68rem' }}>
                Resumo do depósito
              </Typography>
              {[
                { label: 'Método', value: metodo },
                { label: 'Valor', value: fmt(valorNum) },
              ].map(({ label, value }) => (
                <Box key={label} display="flex" justifyContent="space-between" mt={1.5}>
                  <Typography variant="body2" color="text.secondary">{label}</Typography>
                  <Typography variant="body2" fontWeight={700} color="text.primary" fontFamily='"Space Mono", monospace'>
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleDepositar}
              sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, mb: 1.5 }}
            >
              Confirmar depósito de {fmt(valorNum)}
            </Button>
            <Button fullWidth variant="text" onClick={() => setStep('form')} sx={{ color: 'text.secondary', borderRadius: 3 }}>
              Voltar
            </Button>
          </Box>
        )}

        {step === 'success' && (
          <Box px={3} py={4} textAlign="center">
            <Box
              sx={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563EB, #0891B2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                mx: 'auto', mb: 2,
                boxShadow: '0 12px 32px rgba(37,99,235,0.35)',
              }}
            >
              <Check sx={{ color: '#fff', fontSize: 36 }} />
            </Box>
            <Typography fontWeight={800} fontSize="1.2rem" color="text.primary" mb={0.5}>Depósito realizado!</Typography>
            <Typography fontWeight={700} color={accent} fontSize="1.4rem" fontFamily='"Space Mono", monospace' mb={1}>
              +{fmt(valorNum)}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Seu saldo foi atualizado com sucesso.
            </Typography>
            <Button fullWidth variant="contained" size="large" onClick={handleClose} sx={{ borderRadius: 3, py: 1.5, fontWeight: 700 }}>
              Concluir
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
