import React, { useState } from 'react';
import { BrowserProvider, JsonRpcProvider, formatEther } from 'ethers';

type Transaction = {
  hash: string;
  from: string;
  to: string;
  value: string;
};

function App() {
  const [account, setAccount] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string>('');

  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error('MetaMask is not installed');

      const browserProvider = new BrowserProvider(window.ethereum);
      await browserProvider.send('eth_requestAccounts', []);
      const signer = await browserProvider.getSigner();
      const userAddress = await signer.getAddress();

      setAccount(userAddress);

      const balanceInWei = await browserProvider.getBalance(userAddress);
      setBalance(formatEther(balanceInWei));

      const rpcProvider = new JsonRpcProvider('https://rpc.ankr.com/eth');
      const latestBlock = await rpcProvider.getBlockNumber();
      const fetchedTxs: Transaction[] = [];

      for (let i = latestBlock; i > latestBlock - 100 && fetchedTxs.length < 10; i--) {
        const block = await rpcProvider.send('eth_getBlockByNumber', [
          `0x${i.toString(16)}`,
          true,
        ]);

        (block.transactions as any[]).forEach((tx) => {
          if (tx.from === userAddress || tx.to === userAddress) {
            fetchedTxs.push({
              hash: tx.hash,
              from: tx.from,
              to: tx.to,
              value: formatEther(tx.value),
            });
          }
        });
      }

      setTransactions(fetchedTxs);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Connect MetaMask</h1>
      <button onClick={connectWallet}>Connect Wallet</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {account && (
        <>
          <p><strong>Address:</strong> {account}</p>
          <p><strong>Balance:</strong> {balance} ETH</p>

          <h3>Recent Transactions:</h3>
          <ul>
            {transactions.map((tx) => (
              <li key={tx.hash}>
                <div>Hash: {tx.hash}</div>
                <div>From: {tx.from}</div>
                <div>To: {tx.to}</div>
                <div>Value: {tx.value} ETH</div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
