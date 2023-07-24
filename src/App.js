import { Routes, Route } from 'react-router-dom';
import { Transactions } from './components/transactions';
import { TransactionDetails } from './components/transactionDetails';
import { Account } from './components/account';

import './App.css';

function App() {
  return <div className="App">
    <Routes>
      <Route path="/:id" element={<Transactions />} />
      <Route path="/transaction/:id" element={<TransactionDetails />} />
      <Route path="/account/:id" element={<Account />} />
    </Routes>
  </div>;
}

export default App;
