import {
  Dialog, DialogContent, Box, Typography, IconButton,
  TextField, Button, Divider, Snackbar, Alert, Slide,
  useTheme,
} from '@mui/material';
import {
  Close, ContentCopy, Check, QrCode2, CallReceived,
} from '@mui/icons-material';
import { useState, forwardRef } from 'react';
import { useWallet } from '../context/WalletContext';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fmt = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Minimal SVG QR-code-like placeholder (decorative)
function FakeQR({ value, size = 160 }) {
  // Deterministic pattern based on string hash
  const hash = [...value].reduce((a, c) => a + c.charCodeAt(0), 0);
  const cells = 10;
  const cellSize = size / cells;
  const squares = [];
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const seed = (hash + r * 13 + c * 7) % 100;
      // Always fill corners (finder patterns)
      const isCorner =
        (r < 3 && c < 3) ||
        (r < 3 && c > cells - 4) ||
        (r > cells - 4 && c < 3);
      const filled = isCorner || seed < 45;
      if (filled) {
        squares.push({ x: c * cellSize, y: r * cellSize });
      }
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" rx="8" />
      {squares.map((s, i) => (
        <rect key={i} x={s.x + 1} y={s.y + 1} width={cellSize - 2} height={cellSize - 2} fill="#1D4ED8" rx="1.5" />
      ))}
    </svg>
  );
}

export default function ReceberModal({ open, onClose }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { pixKey, userName, receber } = useWallet();

  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState('form'); // 'form' | 'qr' | 'success'
  const [snack, setSnack] = useState(false);

  const valorNum = parseFloat(valor.replace(',', '.')) || 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGerarQR = () => {
    setStep('qr');
  };

  const handleConfirmar = () => {
    receber({ valor: valorNum, descricao: descricao || 'Recebimento via Pix' });
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setValor('');
    setDescricao('');
    onClose();
  };

  const borderColor = isDark ? 'rgba(255,255,255,0.07)' : '#EEF2FF';

  return (
    <>
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
          {/* Handle bar */}
          <Box display="flex" justifyContent="center" pt={1.5} pb={0.5}>
            <Box sx={{ width: 40, height: 4, borderRadius: 2, background: isDark ? 'rgba(255,255,255,0.15)' : '#E2E8F0' }} />
          </Box>

          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" px={3} py={2}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box sx={{ width: 38, height: 38, borderRadius: 2.5, background: isDark ? 'rgba(16,185,129,0.15)' : '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CallReceived sx={{ color: '#10B981', fontSize: 20 }} />
              </Box>
              <Typography fontWeight={700} fontSize="1.05rem" color="text.primary">Receber dinheiro</Typography>
            </Box>
            <IconButton onClick={handleClose} size="small" sx={{ color: 'text.secondary' }}>
              <Close fontSize="small" />
            </IconButton>
          </Box>

          <Divider sx={{ borderColor }} />

          {step === 'form' && (
            <Box px={3} py={3}>
              {/* Pix key */}
              <Box
                sx={{
                  background: isDark ? 'rgba(16,185,129,0.08)' : '#F0FDF4',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(16,185,129,0.2)' : '#BBF7D0',
                  borderRadius: 3,
                  p: 2,
                  mb: 3,
                }}
              >
                <Typography variant="caption" color="#10B981" fontWeight={700} letterSpacing={0.5} sx={{ textTransform: 'uppercase', fontSize: '0.68rem' }}>
                  Sua chave Pix
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between" mt={0.5}>
                  <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ wordBreak: 'break-all', pr: 1 }}>
                    {pixKey}
                  </Typography>
                  <IconButton size="small" onClick={handleCopy} sx={{ color: copied ? '#10B981' : 'text.secondary', flexShrink: 0 }}>
                    {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
                  </IconButton>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" mb={1} fontWeight={600}>
                Valor (opcional)
              </Typography>
              <TextField
                fullWidth
                placeholder="R$ 0,00"
                value={valor}
                onChange={(e) => setValor(e.target.value.replace(/[^0-9,\.]/g, ''))}
                InputProps={{
                  sx: {
                    fontFamily: '"Space Mono", monospace',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    borderRadius: 3,
                    background: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF',
                  },
                }}
                sx={{ mb: 2 }}
              />

              <Typography variant="body2" color="text.secondary" mb={1} fontWeight={600}>
                Descrição (opcional)
              </Typography>
              <TextField
                fullWidth
                placeholder="Ex: Jantar de ontem"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                InputProps={{ sx: { borderRadius: 3, background: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF' } }}
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<QrCode2 />}
                onClick={handleGerarQR}
                sx={{ borderRadius: 3, py: 1.5, background: '#10B981', '&:hover': { background: '#059669' }, fontWeight: 700 }}
              >
                Gerar QR Code
              </Button>
            </Box>
          )}

          {step === 'qr' && (
            <Box px={3} py={3} textAlign="center">
              <Typography variant="body2" color="text.secondary" mb={0.5}>Cobrança para</Typography>
              <Typography fontWeight={700} color="text.primary" mb={2}>{userName}</Typography>

              {valorNum > 0 && (
                <Typography variant="h5" fontWeight={800} color="#10B981" mb={2} fontFamily='"Space Mono", monospace'>
                  {fmt(valorNum)}
                </Typography>
              )}

              <Box display="flex" justifyContent="center" mb={2}>
                <Box sx={{ p: 2, background: '#fff', borderRadius: 3, boxShadow: '0 8px 32px rgba(16,185,129,0.15)', border: '2px solid #BBF7D0' }}>
                  <FakeQR value={pixKey + valor} size={160} />
                </Box>
              </Box>

              <Typography variant="caption" color="text.secondary" mb={3} display="block">
                Peça para a pessoa escanear com o app do banco
              </Typography>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleConfirmar}
                sx={{ borderRadius: 3, py: 1.5, background: '#10B981', '&:hover': { background: '#059669' }, fontWeight: 700, mb: 1.5 }}
              >
                Confirmar recebimento
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
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mx: 'auto', mb: 2,
                  boxShadow: '0 12px 32px rgba(16,185,129,0.35)',
                }}
              >
                <Check sx={{ color: '#fff', fontSize: 36 }} />
              </Box>
              <Typography fontWeight={800} fontSize="1.2rem" color="text.primary" mb={0.5}>Recebimento registrado!</Typography>
              {valorNum > 0 && (
                <Typography fontWeight={700} color="#10B981" fontSize="1.4rem" fontFamily='"Space Mono", monospace' mb={1}>
                  +{fmt(valorNum)}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary" mb={3}>Seu saldo foi atualizado.</Typography>
              <Button fullWidth variant="contained" size="large" onClick={handleClose} sx={{ borderRadius: 3, py: 1.5, fontWeight: 700 }}>
                Concluir
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
