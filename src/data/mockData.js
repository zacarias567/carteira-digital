export const user = {
  name: 'Lucas Ferreira',
  firstName: 'Lucas',
  avatar: 'LF',
  cardNumber: '**** **** **** 4821',
  cardBrand: 'VISA',
  email: 'lucas.ferreira@email.com',
};

export const balance = {
  available: 12845.50,
  income: 8320.00,
  expense: 3210.75,
  saved: 5500.00,
};

export const transactions = [
  { id: 1, name: 'Netflix', category: 'Entretenimento', amount: -49.90, date: '2025-05-06', status: 'completed', icon: 'movie' },
  { id: 2, name: 'Salário', category: 'Receita', amount: 8320.00, date: '2025-05-05', status: 'completed', icon: 'work' },
  { id: 3, name: 'iFood', category: 'Alimentação', amount: -87.50, date: '2025-05-05', status: 'completed', icon: 'restaurant' },
  { id: 4, name: 'Uber', category: 'Transporte', amount: -22.30, date: '2025-05-04', status: 'completed', icon: 'directions_car' },
  { id: 5, name: 'Transferência — Ana', category: 'Transferência', amount: 500.00, date: '2025-05-04', status: 'completed', icon: 'swap_horiz' },
  { id: 6, name: 'Mercado Livre', category: 'Compras', amount: -312.00, date: '2025-05-03', status: 'pending', icon: 'shopping_bag' },
  { id: 7, name: 'Academia Smart Fit', category: 'Saúde', amount: -109.90, date: '2025-05-03', status: 'completed', icon: 'fitness_center' },
  { id: 8, name: 'Spotify', category: 'Entretenimento', amount: -21.90, date: '2025-05-02', status: 'completed', icon: 'music_note' },
  { id: 9, name: 'Conta de Luz', category: 'Moradia', amount: -180.45, date: '2025-05-02', status: 'completed', icon: 'bolt' },
  { id: 10, name: 'Pix — Carlos', category: 'Transferência', amount: -250.00, date: '2025-05-01', status: 'completed', icon: 'swap_horiz' },
  { id: 11, name: 'Farmácia', category: 'Saúde', amount: -45.80, date: '2025-04-30', status: 'completed', icon: 'local_pharmacy' },
  { id: 12, name: 'Freelance Design', category: 'Receita', amount: 1200.00, date: '2025-04-29', status: 'completed', icon: 'brush' },
  { id: 13, name: 'Aluguel', category: 'Moradia', amount: -1500.00, date: '2025-04-28', status: 'completed', icon: 'home' },
  { id: 14, name: 'Amazon', category: 'Compras', amount: -156.90, date: '2025-04-27', status: 'failed', icon: 'shopping_cart' },
  { id: 15, name: 'Cashback NovaPay', category: 'Receita', amount: 48.20, date: '2025-04-26', status: 'completed', icon: 'redeem' },
];

export const chartData = [
  { month: 'Jan', receita: 6200, despesa: 4100 },
  { month: 'Fev', receita: 5800, despesa: 3800 },
  { month: 'Mar', receita: 7400, despesa: 4900 },
  { month: 'Abr', receita: 6900, despesa: 5200 },
  { month: 'Mai', receita: 8320, despesa: 3210 },
];

export const quickStats = [
  { label: 'Receitas', value: 8320.00, trend: '+12%', positive: true },
  { label: 'Despesas', value: 3210.75, trend: '-5%', positive: true },
  { label: 'Economias', value: 5500.00, trend: '+8%', positive: true },
];
