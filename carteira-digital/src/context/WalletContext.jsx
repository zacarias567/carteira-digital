import { createContext, useContext, useState } from 'react';
import { balance as initialBalance, transactions as initialTransactions, user } from '../data/mockData';

const WalletContext = createContext();

const fmt = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(initialBalance.available);
  const [transactions, setTransactions] = useState(initialTransactions);

  const addTransaction = (tx) => {
    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      ...tx,
    };
    setTransactions((prev) => [newTx, ...prev]);
    setBalance((prev) => prev + tx.amount);
    return newTx;
  };

  const depositar = ({ valor, metodo }) => {
    return addTransaction({
      name: `Depósito via ${metodo}`,
      category: 'Receita',
      amount: valor,
      icon: 'redeem',
    });
  };

  const receber = ({ valor, descricao }) => {
    return addTransaction({
      name: descricao || 'Recebimento via Pix',
      category: 'Receita',
      amount: valor,
      icon: 'swap_horiz',
    });
  };

  const transferir = ({ valor, destinatario, tipo }) => {
    return addTransaction({
      name: `Transferência — ${destinatario}`,
      category: 'Transferência',
      amount: -valor,
      icon: 'swap_horiz',
    });
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
        depositar,
        receber,
        transferir,
        pixKey: user.email,
        userName: user.name,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
