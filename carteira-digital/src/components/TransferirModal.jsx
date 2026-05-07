import {
  Dialog, DialogContent, Box, Typography, IconButton,
  TextField, Button, Divider, Slide, Avatar,
  useTheme, InputAdornment,
} from '@mui/material';
import {
  Close, Check, Send, Search, ArrowBack,
} from '@mui/icons-material';
import { useState, forwardRef } from 'react';
import { useWallet } from '../context/WalletContext';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fmt = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const CONTACTS = [
  { name: 'Ana Souza', key: 'ana.souza@email.com', initials: 'AS', color: '#8B5CF6' },
  { name: 'Carlos Lima', key: 'carlos.lima@email.com', initials: 'CL', color: '#10B981' },
  { name: 'Mariana Reis', key: 'mari.reis@email.com', initials: 'MR', color: '#F59E0B' },
  { name: 'Pedro Alves', key: '(11) 99999-1234', initials: 'PA', color: '#EF4444' },
  { name: 'Juliana Costa', key: '123.456.789-00', initials: 'JC', color: '#2563EB' },
];

export default function TransferirModal({ open, onClose }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { transferir, balance } = useWallet();

  const [step, setStep] = useState('contact'); // 'contact' | 'value' | 'confirm' | 'success'
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  const valorNum = parseFloat(valor.replace(',', '.')) || 0;
  const filtered = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.key.toLowerCase().includes(search.toLowerCase())
  );
  const valid = valorNum >= 0.01 && valorNum <= balance;

  const handleSelect = (contact) => {
    setSelected(contact);
    setStep('value');
  };

  const handleTransferir = () => {
    transferir({ valor: valorNum, destinatario: selected.name });
    setStep('success');
  };

  const handleClose = () => {
    setStep('contact');
    setSearch('');
    setSelected(null);
    setValor('');
    setDescricao('');
    onClose();
  };

  const borderColor = isDark ? 'rgba(255,255,255,0.07)' : '#EEF2FF';
  const accent = '#8B5CF6';

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
          maxHeight: '90vh',
        },
      }}
    >
      <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
        {/* Handle */}
        <Box display="flex" justifyContent="center" pt={1.5} pb={0.5} flexShrink={0}>
          <Box sx={{ width: 40, height: 4, borderRadius: 2, background: isDark ? 'rgba(255,255,255,0.15)' : '#E2E8F0' }} />
        </Box>

        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" px={3} py={2} flexShrink={0}>
          <Box display="flex" alignItems="center" gap={1.5}>
            {step !== 'contact' && step !== 'success' && (
              <IconButton
                size="small"
                onClick={() => setStep(step === 'value' ? 'contact' : 'value')}
                sx={{ color: 'text.secondary', mr: 0.5 }}
              >
                <ArrowBack fontSize="small" />
              </IconButton>
            )}
            <Box sx={{ width: 38, height: 38, borderRadius: 2.5, background: isDark ? 'rgba(139,92,246,0.15)' : '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send sx={{ color: accent, fontSize: 20 }} />
            </Box>
            <Typography fontWeight={700} fontSize="1.05rem" color="text.primary">Transferir</Typography>
          </Box>
          <IconButton onClick={handleClose} size="small" sx={{ color: 'text.secondary' }}>
            <Close fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor, flexShrink: 0 }} />

        {/* Steps */}
        {step === 'contact' && (
          <Box px={3} py={2.5} sx={{ overflowY: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Buscar contato ou chave Pix..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search sx={{ color: 'text.secondary', fontSize: 20 }} /></InputAdornment>,
                sx: { borderRadius: 3, background: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF' },
              }}
              sx={{ mb: 2.5 }}
            />

            <Typography variant="caption" color="text.secondary" fontWeight={700} letterSpacing={0.5} sx={{ textTransform: 'uppercase', fontSize: '0.68rem', mb: 1.5, display: 'block' }}>
              Contatos recentes
            </Typography>

            <Box>
              {filtered.map((contact) => (
                <Box
                  key={contact.name}
                  onClick={() => handleSelect(contact)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    py: 1.5,
                    px: 1,
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                    '&:hover': { background: isDark ? 'rgba(255,255,255,0.05)' : '#F8FAFF' },
                  }}
                >
                  <Avatar sx={{ background: contact.color + '22', color: contact.color, fontWeight: 700, fontSize: '0.9rem', width: 44, height: 44, borderRadius: 2.5 }}>
                    {contact.initials}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight={700} color="text.primary">{contact.name}</Typography>
                    <Typography variant="caption" color="text.secondary" fontSize="0.72rem">{contact.key}</Typography>
                  </Box>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: contact.color, opacity: 0.7 }} />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {step === 'value' && selected && (
          <Box px={3} py={3}>
            {/* Selected contact */}
            <Box display="flex" alignItems="center" gap={1.5} mb={3}>
              <Avatar sx={{ background: selected.color + '22', color: selected.color, fontWeight: 700, width: 48, height: 48, borderRadius: 2.5 }}>
                {selected.initials}
              </Avatar>
              <Box>
                <Typography fontWeight={700} color="text.primary">{selected.name}</Typography>
                <Typography variant="caption" color="text.secondary">{selected.key}</Typography>
              </Box>
            </Box>

            <Typography variant="body2" fontWeight={600} color="text.secondary" mb={1}>Valor</Typography>
            <TextField
              fullWidth
              placeholder="R$ 0,00"
              value={valor}
              onChange={(e) => setValor(e.target.value.replace(/[^0-9,\.]/g, ''))}
              autoFocus
              InputProps={{
                startAdornment: <Typography color="text.secondary" fontWeight={700} mr={0.5}>R$</Typography>,
                sx: {
                  fontFamily: '"Space Mono", monospace',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  borderRadius: 3,
                  background: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF',
                },
              }}
              sx={{ mb: 1 }}
            />
            <Typography variant="caption" color="text.secondary" mb={2.5} display="block">
              Saldo disponível: <strong>{fmt(balance)}</strong>
            </Typography>

            <Typography variant="body2" fontWeight={600} color="text.secondary" mb={1}>Descrição (opcional)</Typography>
            <TextField
              fullWidth
              placeholder="Ex: Almoço de ontem"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              InputProps={{ sx: { borderRadius: 3, background: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFF' } }}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              disabled={!valid}
              onClick={() => setStep('confirm')}
              sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, background: accent, '&:hover': { background: '#7C3AED' } }}
            >
              Revisar transferência
            </Button>
            {valorNum > balance && (
              <Typography variant="caption" color="error" display="block" textAlign="center" mt={1}>
                Saldo insuficiente
              </Typography>
            )}
          </Box>
        )}

        {step === 'confirm' && selected && (
          <Box px={3} py={3}>
            <Box
              sx={{
                background: isDark ? 'rgba(139,92,246,0.08)' : '#F5F3FF',
                border: '1px solid',
                borderColor: isDark ? 'rgba(139,92,246,0.2)' : '#DDD6FE',
                borderRadius: 3,
                p: 2.5,
                mb: 3,
              }}
            >
              <Typography variant="caption" color={accent} fontWeight={700} letterSpacing={0.5} sx={{ textTransform: 'uppercase', fontSize: '0.68rem' }}>
                Resumo da transferência
              </Typography>
              {[
                { label: 'Para', value: selected.name },
                { label: 'Chave', value: selected.key },
                { label: 'Valor', value: fmt(valorNum) },
                ...(descricao ? [{ label: 'Descrição', value: descricao }] : []),
              ].map(({ label, value }) => (
                <Box key={label} display="flex" justifyContent="space-between" mt={1.5}>
                  <Typography variant="body2" color="text.secondary">{label}</Typography>
                  <Typography variant="body2" fontWeight={700} color="text.primary" fontFamily='"Space Mono", monospace' textAlign="right" sx={{ maxWidth: '60%', wordBreak: 'break-all' }}>
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleTransferir}
              sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, background: accent, '&:hover': { background: '#7C3AED' }, mb: 1.5 }}
            >
              Confirmar envio de {fmt(valorNum)}
            </Button>
            <Button fullWidth variant="text" onClick={() => setStep('value')} sx={{ color: 'text.secondary', borderRadius: 3 }}>
              Voltar
            </Button>
          </Box>
        )}

        {step === 'success' && selected && (
          <Box px={3} py={4} textAlign="center">
            <Box
              sx={{
                width: 72, height: 72, borderRadius: '50%',
                background: `linear-gradient(135deg, ${accent}, #7C3AED)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                mx: 'auto', mb: 2,
                boxShadow: `0 12px 32px ${accent}55`,
              }}
            >
              <Check sx={{ color: '#fff', fontSize: 36 }} />
            </Box>
            <Typography fontWeight={800} fontSize="1.2rem" color="text.primary" mb={0.5}>Transferência enviada!</Typography>
            <Typography variant="body2" color="text.secondary" mb={0.5}>Para <strong>{selected.name}</strong></Typography>
            <Typography fontWeight={700} color={accent} fontSize="1.4rem" fontFamily='"Space Mono", monospace' mb={1}>
              -{fmt(valorNum)}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>Seu saldo foi atualizado.</Typography>
            <Button fullWidth variant="contained" size="large" onClick={handleClose} sx={{ borderRadius: 3, py: 1.5, fontWeight: 700 }}>
              Concluir
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
